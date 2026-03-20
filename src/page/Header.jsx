import React from "react";
import { Link } from "react-router-dom";
import HeaderImg from "../assets/Header.webp";

function Header() {
  return (
    <header className="fixed top-0 left-0 w-full z-50">
      <nav className="backdrop-blur-md bg-gradient-to-r from-gray-900/90 via-gray-800/80 to-gray-900/90 shadow-md border-b border-gray-700">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-4 sm:px-6 py-3 sm:py-4">
          
          {/* Logo + Title */}
          <Link to="/" className="flex items-center gap-2 sm:gap-3 group">
            <img 
              src={HeaderImg} 
              alt="Puzzle Quest Logo" 
              className="h-8 w-8 sm:h-10 sm:w-10 rounded-md group-hover:scale-110 transition-transform duration-300"
            />
            <span className="text-xl sm:text-2xl font-extrabold bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-500 bg-clip-text text-transparent tracking-wide group-hover:brightness-125 transition">
              Puzzle
            </span>
          </Link> 

        </div>
      </nav>
    </header>
  );
}

export default Header;
