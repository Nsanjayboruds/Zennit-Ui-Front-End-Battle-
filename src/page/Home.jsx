import React from "react";
import Hero from "../components/Hero";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white">
      {/* 🧩 Hero Section */}
      <Hero />

      {/* 🌿 Welcome Section */}
      <section className="py-20 text-center px-6">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Welcome to <span className="text-[#6C63FF]">MindSpace</span>
        </h2>
        <p className="max-w-xl mx-auto text-gray-400 leading-relaxed">
          Track your growth, monitor your habits, and reflect on your daily
          mood with our intelligent, interactive dashboard.  
          Discover clarity — one thought at a time.
        </p>
      </section>
       <Footer/>
    </main>

   
  );
}
