import { useState, useEffect } from "react";
import JournalModal from "../components/JournalModal";
import { loadJournal, saveJournal } from "../utils/storage";

export default function Journal() {
  const [entries, setEntries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [moodFilter, setMoodFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [isGridView, setIsGridView] = useState(true);

  useEffect(() => {
    const loadedEntries = loadJournal();
    setEntries(loadedEntries);
  }, []);

  const addEntry = (text, mood = "neutral") => {
    const newEntry = { 
      text, 
      mood,
      date: new Date().toLocaleString(),
      id: Date.now(),
      timestamp: new Date().getTime()
    };
    const newEntries = [...entries, newEntry];
    setEntries(newEntries);
    saveJournal(newEntries);
  };

  const deleteEntry = (id) => {
    if (window.confirm("Are you sure you want to delete this entry?")) {
      const newEntries = entries.filter(entry => entry.id !== id);
      setEntries(newEntries);
      saveJournal(newEntries);
      if (selectedEntry?.id === id) {
        setSelectedEntry(null);
      }
    }
  };

  const editEntry = (id, newText, newMood) => {
    const newEntries = entries.map(entry => 
      entry.id === id ? { ...entry, text: newText, mood: newMood } : entry
    );
    setEntries(newEntries);
    saveJournal(newEntries);
    setSelectedEntry(null);
  };

  const filteredEntries = entries
    .filter(entry => 
      entry.text.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (moodFilter === "all" || entry.mood === moodFilter)
    )
    .sort((a, b) => {
      if (sortBy === "newest") return b.timestamp - a.timestamp;
      if (sortBy === "oldest") return a.timestamp - b.timestamp;
      if (sortBy === "mood") {
        const moodOrder = { excited: 0, happy: 1, calm: 2, neutral: 3, anxious: 4, sad: 5 };
        return moodOrder[a.mood] - moodOrder[b.mood];
      }
      return 0;
    });

  const getMoodColor = (mood) => {
    const colors = {
      happy: "from-yellow-400 to-orange-400",
      sad: "from-blue-400 to-purple-400",
      excited: "from-green-400 to-teal-400",
      calm: "from-indigo-400 to-blue-400",
      anxious: "from-red-400 to-pink-400",
      neutral: "from-gray-400 to-gray-500"
    };
    return colors[mood] || colors.neutral;
  };

  const getMoodIcon = (mood) => {
    const icons = {
      happy: "😊",
      sad: "😔",
      excited: "🎉",
      calm: "😌",
      anxious: "😰",
      neutral: "😐"
    };
    return icons[mood] || icons.neutral;
  };

  const getMoodStats = () => {
    const moodCounts = entries.reduce((acc, entry) => {
      acc[entry.mood] = (acc[entry.mood] || 0) + 1;
      return acc;
    }, {});

    const total = entries.length;
    return { moodCounts, total };
  };

  const { moodCounts, total } = getMoodStats();

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white p-4 sm:p-8">
      {/* Header */}
      <header className="text-center mb-12 pt-8">
        <div className="relative inline-block">
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold bg-gradient-to-r from-indigo-300 via-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
            My Journal
          </h1>
          <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-indigo-400 to-blue-500 rounded-full opacity-60"></div>
        </div>
        <p className="text-gray-300 max-w-2xl mx-auto text-lg sm:text-xl mt-6 leading-relaxed">
          Reflect, express, and track your emotions daily.  
          Your thoughts are safe here — only you can see them.
        </p>
      </header>

      {/* Stats & Controls */}
      <div className="max-w-7xl mx-auto mb-12">
        {/* Mood Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-8">
          {Object.entries(moodCounts).map(([mood, count]) => (
            <div key={mood} className="bg-gray-800/40 backdrop-blur-lg rounded-2xl p-4 border border-gray-700/50 text-center">
              <div className="text-2xl mb-2">{getMoodIcon(mood)}</div>
              <div className="text-white font-bold text-lg">{count}</div>
              <div className="text-gray-400 text-xs capitalize">{mood}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {/* Stats Card */}
          <div className="bg-gray-800/40 backdrop-blur-lg rounded-2xl p-6 border border-gray-700/50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total Entries</p>
                <p className="text-3xl font-bold text-white">{total}</p>
              </div>
              <div className="text-4xl">📖</div>
            </div>
            {total > 0 && (
              <div className="mt-2 text-xs text-gray-400">
                {Math.round((moodCounts.happy || 0) / total * 100)}% positive
              </div>
            )}
          </div>

          {/* Search */}
          <div className="bg-gray-800/40 backdrop-blur-lg rounded-2xl p-6 border border-gray-700/50">
            <div className="relative">
              <input
                type="text"
                placeholder="Search entries..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-gray-700/50 border border-gray-600/50 rounded-xl py-3 px-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <span className="absolute right-3 top-3 text-gray-400">🔍</span>
            </div>
          </div>

          {/* Mood Filter */}
          <div className="bg-gray-800/40 backdrop-blur-lg rounded-2xl p-6 border border-gray-700/50">
            <select
              value={moodFilter}
              onChange={(e) => setMoodFilter(e.target.value)}
              className="w-full bg-gray-700/50 border border-gray-600/50 rounded-xl py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
            >
              <option value="all">All Moods</option>
              <option value="happy">😊 Happy</option>
              <option value="excited">🎉 Excited</option>
              <option value="calm">😌 Calm</option>
              <option value="sad">😔 Sad</option>
              <option value="anxious">😰 Anxious</option>
              <option value="neutral">😐 Neutral</option>
            </select>
          </div>

          {/* Sort & View Controls */}
          <div className="bg-gray-800/40 backdrop-blur-lg rounded-2xl p-6 border border-gray-700/50">
            <div className="flex gap-2">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="flex-1 bg-gray-700/50 border border-gray-600/50 rounded-xl py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none text-sm"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="mood">By Mood</option>
              </select>
              <button
                onClick={() => setIsGridView(!isGridView)}
                className="p-3 bg-gray-700/50 rounded-xl hover:bg-gray-600/50 transition-colors"
                title={isGridView ? "Switch to list view" : "Switch to grid view"}
              >
                {isGridView ? "📋" : "🟰"}
              </button>
            </div>
          </div>
        </div>

        {/* Add Entry Button */}
        <div className="flex justify-center mb-12">
          <JournalModal saveEntry={addEntry} />
        </div>
      </div>

      {/* Entries Grid/List */}
      <section className="max-w-7xl mx-auto">
        {filteredEntries.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">📝</div>
            <p className="text-gray-400 text-xl mb-2">
              {entries.length === 0 ? "No journal entries yet." : "No entries match your filters."}
            </p>
            <p className="text-gray-500">
              {entries.length === 0 
                ? "Start by adding your first reflection ✍️" 
                : "Try adjusting your search or filters"}
            </p>
          </div>
        ) : isGridView ? (
          // Grid View
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredEntries.map((entry) => (
              <JournalEntryCard
                key={entry.id}
                entry={entry}
                onDelete={deleteEntry}
                onEdit={editEntry}
                onSelect={setSelectedEntry}
                getMoodColor={getMoodColor}
                getMoodIcon={getMoodIcon}
                isSelected={selectedEntry?.id === entry.id}
              />
            ))}
          </div>
        ) : (
          // List View
          <div className="space-y-4">
            {filteredEntries.map((entry) => (
              <JournalEntryList
                key={entry.id}
                entry={entry}
                onDelete={deleteEntry}
                onEdit={editEntry}
                onSelect={setSelectedEntry}
                getMoodColor={getMoodColor}
                getMoodIcon={getMoodIcon}
                isSelected={selectedEntry?.id === entry.id}
              />
            ))}
          </div>
        )}
      </section>

      {/* Entry Detail Modal */}
      {selectedEntry && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-gray-800 rounded-2xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-bold">Journal Entry</h3>
              <button
                onClick={() => setSelectedEntry(null)}
                className="text-gray-400 hover:text-white"
              >
                ✕
              </button>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{getMoodIcon(selectedEntry.mood)}</span>
                <span className="capitalize text-lg font-semibold">{selectedEntry.mood}</span>
              </div>
              <p className="text-gray-200 whitespace-pre-wrap leading-relaxed">
                {selectedEntry.text}
              </p>
              <div className="text-sm text-gray-400 border-t border-gray-700 pt-4">
                {selectedEntry.date}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="text-center text-gray-400 text-sm mt-20 pb-8">
        <div className="max-w-md mx-auto">
          <p className="mb-2">✨ Journaling helps clear your mind — keep writing daily.</p>
          <p className="text-gray-500 text-xs">
            {filteredEntries.length} of {entries.length} entries shown • 
            Last entry: {entries.length > 0 ? new Date(entries[entries.length - 1].timestamp).toLocaleDateString() : 'Never'}
          </p>
        </div>
      </footer>
    </main>
  );
}

