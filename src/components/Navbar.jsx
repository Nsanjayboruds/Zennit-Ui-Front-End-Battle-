// src/components/Navbar.jsx
import { useState } from "react";
import { HiMenu, HiX } from "react-icons/hi";
import { Link } from "react-router-dom";
import { Button } from "./ui/button.jsx";
import geminiimg from "../assets/gemimg.png"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Dashboard", path: "/dashboard" },
    { name: "About", path: "/about" },
    { name: "Journal", path: "/journal" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[92%] md:w-[80%] bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-xl transition-all duration-500">
      <div className="flex justify-between items-center px-6 py-4">
        {/* 🌌 Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <img
            src={geminiimg}
            alt="MindSpace"
            className="h-10 w-10 rounded-full shadow-md"
          />
          <span className="text-xl font-bold text-white tracking-wide">MindSpace</span>
        </Link>

        {/* 💻 Desktop Nav */}
        <div className="hidden md:flex items-center space-x-1">
          {navLinks.map((link) => (
            <Link key={link.name} to={link.path}>
              <Button
                variant="ghost"
                className="text-purple-300 hover:text-blue-300 transition-all"
              >
                {link.name}
              </Button>
            </Link>
          ))}

          <Button className="ml-4 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white shadow-lg transition-all">
            Get Started
          </Button>
        </div>

        {/* 📱 Mobile Toggle */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="p-2 text-white rounded-md bg-white/10 hover:bg-white/20 transition"
          >
            {isOpen ? <HiX size={24} /> : <HiMenu size={24} />}
          </button>
        </div>
      </div>

      {/* 📲 Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden px-6 pb-5 pt-3 border-t border-white/10 bg-black/60 backdrop-blur-md rounded-b-2xl">
          <div className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={toggleMenu}
                className="text-white/90 text-lg hover:text-blue-300 transition"
              >
                {link.name}
              </Link>
            ))}
            <Button className="mt-3 bg-gradient-to-r from-blue-500 to-indigo-500 w-full text-white">
              Get Started
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
}
