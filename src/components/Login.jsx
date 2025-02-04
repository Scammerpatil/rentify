import { useState } from "react";
import Header from "./Header";
import { NavLink } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Email:", email);
    console.log("Password:", password);
  };

  return (
    <>
      <Header />
      <div className="container mx-auto p-10 max-w-md mt-10">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">
          Login User
        </h1>

        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-lg shadow-lg space-y-6"
        >
          {/* Email or Phone Input */}
          <div>
            <label
              htmlFor="email"
              className="block text-lg font-semibold text-gray-700 mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input input-bordered w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Enter your email "
              required
            />
          </div>

          {/* Password Input */}
          <div>
            <label
              htmlFor="password"
              className="block text-lg font-semibold text-gray-700 mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input input-bordered w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Enter your password"
              required
            />
          </div>

          {/* Submit Button */}
          <div className="mt-4">
            <button
              type="submit"
              className="btn btn-primary w-full p-3 text-white bg-primary rounded-lg shadow-md hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary"
            >
              Login
            </button>
          </div>

          {/* Forgot Password and Sign Up Links */}
          <div className="text-center mt-4">
            <p className="text-sm text-gray-600">
              <a href="#" className="text-primary hover:underline">
                Forgot Password?
              </a>
            </p>
            <NavLink to="/register">
              <p className="text-sm text-gray-600 mt-2">
                Don't have an account?{" "}
                <a className="text-primary hover:underline">Sign Up</a>
              </p>
            </NavLink>
          </div>
        </form>
      </div>
    </>
  );
}
