// src/components/ui/button.jsx
import React from "react";

export function Button({ children, onClick, className = "", variant = "primary" }) {
  const baseStyles =
    "px-4 py-2 rounded-lg font-semibold transition duration-200";

  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300",
    outline: "border border-gray-400 text-gray-700 hover:bg-gray-100",
  };

  return (
    <button
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
}
