import ThemeToggler from "./ThemeToggler";
import { IconMoneybag } from "@tabler/icons-react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <>
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
        <div class="navbar-center hidden lg:flex">
          <ul class="menu menu-horizontal px-1 text-lg">
            <li>
              <Link to="/about">ABOUT</Link>
            </li>
            <li>
              <Link to="/about">CONTACT US</Link>
            </li>
          </ul>
        </div>
        <div className="navbar-end px-4">
          <div className="gap-5 pr-16 lg:pr-0 hidden lg:flex lg:items-center justify-end">
            <span className="flex gap-5">
              <Link
                to="/login"
                className="px-7 py-3 text-accent-content bg-accent font-medium hover:opacity-70"
              >
                Sign In
              </Link>
              <Link
                to="/signup"
                className="rounded-sm bg-primary px-7 py-3 font-medium text-primary-content shadow-btn transition duration-300 hover:bg-opacity-90 hover:shadow-btn-hover"
              >
                Sign Up
              </Link>
            </span>
            <div>
              <ThemeToggler />
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
