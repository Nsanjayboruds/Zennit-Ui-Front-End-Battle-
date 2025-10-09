export default function StatsCard({ title, value, trend, icon, description, color = "indigo", loading = false }) {
  const colorSchemes = {
    indigo: {
      gradient: "from-indigo-500 to-blue-500",
      light: "bg-indigo-500/10",
      border: "border-indigo-500/20",
      text: "text-indigo-400"
    },
    green: {
      gradient: "from-green-500 to-teal-500",
      light: "bg-green-500/10",
      border: "border-green-500/20",
      text: "text-green-400"
    },
    purple: {
      gradient: "from-purple-500 to-pink-500",
      light: "bg-purple-500/10",
      border: "border-purple-500/20",
      text: "text-purple-400"
    },
    orange: {
      gradient: "from-orange-500 to-red-500",
      light: "bg-orange-500/10",
      border: "border-orange-500/20",
      text: "text-orange-400"
    },
    blue: {
      gradient: "from-blue-500 to-cyan-500",
      light: "bg-blue-500/10",
      border: "border-blue-500/20",
      text: "text-blue-400"
    }
  };

  const colors = colorSchemes[color] || colorSchemes.indigo;

  const getTrendIcon = (trend) => {
    if (trend > 0) return "↗️";
    if (trend < 0) return "↘️";
    return "→";
  };

  const getTrendColor = (trend) => {
    if (trend > 0) return "text-green-400";
    if (trend < 0) return "text-red-400";
    return "text-gray-400";
  };

  if (loading) {
    return (
      <div className="bg-gray-800/30 backdrop-blur-lg p-6 rounded-2xl border border-gray-700/40 shadow-lg animate-pulse">
        <div className="flex items-center justify-between mb-4">
          <div className="h-4 bg-gray-700 rounded w-1/2"></div>
          <div className="h-8 w-8 bg-gray-700 rounded-full"></div>
        </div>
        <div className="h-8 bg-gray-700 rounded mb-2"></div>
        <div className="h-4 bg-gray-700 rounded w-3/4"></div>
      </div>
    );
  }

  return (
    <div className={`group relative bg-gray-800/30 backdrop-blur-lg p-6 rounded-2xl border ${colors.border} shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 hover:border-${color}-500/40 overflow-hidden`}>
      
      {/* Background Gradient Effect */}
      <div className={`absolute inset-0 bg-gradient-to-br ${colors.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
      
      {/* Animated Border Glow */}
      <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${colors.gradient} opacity-0 group-hover:opacity-20 blur-xl transition-all duration-500 -z-10`}></div>

      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-gray-300 text-sm font-medium uppercase tracking-wide">
          {title}
        </h3>
        {icon && (
          <div className={`p-2 rounded-lg ${colors.light} backdrop-blur-sm`}>
            <span className="text-lg">{icon}</span>
          </div>
        )}
      </div>

      {/* Main Value */}
      <div className="flex items-end justify-between mb-2">
        <p className={`text-3xl font-bold ${colors.text}`}>
          {value}
        </p>
        
        {/* Trend Indicator */}
        {trend !== undefined && (
          <div className="flex items-center space-x-1">
            <span className={`text-sm font-semibold ${getTrendColor(trend)}`}>
              {getTrendIcon(trend)} {Math.abs(trend)}%
            </span>
          </div>
        )}
      </div>

      {/* Description */}
      {description && (
        <p className="text-gray-400 text-xs leading-relaxed">
          {description}
        </p>
      )}

      {/* Progress Bar for percentage-based values */}
      {typeof value === 'string' && value.includes('%') && (
        <div className="mt-4">
          <div className="w-full bg-gray-700/50 rounded-full h-2">
            <div 
              className={`h-2 rounded-full bg-gradient-to-r ${colors.gradient} transition-all duration-1000 ease-out`}
              style={{ 
                width: value,
                transition: 'width 1s ease-out'
              }}
            ></div>
          </div>
        </div>
      )}

      {/* Pulse animation for important metrics */}
      {(title.toLowerCase().includes('streak') || title.toLowerCase().includes('current')) && parseInt(value) > 0 && (
        <div className="absolute top-3 right-3">
          <div className="relative">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-ping"></div>
            <div className="w-2 h-2 bg-green-400 rounded-full absolute top-0"></div>
          </div>
        </div>
      )}
    </div>
  );
}