import { useState } from "react";

export default function JournalModal({ saveEntry }) {
  const [text, setText] = useState("");
  const [mood, setMood] = useState("neutral");
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const moods = [
    { id: "excited", emoji: "🎉", label: "Excited", color: "from-green-400 to-teal-400" },
    { id: "happy", emoji: "😊", label: "Happy", color: "from-yellow-400 to-orange-400" },
    { id: "calm", emoji: "😌", label: "Calm", color: "from-indigo-400 to-blue-400" },
    { id: "neutral", emoji: "😐", label: "Neutral", color: "from-gray-400 to-gray-500" },
    { id: "anxious", emoji: "😰", label: "Anxious", color: "from-red-400 to-pink-400" },
    { id: "sad", emoji: "😔", label: "Sad", color: "from-blue-400 to-purple-400" }
  ];

  const handleSubmit = async () => {
    if (!text.trim()) return;
    
    setIsSubmitting(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    saveEntry(text, mood);
    setText("");
    setMood("neutral");
    setOpen(false);
    setIsSubmitting(false);
  };

  const handleClose = () => {
    if (text.trim() && !window.confirm("You have unsaved changes. Are you sure you want to close?")) {
      return;
    }
    setText("");
    setMood("neutral");
    setOpen(false);
  };

  const getWordCount = () => {
    return text.trim() ? text.trim().split(/\s+/).length : 0;
  };

  const getCharacterCount = () => {
    return text.length;
  };

  return (
    <>
      {/* Add Entry Button */}
      <button 
        onClick={() => setOpen(true)}
        className="group relative bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-4 rounded-2xl font-semibold text-lg shadow-2xl shadow-blue-500/25 transform hover:scale-105 transition-all duration-300 flex items-center gap-3"
      >
        <span className="text-xl">✨</span>
        New Journal Entry
        <span className="text-xl group-hover:rotate-90 transition-transform duration-300">+</span>
        
        {/* Button Glow Effect */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-600 blur-lg opacity-50 group-hover:opacity-70 transition-opacity duration-300 -z-10"></div>
      </button>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center p-4 z-50 animate-fade-in">
          <div 
            className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl border border-gray-700/50 shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="relative p-6 border-b border-gray-700/50">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                New Journal Entry
              </h2>
              <p className="text-gray-400 mt-1">How are you feeling today?</p>
              
              {/* Close Button */}
              <button 
                onClick={handleClose}
                className="absolute top-4 right-4 text-gray-400 hover:text-white p-2 rounded-xl hover:bg-gray-700/50 transition-all duration-200"
              >
                <span className="text-2xl">×</span>
              </button>
            </div>

            {/* Mood Selection */}
            <div className="p-6 border-b border-gray-700/30">
              <label className="block text-sm font-medium text-gray-300 mb-4">
                Select your mood:
              </label>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
                {moods.map((moodOption) => (
                  <button
                    key={moodOption.id}
                    onClick={() => setMood(moodOption.id)}
                    className={`flex flex-col items-center p-3 rounded-2xl border-2 transition-all duration-200 transform hover:scale-105 ${
                      mood === moodOption.id
                        ? `border-blue-500 bg-gray-700/50 shadow-lg shadow-blue-500/25`
                        : "border-gray-600 bg-gray-700/30 hover:border-gray-500"
                    }`}
                  >
                    <span className="text-2xl mb-2">{moodOption.emoji}</span>
                    <span className={`text-xs font-medium ${
                      mood === moodOption.id ? "text-white" : "text-gray-400"
                    }`}>
                      {moodOption.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Text Area */}
            <div className="p-6">
              <label className="block text-sm font-medium text-gray-300 mb-4">
                What's on your mind?
              </label>
              <div className="relative">
                <textarea
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Write your thoughts, feelings, or reflections here... ✨"
                  className="w-full h-64 bg-gray-700/30 border border-gray-600/50 rounded-2xl p-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-all duration-200"
                  maxLength={2000}
                />
                
                {/* Character/Word Counter */}
                <div className="absolute bottom-3 right-3 flex gap-4 text-xs text-gray-400">
                  <span>{getWordCount()} words</span>
                  <span>{getCharacterCount()}/2000 chars</span>
                </div>
              </div>

              {/* Writing Prompt (Optional) */}
              {!text && (
                <div className="mt-4 p-4 bg-gray-700/20 rounded-xl border border-gray-600/30">
                  <p className="text-sm text-gray-400 italic">
                    💡 Prompt: What made you smile today? What are you grateful for?
                  </p>
                </div>
              )}
            </div>

            {/* Footer Actions */}
            <div className="p-6 border-t border-gray-700/50 bg-gray-800/30">
              <div className="flex flex-col sm:flex-row gap-3 justify-between items-center">
                <button
                  onClick={handleClose}
                  disabled={isSubmitting}
                  className="px-6 py-3 border border-gray-600 text-gray-300 rounded-xl font-medium hover:border-gray-500 hover:text-white transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto"
                >
                  Cancel
                </button>
                
                <div className="flex items-center gap-4 text-sm text-gray-400">
                  <span className="hidden sm:block">
                    Selected: {moods.find(m => m.id === mood)?.emoji} {moods.find(m => m.id === mood)?.label}
                  </span>
                  <button
                    onClick={handleSubmit}
                    disabled={!text.trim() || isSubmitting}
                    className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center gap-2 shadow-lg shadow-blue-500/25"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Saving...
                      </>
                    ) : (
                      <>
                        <span>Save Entry</span>
                        <span className="text-lg">📝</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scale-in {
          from { transform: scale(0.9); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        .animate-fade-in {
          animation: fade-in 0.2s ease-out;
        }
        .animate-scale-in {
          animation: scale-in 0.3s ease-out;
        }
      `}</style>
    </>
  );
}