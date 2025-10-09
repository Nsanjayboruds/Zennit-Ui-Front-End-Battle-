import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend, Filler);

export default function MoodChart({ dataPoints, timeRange = "week", showAverage = true }) {
  // Enhanced data processing
  const labels = dataPoints.map(d => d.day);
  const dataValues = dataPoints.map(d => d.mood);
  
  // Calculate average mood
  const averageMood = dataValues.reduce((a, b) => a + b, 0) / dataValues.length;
  
  // Get mood color based on value
  const getMoodColor = (value) => {
    if (value >= 8) return "#10B981"; // Green for excellent
    if (value >= 6) return "#60A5FA"; // Blue for good
    if (value >= 4) return "#F59E0B"; // Yellow for okay
    return "#EF4444"; // Red for poor
  };

  // Get gradient colors based on average mood
  const getGradientColors = (ctx) => {
    const gradient = ctx.createLinearGradient(0, 0, 0, 300);
    
    if (averageMood >= 7) {
      gradient.addColorStop(0, "rgba(16, 185, 129, 0.4)");
      gradient.addColorStop(1, "rgba(16, 185, 129, 0)");
    } else if (averageMood >= 5) {
      gradient.addColorStop(0, "rgba(96, 165, 250, 0.4)");
      gradient.addColorStop(1, "rgba(96, 165, 250, 0)");
    } else if (averageMood >= 3) {
      gradient.addColorStop(0, "rgba(245, 158, 11, 0.4)");
      gradient.addColorStop(1, "rgba(245, 158, 11, 0)");
    } else {
      gradient.addColorStop(0, "rgba(239, 68, 68, 0.4)");
      gradient.addColorStop(1, "rgba(239, 68, 68, 0)");
    }
    return gradient;
  };

  const data = {
    labels,
    datasets: [
      {
        label: "Daily Mood",
        data: dataValues,
        fill: true,
        tension: 0.4,
        borderColor: function(context) {
          const chart = context.chart;
          const { ctx, chartArea } = chart;
          if (!chartArea) return "#6366F1";
          
          // Create gradient line
          const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
          gradient.addColorStop(0, "#8B5CF6"); // Purple
          gradient.addColorStop(0.5, "#6366F1"); // Indigo
          gradient.addColorStop(1, "#3B82F6"); // Blue
          return gradient;
        },
        backgroundColor: function(context) {
          const chart = context.chart;
          const { ctx, chartArea } = chart;
          return chartArea ? getGradientColors(ctx) : "rgba(99,102,241,0.4)";
        },
        pointBackgroundColor: dataValues.map(value => getMoodColor(value)),
        pointBorderColor: "#fff",
        pointRadius: 5,
        pointHoverRadius: 8,
        pointBorderWidth: 2,
        borderWidth: 3,
      },
      // Average line dataset
      ...(showAverage ? [{
        label: "Average Mood",
        data: dataValues.map(() => averageMood),
        borderColor: "rgba(255,255,255,0.6)",
        borderWidth: 1,
        borderDash: [5, 5],
        pointRadius: 0,
        tension: 0,
        fill: false,
      }] : [])
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top',
        labels: {
          color: '#94A3B8',
          usePointStyle: true,
          padding: 20,
          font: {
            size: 12
          }
        }
      },
      tooltip: {
        backgroundColor: "rgba(30, 41, 59, 0.95)",
        titleColor: "#F1F5F9",
        bodyColor: "#F1F5F9",
        borderColor: "rgba(99, 102, 241, 0.5)",
        borderWidth: 1,
        padding: 12,
        usePointStyle: true,
        callbacks: {
          label: function(context) {
            const value = context.parsed.y;
            let moodLabel = "";
            if (value >= 8) moodLabel = " - Excellent 😊";
            else if (value >= 6) moodLabel = " - Good 🙂";
            else if (value >= 4) moodLabel = " - Okay 😐";
            else moodLabel = " - Poor 😔";
            
            return `Mood: ${value}/10${moodLabel}`;
          },
          title: function(tooltipItems) {
            return `Day: ${tooltipItems[0].label}`;
          }
        }
      },
    },
    scales: {
      x: {
        grid: {
          color: "rgba(148, 163, 184, 0.1)",
          drawBorder: false,
        },
        ticks: {
          color: "#94A3B8",
          font: {
            size: 11
          }
        },
      },
      y: {
        grid: {
          color: "rgba(148, 163, 184, 0.1)",
          drawBorder: false,
        },
        ticks: {
          color: "#94A3B8",
          callback: function(value) {
            if (value === 0) return "😔";
            if (value === 5) return "😐";
            if (value === 10) return "😊";
            return value;
          },
          font: {
            size: 11
          }
        },
        suggestedMin: 0,
        suggestedMax: 10,
      },
    },
    interaction: {
      intersect: false,
      mode: 'index',
    },
    animations: {
      tension: {
        duration: 1000,
        easing: 'linear'
      }
    },
  };

  // Calculate some stats for the header
  const highestMood = Math.max(...dataValues);
  const lowestMood = Math.min(...dataValues);
  const improvement = dataValues[dataValues.length - 1] - dataValues[0];

  return (
    <div className="space-y-4">
      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-center">
        <div className="bg-gray-800/30 rounded-lg p-3">
          <div className="text-2xl font-bold text-green-400">{averageMood.toFixed(1)}</div>
          <div className="text-xs text-gray-400">Average</div>
        </div>
        <div className="bg-gray-800/30 rounded-lg p-3">
          <div className="text-2xl font-bold text-blue-400">{highestMood}</div>
          <div className="text-xs text-gray-400">Highest</div>
        </div>
        <div className="bg-gray-800/30 rounded-lg p-3">
          <div className="text-2xl font-bold text-orange-400">{lowestMood}</div>
          <div className="text-xs text-gray-400">Lowest</div>
        </div>
        <div className="bg-gray-800/30 rounded-lg p-3">
          <div className={`text-2xl font-bold ${improvement >= 0 ? 'text-green-400' : 'text-red-400'}`}>
            {improvement >= 0 ? '+' : ''}{improvement.toFixed(1)}
          </div>
          <div className="text-xs text-gray-400">Change</div>
        </div>
      </div>

      {/* Chart Container */}
      <div className="relative">
        <div className="h-64 md:h-80 bg-gradient-to-br from-gray-800/20 to-gray-900/20 rounded-2xl p-4 border border-gray-700/30">
          <Line data={data} options={options} />
        </div>
        
        {/* Mood Indicator Dots */}
        <div className="flex justify-between mt-2 px-2">
          <span className="text-xs text-gray-500">😔 Poor</span>
          <span className="text-xs text-gray-500">😐 Okay</span>
          <span className="text-xs text-gray-500">🙂 Good</span>
          <span className="text-xs text-gray-500">😊 Excellent</span>
        </div>
      </div>

      {/* Trend Indicator */}
      <div className="text-center">
        <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm ${
          improvement > 0 
            ? 'bg-green-500/20 text-green-400' 
            : improvement < 0 
            ? 'bg-red-500/20 text-red-400'
            : 'bg-gray-500/20 text-gray-400'
        }`}>
          {improvement > 0 ? '📈' : improvement < 0 ? '📉' : '➡️'}
          <span className="ml-2">
            {improvement > 0 
              ? `Trending up by ${improvement.toFixed(1)} points` 
              : improvement < 0 
              ? `Trending down by ${Math.abs(improvement).toFixed(1)} points`
              : 'Stable trend'
            }
          </span>
        </div>
      </div>
    </div>
  );
}