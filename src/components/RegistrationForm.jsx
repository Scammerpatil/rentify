import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import Header from "./Header";

function RegistrationForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    profilePhoto: "",
    password: "",
    role: "",
    address: "",
    phoneNumber: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const validate = () => {
    const newErrors = {};

    // Validate Full Name
    if (!formData.name.trim()) {
      newErrors.name = "Full Name is required.";
    } else if (!/^[a-zA-Z\s]+$/.test(formData.name)) {
      newErrors.name = "Full Name can only contain letters and spaces.";
    }

    // Validate Email
    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Enter a valid email address.";
    }

    // Validate Password
    if (!formData.password.trim()) {
      newErrors.password = "Password is required.";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long.";
    } else if (
      !/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/.test(
        formData.password
      )
    ) {
      newErrors.password =
        "Password must contain at least one letter, one number, and one special character.";
    }

    // Validate Role
    if (!formData.role) {
      newErrors.role = "Please select a role.";
    }

    // Validate Address
    if (!formData.address.trim()) {
      newErrors.address = "Address is required.";
    }

    // Validate Phone Number
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = "Phone Number is required.";
    } else if (!/^\+?\d{10,15}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = "Enter a valid phone number.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleUploadImage = async (e) => {
    e.preventDefault();
    const image = e.target.files[0];
    if (image) {
      setLoading(true);
      const imageData = new FormData();
      imageData.append("file", image);
      imageData.append("upload_preset", "practice");
      imageData.append("cloud_name", "dih4mkdr2");

      try {
        const response = await fetch(
          "https://api.cloudinary.com/v1_1/dih4mkdr2/image/upload",
          {
            method: "POST",
            body: imageData,
          }
        );
        const data = await response.json();
        if (data) {
          setFormData((prevState) => ({
            ...prevState,
            profilePhoto: data.secure_url,
          }));
          toast.success("Image uploaded successfully!");
        } else {
          toast.error("Failed to upload image. Please try again.");
        }
      } catch (error) {
        toast.error("An error occurred during image upload.");
      } finally {
        setLoading(false);
      }
    } else {
      toast.error("Please select an image to upload.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      setLoading(true);
      const formURL = ""; //remaining to add the url
      await axios.post(formURL, formData);
      toast.success("Successfully signed up!");
      setFormData({
        name: "",
        email: "",
        profilePhoto: "",
        password: "",
        role: "",
        address: "",
        phoneNumber: "",
      });
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md mx-auto mt-10 ">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Registration Form
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Full Name */}
          <div className="form-control">
            <label
              htmlFor="name"
              className="label text-sm font-medium text-gray-700"
            >
              <span className="label-text">Full Name</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`input input-bordered w-full ${
                errors.name ? "input-error" : ""
              }`}
            />
            {errors.name && (
              <p className="text-red-600 text-sm">{errors.name}</p>
            )}
          </div>

          {/* Email */}
          <div className="form-control">
            <label
              htmlFor="email"
              className="label text-sm font-medium text-gray-700"
            >
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`input input-bordered w-full ${
                errors.email ? "input-error" : ""
              }`}
            />
            {errors.email && (
              <p className="text-red-600 text-sm">{errors.email}</p>
            )}
          </div>

          {/* Profile photo */}
          <div className="form-control">
            <label
              htmlFor="profilePhoto"
              className="label text-sm font-medium text-gray-700"
            >
              <span className="label-text">Profile Photo</span>
            </label>
            <input
              type="file"
              id="profilePhoto"
              name="profilePhoto"
              accept="image/*"
              onChange={handleUploadImage}
              className="file-input file-input-bordered file-input-primary w-full"
            />
          </div>

          {/* Password */}
          <div className="form-control">
            <label
              htmlFor="password"
              className="label text-sm font-medium text-gray-700"
            >
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`input input-bordered w-full ${
                errors.password ? "input-error" : ""
              }`}
            />
            {errors.password && (
              <p className="text-red-600 text-sm">{errors.password}</p>
            )}
          </div>

          {/* Select Role */}
          <div className="form-control">
            <label
              htmlFor="role"
              className="label text-sm font-medium text-gray-700"
            >
              <span className="label-text">Select Role</span>
            </label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              className={`select select-bordered w-full ${
                errors.role ? "input-error" : ""
              }`}
            >
              <option value="">Select a role</option>
              <option value="renter">Renter</option>
              <option value="borrower">Borrower</option>
            </select>
            {errors.role && (
              <p className="text-red-600 text-sm">{errors.role}</p>
            )}
          </div>

          {/* Phone Number */}
          <div className="form-control">
            <label
              htmlFor="phoneNumber"
              className="label text-sm font-medium text-gray-700"
            >
              <span className="label-text">Phone Number</span>
            </label>
            <input
              type="number"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              className={`input input-bordered w-full ${
                errors.phoneNumber ? "input-error" : ""
              }`}
            />
            {errors.phoneNumber && (
              <p className="text-red-600 text-sm">{errors.phoneNumber}</p>
            )}
          </div>

          {/* Address */}
          <div className="form-control">
            <label
              htmlFor="address"
              className="label text-sm font-medium text-gray-700"
            >
              <span className="label-text">Address</span>
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className={`input input-bordered w-full ${
                errors.address ? "input-error" : ""
              }`}
            />
            {errors.address && (
              <p className="text-red-600 text-sm">{errors.address}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`btn btn-primary w-full ${loading ? "loading" : ""}`}
          >
            {loading ? "Registering..." : "Register"}
          </button>

          <span className="text-blue-500 hover:text-blue-700 font-normal transition duration-300 flex flex-col items-center justify-center">
            <p className="text-sm">
              <Link to="/login">Already have an account? Login</Link>
            </p>
          </span>
        </form>
      </div>
    </>
  );
}

export default RegistrationForm;
