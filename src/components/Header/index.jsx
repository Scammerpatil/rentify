import React, { useState } from "react";
import ThemeToggler from "./ThemeToggler";
import { IconMoneybag } from "@tabler/icons-react";
import { Link } from "react-router-dom";

const Header = () => {
  // State to toggle the menu on smaller screens
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Function to toggle the menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar px-10">
      <div className="navbar-start">
        <Link
          to="/"
          className="w-72 flex flex-row items-center justify-center gap-3 py-5 lg:py-2"
        >
          <IconMoneybag size={50} className="text-primary" />
          <div className="flex flex-col items-start gap-1">
            <div className="flex items-baseline gap-[2px]">
              <span className="text-primary font-extrabold text-xl">
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

      {/* Navbar End - Menu for smaller screens */}
      <div className="navbar-end px-4">
        <div className="gap-5 pr-16 lg:pr-0 hidden lg:flex lg:items-center justify-end">
          <span className="flex gap-5">
            <Link
              to="/login"
              className="px-7 py-3 text-accent-content bg-accent font-medium hover:opacity-70 rounded-lg"
            >
              Sign In
            </Link>
            <Link
              to="/signup"
              className="rounded-lg bg-primary px-7 py-3 font-medium text-primary-content shadow-btn transition duration-300 hover:bg-opacity-90 hover:shadow-btn-hover "
            >
              Sign Up
            </Link>
          </span>
          <div>
            <ThemeToggler />
          </div>
        </div>

        {/* Hamburger Icon for smaller screens */}
        <div className="lg:hidden flex items-center">
          <button onClick={toggleMenu} className="text-2xl">
            {/* Hamburger Icon (SVG) */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-8 w-8"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Dropdown Menu for smaller screens */}
      <div
        className={`lg:hidden ${
          isMenuOpen ? "block" : "hidden"
        } absolute top-20 right-0 w-full bg-base-200 p-4 shadow-lg z-50`}
      >
        <ul className="menu menu-vertical text-lg space-y-3">
          <li>
            <Link to="/about" onClick={toggleMenu}>
              ABOUT
            </Link>
          </li>
          <li>
            <Link to="/about" onClick={toggleMenu}>
              CONTACT US
            </Link>
          </li>
          <li>
            <Link
              to="/login"
              className="px-7 py-3 text-accent-content bg-accent font-medium hover:opacity-70 rounded-lg"
              onClick={toggleMenu}
            >
              Sign In
            </Link>
          </li>
          <li>
            <Link
              to="/signup"
              className="rounded-lg bg-primary px-7 py-3 font-medium text-primary-content shadow-btn transition duration-300 hover:bg-opacity-90 hover:shadow-btn-hover "
              onClick={toggleMenu}
            >
              Sign Up
            </Link>
          </li>
          <li>
            <ThemeToggler />
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Header;
