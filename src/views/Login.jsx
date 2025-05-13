import { useState } from "react";
import Header from "../components/Header";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

export default function Login() {
  // Form data
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const router = useNavigate();

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const response = axios.post(
      "http://localhost:5000/api/auth/login",
      formData,
      { withCredentials: true }
    );
    toast.promise(response, {
      loading: "Logging in...",
      success: (data) => {
        console.log(data);
        router("/user/dashboard");
        return "Logged in successfully!";
      },
      error: (err) => {
        return err.response.data.message;
      },
    });
  };

  return (
    <div className="bg-base-200 min-h-screen flex flex-col items-center justify-center">
      <Header />
      <div className="bg-base-300 p-8 rounded-lg shadow-md w-full max-w-md mx-auto mt-10 border border-base-content">
        <h2 className="text-2xl font-bold mb-6 text-center text-base-content">
          Hey there! Welcome back
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="form-control">
            <label
              htmlFor="email"
              className="label text-sm font-medium text-base-content"
            >
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className={`input input-bordered w-full `}
            />
          </div>
          {/* Password */}
          <div className="form-control">
            <label
              htmlFor="password"
              className="label text-sm font-medium text-base-content"
            >
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={(e) => {
                setFormData({ ...formData, password: e.target.value });
              }}
              className={`input input-bordered w-full `}
            />
          </div>

          {/* Submit Button */}
          <button type="submit" className="btn btn-primary w-full">
            Login
          </button>

          <span className="font-normal transition duration-300 flex flex-col items-center justify-center">
            <p className="text-sm">
              Don't have an account?
              <Link to="/signup" className="text-primary">
                {" "}
                Sign Up
              </Link>
            </p>
          </span>
        </form>
      </div>
    </div>
  );
}
