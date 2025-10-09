import { useEffect, useState } from "react";

export default function HabitProgress({ label, value }) {
  const [progress, setProgress] = useState(0);

  // Animate progress bar on mount
  useEffect(() => {
    const timeout = setTimeout(() => setProgress(value), 100);
    return () => clearTimeout(timeout);
  }, [value]);

  return (
    <div className="w-full">
      <div className="flex justify-between mb-1 text-sm font-medium text-gray-700">
        <span>{label}</span>
        <span>{progress}%</span>
      </div>
      <div className="w-full bg-gray-300 rounded-full h-4 overflow-hidden">
        <div
          className="h-4 rounded-full transition-all duration-1000 ease-out bg-gradient-to-r from-indigo-400 to-indigo-600 shadow-md"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
}
