import { useState } from "react";
import { NavLink } from "react-router-dom";
import Header from "../components/Header";

export default function SignUp() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    profileImage: "",
    verified: false,
  });

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
      <div className="container mx-auto p-10 w-1/2 flex items-center justify-center mt-10">
        <h1 className="text-4xl font-bold text-center text-base-content mb-6">
          Create an Account
        </h1>
        <form
          onSubmit={handleSubmit}
          className="bg-base-200 p-8 rounded-lg shadow-lg space-y-2"
        >
          {/* Name Input */}
          <label className="form-control w-full max-w-md">
            <div className="label">
              <span className="block text-lg font-semibold">Name</span>
            </div>
            <input
              type="text"
              placeholder="Enter your name"
              className="input input-bordered w-full max-w-md"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </label>

          {/* Email Input */}
          <label className="form-control w-full max-w-md">
            <div className="label">
              <span className="block text-lg font-semibold ">Email</span>
            </div>
            <input
              type="email"
              placeholder="Enter your email"
              className="input input-bordered w-full max-w-md"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </label>

          {/* Phone */}
          <label className="form-control w-full max-w-md">
            <div className="label">
              <span className="block text-lg font-semibold ">Phone</span>
            </div>
            <input
              type="text"
              placeholder="Enter your phone number"
              className="input input-bordered w-full max-w-md"
              required
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
            />
          </label>

          {/* Address */}
          <label className="form-control w-full max-w-md">
            <div className="label">
              <span className="block text-lg font-semibold ">Address</span>
            </div>
            <input
              type="text"
              placeholder="Enter your address"
              className="input input-bordered w-full max-w-md"
              required
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
            />
          </label>
          {/* profile Image */}
          <label className="form-control w-full max-w-md">
            <div className="label">
              <span className="block text-lg font-semibold ">
                Profile Image
              </span>
            </div>
            <input
              type="file"
              class="file-input file-input-bordered w-full max-w-md"
            />
          </label>

          {/* Password Input */}
          <label className="form-control w-full max-w-md">
            <div className="label">
              <span className="block text-lg font-semibold ">Password</span>
            </div>
            <input
              type="password"
              placeholder="Enter your password"
              className="input input-bordered w-full max-w-md"
              required
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
          </label>

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
