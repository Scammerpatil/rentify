import React, { useState } from "react";
import ThemeToggler from "./ThemeToggler";
import { IconMoneybag } from "@tabler/icons-react";
import { Link } from "react-router-dom";

const Header = (props) => {
  // State to toggle the menu on smaller screens
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Function to toggle the menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className={`absolute top-0 left-0 z-40 navbar glass`}>
      {/* Logo */}
      <div className="navbar-start">
        <Link
          to="/"
          className={`w-72 flex flex-row items-center justify-center gap-3 py-5 lg:py-2 ${props.text}`}
        >
          <IconMoneybag size={50} className="text-primary" />
          <div className="flex flex-col items-start gap-1">
            <div className="flex items-baseline gap-[2px]">
              <span className="text-secondary font-extrabold text-xl">
                Rentify
              </span>
            </div>
            <hr className="w-full border border-base-content" />
            <span className="text-sm text-base-content/70 italic">
              Rent Anything, Anywhere
            </span>
          </div>
        </Link>
      </div>

      {/* Desktop Nav */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 text-base">
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
        </ul>
      </div>

      <div className="navbar-end hidden lg:flex">
        <Link to="/login" className="btn btn-accent">
          Sign In
        </Link>
        <Link to="/signup" className="btn btn-primary mx-2">
          Sign Up
        </Link>
        <ThemeToggler />
      </div>

      {/* Mobile Menu Toggle */}
      <div className="lg:hidden z-50">
        <button onClick={toggleMenu}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      {/* Mobile Dropdown */}
      <div
        className={`lg:hidden absolute top-full right-0 w-full bg-black/80 backdrop-blur-md px-6 py-4 space-y-4 z-40 transition-all duration-300 ${
          isMenuOpen ? "block" : "hidden"
        }`}
      >
        <Link
          to="/about"
          onClick={toggleMenu}
          className="block text-white text-lg"
        >
          About Us
        </Link>
        <Link
          to="/contact"
          onClick={toggleMenu}
          className="block text-white text-lg"
        >
          Contact Us
        </Link>
        <Link
          to="/login"
          onClick={toggleMenu}
          className="block text-white bg-accent px-4 py-2 rounded"
        >
          Sign In
        </Link>
        <Link
          to="/signup"
          onClick={toggleMenu}
          className="block text-white bg-primary px-4 py-2 rounded"
        >
          Sign Up
        </Link>
        <ThemeToggler />
      </div>
    </nav>
  );
};

export default Header;
