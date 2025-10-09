import React, { useState, useEffect } from "react";
import StatsCard from "../components/StatsCard";
import MoodChart from "../components/MoodChart";
import HabitProgress from "../components/HabitProgress";
import useRealtimeCollection from "../utils/useRealtimeCollection";
import { db } from "../utils/firebase";
import { collection, getDocs } from "firebase/firestore";

export default function Dashboard() {
  const [timeRange, setTimeRange] = useState("week");
  const [activeView, setActiveView] = useState("overview");

  // Optional: test Firestore connection on mount
  useEffect(() => {
    async function testFirestore() {
      try {
        const snapshot = await getDocs(collection(db, "stats"));
        console.log(
          "✅ Firestore connected! Docs:",
          snapshot.docs.map((d) => d.data())
        );
      } catch (err) {
        console.error("❌ Firestore error:", err);
      }
    }
    testFirestore();
  }, []);

  // Real-time collections
  const stats = useRealtimeCollection("stats");
  const moods = useRealtimeCollection("moods");
  const habits = useRealtimeCollection("habits");

  return (
    <main className="min-h-screen p-4 sm:p-6 lg:p-8 bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900 text-white">
      {/* Header */}
      <div className="text-center mb-12 pt-6">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
          Your{" "}
          <span className="bg-gradient-to-r from-indigo-400 to-blue-400 bg-clip-text text-transparent">
            MindSpace
          </span>{" "}
          Dashboard
        </h1>
      </div>

      {/* Time Range Filter */}
      <div className="flex justify-center mb-10">
        {["week", "month", "quarter"].map((range) => (
          <button
            key={range}
            onClick={() => setTimeRange(range)}
            className={`px-6 py-3 rounded-xl font-medium capitalize transition-all duration-200 ${
              timeRange === range
                ? "bg-gradient-to-r from-indigo-500 to-blue-500 text-white shadow-lg shadow-indigo-500/25"
                : "text-gray-400 hover:text-white hover:bg-gray-700/50"
            }`}
          >
            {range}
          </button>
        ))}
      </div>

      {/* View Toggle */}
      <div className="flex justify-center mb-12">
        {["overview", "habits", "mood"].map((view) => (
          <button
            key={view}
            onClick={() => setActiveView(view)}
            className={`px-8 py-3 rounded-xl font-medium capitalize transition-all duration-200 ${
              activeView === view
                ? "bg-gray-700/50 text-white shadow-inner"
                : "text-gray-400 hover:text-white"
            }`}
          >
            {view}
          </button>
        ))}
      </div>

      {/* Stats Section */}
      {(activeView === "overview" || activeView === "habits") && (
        <section className="mb-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {stats.length > 0
              ? stats.map((stat) => (
                  <StatsCard key={stat.id} {...stat} />
                ))
              : <StatsCard loading />}
          </div>
        </section>
      )}

      {/* Mood Chart */}
      {(activeView === "overview" || activeView === "mood") && (
        <MoodChart
          dataPoints={moods.map(m => ({ day: m.date, mood: m.mood }))}
          timeRange={timeRange}
        />
      )}

      {/* Habits */}
      {(activeView === "overview" || activeView === "habits") && (
        <div>
          {habits.map(habit => (
            <HabitProgress key={habit.id} {...habit} />
          ))}
        </div>
      )}
    </main>
  );
}
