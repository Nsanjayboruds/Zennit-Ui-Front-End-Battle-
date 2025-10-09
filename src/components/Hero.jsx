import React, { useState, useEffect } from "react";

export default function Hero() {
  const [open, setOpen] = useState(false);

  // Disable scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => (document.body.style.overflow = "");
  }, [open]);

  return (
    <div className="relative w-full text-white overflow-hidden h-auto lg:h-[100dvh] font-sans">
      {/* 🖼️ Background */}
      <img
        className="absolute inset-0 h-full w-full object-cover"
        src="https://images.unsplash.com/photo-1531746790731-6c087fecd65a?auto=format&fit=crop&w=1920&q=80"
        alt="Mindful Background"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-[#0a0a0a]/70 to-[#141414]" />
      <div
        className="absolute inset-0 mix-blend-overlay opacity-[0.35]"
        style={{
          backgroundImage: "url(https://grainy-gradients.vercel.app/noise.svg)",
        }}
      />

    

      {/* 📱 Mobile Menu */}
      {open && (
        <div className="fixed inset-0 bg-black/95 z-30 flex flex-col items-center justify-center text-center space-y-8">
          <a href="#" className="text-2xl hover:text-gray-300">
            Dashboard
          </a>
          <a href="#" className="text-2xl hover:text-gray-300">
            Journal
          </a>
          <a href="#" className="text-2xl hover:text-gray-300">
            Insights
          </a>
          <a href="#" className="text-2xl hover:text-gray-300">
            Contact
          </a>
          <button
            onClick={() => setOpen(false)}
            className="mt-8 border border-white/20 rounded-full px-6 py-2 text-sm hover:bg-white/10 transition"
          >
            Close
          </button>
        </div>
      )}

      {/* 🧠 Hero Content */}
      <main
        className="
          relative z-10 grid grid-cols-12 gap-6
          px-6 sm:px-12 lg:px-16 xl:px-20
          pt-40 pb-20
          items-center h-auto lg:h-[calc(100vh-80px)]
        "
      >
        {/* Left: Text */}
        <section className="col-span-12 lg:col-span-7 xl:col-span-6">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight mb-6 drop-shadow-lg">
            Track Your Growth,  
            <br />
            Master Your Mind
          </h1>
          <p className="text-base sm:text-lg text-white/80 mb-8 max-w-2xl">
            MindSpace helps you track habits, reflect on moods, and understand
            your thoughts — empowering a better you.
          </p>
          <a
            href="/dashboard"
            className="inline-block bg-[#6C63FF] px-8 py-3 rounded-full font-medium text-white shadow-lg hover:bg-[#7c74ff] hover:scale-105 transition-transform"
          >
            Go to Dashboard →
          </a>
        </section>

        {/* Right: Info Card */}
        <aside className="col-span-12 lg:col-span-5 xl:col-span-6 mt-10 lg:mt-0">
          <div className="bg-black/40 p-6 rounded-2xl ring-1 ring-white/10 backdrop-blur-sm max-w-md ml-auto">
            <p className="text-sm text-white/80 leading-relaxed">
              “Your thoughts shape your reality. MindSpace is your personal
              reflection hub — helping you visualize growth, spot patterns, and
              stay mindful through every moment.”
            </p>
            <button className="mt-5 inline-flex items-center justify-center rounded-full bg-[rgba(25,28,32,0.65)] px-5 py-2 text-sm font-medium text-white ring-1 ring-white/15 hover:bg-[rgba(30,33,38,0.75)] transition-colors">
              Learn More
            </button>
          </div>
        </aside>
      </main>
    </div>
  );
}
