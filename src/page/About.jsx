import { useState, useEffect } from "react";

export default function AboutUs() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="w-screen py-12 overflow-x-clip bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white min-h-screen">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="grid gap-12 lg:gap-16">
          {/* Top Section */}
          <div className={`space-y-6 transition-all duration-700 delay-300 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <div className="flex items-center gap-3">
              <div className="w-2 h-8 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full"></div>
              <p className="text-sm font-medium uppercase tracking-widest text-blue-400">About MindSpace</p>
            </div>
            <h1 className="text-5xl font-bold tracking-tighter sm:text-6xl md:text-7xl lg:text-8xl">
              Your Personal
              <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-blue-600 bg-clip-text text-transparent">
                Growth Companion
              </span>
            </h1>
          </div>

          {/* Image Gallery Grid */}
          <div className={`flex flex-col lg:flex-row items-center gap-6 md:gap-8 transition-all duration-700 delay-500 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            {/* Mood Tracking Card */}
            <div className="group relative h-64 w-full lg:h-96 lg:w-1/3 rounded-3xl overflow-hidden transform hover:scale-105 transition-all duration-500">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-600/20 z-10"></div>
              <img
                src="https://i.postimg.cc/Y2f229jm/image-removebg-preview.png"
                alt="MindSpace app screenshot"
                className="object-cover w-full h-full transform group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute bottom-6 left-6 z-20">
                <span className="bg-black/60 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium">
                  📊 Mood Tracking
                </span>
              </div>
              {/* Hover Effect */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>
            </div>

            {/* Wellness Dashboard Card */}
            <div className="group relative h-64 w-full lg:h-96 lg:w-1/3 rounded-3xl overflow-hidden transform hover:scale-105 transition-all duration-500 delay-100">
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 to-teal-600/20 z-10"></div>
              <img
                src="https://i.pinimg.com/1200x/8a/95/b9/8a95b9e0b049b2179d7282d98364a5a2.jpg"
                alt="Wellness Dashboard"
                className="object-cover w-full h-full transform group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute bottom-6 left-6 z-20">
                <span className="bg-black/60 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium">
                  📈 Wellness Dashboard
                </span>
              </div>
            </div>

            {/* Logo Highlight Card */}
            <div className="group relative h-64 w-full lg:h-96 lg:w-1/3 rounded-3xl overflow-hidden transform hover:scale-105 transition-all duration-500 delay-200">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700 z-0"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent z-10"></div>
              
              {/* Animated Background Elements */}
              <div className="absolute top-4 right-4 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
              <div className="absolute bottom-4 left-4 w-16 h-16 bg-blue-300/20 rounded-full blur-lg"></div>
              
              <div className="relative z-20 h-full flex flex-col items-center justify-center text-white">
                <div className="text-center space-y-4">
                  <div className="w-20 h-20 mx-auto bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                    <span className="text-3xl font-bold bg-gradient-to-br from-white to-gray-300 bg-clip-text text-transparent">MS</span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold tracking-wider">MindSpace</h3>
                    <p className="text-blue-200 text-sm mt-2">Since 2024</p>
                  </div>
                </div>
              </div>

              {/* Floating particles */}
              <div className="absolute inset-0 overflow-hidden">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-2 h-2 bg-white/30 rounded-full animate-float"
                    style={{
                      left: `${20 + i * 15}%`,
                      top: `${30 + i * 10}%`,
                      animationDelay: `${i * 0.5}s`,
                    }}
                  ></div>
                ))}
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className={`grid gap-12 lg:grid-cols-2 lg:gap-20 transition-all duration-700 delay-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            {/* Left Bold Paragraph */}
            <div className="space-y-6">
              <p className="text-2xl font-semibold tracking-tight leading-relaxed md:text-3xl lg:text-4xl">
                MindSpace helps you track moods, monitor habits, and reflect daily.  
                Achieve personal growth and mindfulness with a visually engaging, interactive experience.
              </p>
              
              {/* Feature Points */}
              <div className="grid grid-cols-2 gap-4 mt-8">
                {[
                  { icon: "🎯", text: "Goal Tracking" },
                  { icon: "📊", text: "Analytics" },
                  { icon: "🔒", text: "Private & Secure" },
                  { icon: "📱", text: "Mobile Friendly" }
                ].map((feature, index) => (
                  <div key={index} className="flex items-center gap-3 text-gray-300">
                    <span className="text-xl">{feature.icon}</span>
                    <span className="text-sm font-medium">{feature.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Supporting Content */}
            <div className="space-y-8">
              <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
                Transform your daily routines into meaningful moments. MindSpace combines
                creativity, wellness, and innovation to support your mindful living journey.
              </p>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 py-6">
                {[
                  { number: "10K+", label: "Users" },
                  { number: "50K+", label: "Entries" },
                  { number: "99%", label: "Satisfaction" }
                ].map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-2xl font-bold text-blue-400">{stat.number}</div>
                    <div className="text-xs text-gray-400 mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="/journal"
                  className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-2xl font-semibold hover:from-blue-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg shadow-blue-500/25"
                >
                  <span>Start Journaling</span>
                  <span>→</span>
                </a>
                <a
                  href="/features"
                  className="inline-flex items-center justify-center gap-2 border border-gray-600 text-gray-300 px-8 py-4 rounded-2xl font-semibold hover:border-blue-400 hover:text-white transition-all duration-200"
                >
                  <span>Learn More</span>
                </a>
              </div>
            </div>
          </div>

          {/* Bottom Gradient Border */}
          <div className="h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent mt-12"></div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}