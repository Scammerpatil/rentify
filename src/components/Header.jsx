import React from 'react'
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import Home from './Home';
export default function Header() {
  return (
    <div>
      {/* Header */}
      <header className="bg-primary text-primary-content">
        <div className="navbar container mx-auto">
          <div className="flex-1">
            <NavLink to="/">
              <a className="text-xl font-bold">RENTIFY</a>
            </NavLink>
          </div>
          <div className="flex-none gap-4">
            <div className="form-control">
              <div className="input-group">
                <input
                  type="text"
                  placeholder="Search products..."
                  className="input input-bordered w-64"
                />
              </div>
            </div>
            {/* Login & Sign Up buttons */}
            <NavLink to="/login">
              <button className="btn btn-ghost text-white">Login</button>
            </NavLink>
            <button className="btn btn-secondary text-white">Sign Up</button>
          </div>
        </div>
      </header>
    </div>
  );
}