// Journal Entry Card Component (Grid View)
function JournalEntryCard({ entry, onDelete, onEdit, onSelect, getMoodColor, getMoodIcon, isSelected }) {
  return (
    <div
      className={`relative group bg-gray-800/30 backdrop-blur-md border rounded-2xl p-6 shadow-2xl transition-all duration-300 hover:scale-[1.02] hover:shadow-blue-500/10 ${
        isSelected 
          ? 'border-blue-400/60 scale-105' 
          : 'border-gray-700/40 hover:border-blue-400/40'
      }`}
    >
      {/* Mood Indicator */}
      <div className="flex items-center justify-between mb-4">
        <span className={`text-2xl ${getMoodColor(entry.mood)} bg-gradient-to-r bg-clip-text text-transparent font-semibold capitalize`}>
          {getMoodIcon(entry.mood)} {entry.mood}
        </span>
        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-all duration-200">
          <button
            onClick={() => onSelect(entry)}
            className="text-gray-400 hover:text-blue-400 transition-colors p-2 rounded-lg hover:bg-blue-400/10"
            title="View details"
          >
            👁️
          </button>
          <button
            onClick={() => onDelete(entry.id)}
            className="text-gray-400 hover:text-red-400 transition-colors p-2 rounded-lg hover:bg-red-400/10"
            title="Delete entry"
          >
            🗑️
          </button>
        </div>
      </div>

      {/* Entry Text */}
      <div 
        onClick={() => onSelect(entry)}
        className="cursor-pointer"
      >
        <p className="text-gray-200 text-lg leading-relaxed whitespace-pre-wrap line-clamp-6">
          {entry.text}
        </p>
      </div>

      {/* Date & Stats */}
      <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-700/30">
        <p className="text-sm text-gray-400 italic">{entry.date}</p>
        <span className="text-xs text-gray-500 bg-gray-700/50 px-2 py-1 rounded-full">
          {entry.text.length} chars
        </span>
      </div>

      {/* Gradient Glow Effect */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-10 bg-gradient-to-br from-blue-400 via-purple-500 to-pink-400 blur-xl transition-all duration-300 -z-10"></div>
    </div>
  );
}

// Journal Entry List Component (List View)
function JournalEntryList({ entry, onDelete, onEdit, onSelect, getMoodColor, getMoodIcon, isSelected }) {
  return (
    <div
      className={`relative group bg-gray-800/30 backdrop-blur-md border rounded-2xl p-6 transition-all duration-300 hover:scale-[1.01] ${
        isSelected 
          ? 'border-blue-400/60 bg-blue-400/10' 
          : 'border-gray-700/40 hover:border-blue-400/40'
      }`}
    >
      <div className="flex items-start gap-4">
        {/* Mood Icon */}
        <div className="text-3xl flex-shrink-0">
          {getMoodIcon(entry.mood)}
        </div>
        
        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-2">
            <span className={`text-lg font-semibold capitalize ${getMoodColor(entry.mood)} bg-gradient-to-r bg-clip-text text-transparent`}>
              {entry.mood}
            </span>
            <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-all duration-200">
              <button
                onClick={() => onSelect(entry)}
                className="text-gray-400 hover:text-blue-400 transition-colors p-2 rounded-lg hover:bg-blue-400/10"
                title="View details"
              >
                👁️
              </button>
              <button
                onClick={() => onDelete(entry.id)}
                className="text-gray-400 hover:text-red-400 transition-colors p-2 rounded-lg hover:bg-red-400/10"
                title="Delete entry"
              >
                🗑️
              </button>
            </div>
          </div>
          
          <div 
            onClick={() => onSelect(entry)}
            className="cursor-pointer"
          >
            <p className="text-gray-200 leading-relaxed whitespace-pre-wrap line-clamp-3">
              {entry.text}
            </p>
          </div>
          
          <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-700/30">
            <p className="text-sm text-gray-400 italic">{entry.date}</p>
            <span className="text-xs text-gray-500 bg-gray-700/50 px-2 py-1 rounded-full">
              {entry.text.length} chars
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}