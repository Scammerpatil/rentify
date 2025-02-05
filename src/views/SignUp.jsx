import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import Header from "../components/Header";

function RegistrationForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    profilePhoto: "",
    password: "",
    address: "",
    phoneNumber: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const router = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = "Full Name is required.";
    } else if (!/^[a-zA-Z\s]+$/.test(formData.name)) {
      newErrors.name = "Full Name can only contain letters and spaces.";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Enter a valid email address.";
    }
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
    if (!formData.address.trim()) {
      newErrors.address = "Address is required.";
    }

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
      const imageData = new FormData();
      imageData.append("file", image);
      imageData.append("upload_preset", "Rentify");
      imageData.append("cloud_name", "dkoxvg4cc");
      // toast.loading("Uploading image...");
      try {
        fetch("https://api.cloudinary.com/v1_1/dkoxvg4cc/image/upload", {
          method: "post",
          body: imageData,
        })
          .then((resp) => resp.json())
          .then((data) => {
            console.log(data);
            setFormData((prevState) => ({
              ...prevState,
              profilePhoto: data.url,
            }));
            toast.success("Image uploaded successfully.");
          });
        // toast.dismiss("Uploading image...");
      } catch (error) {
        console.error(error);
        toast.error("An error occurred during image upload.");
      }
    } else {
      toast.error("Please select an image to upload.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) {
      toast.error("Please fill in all required fields.");
      return;
    }
    console.log(formData);
    try {
      const formURL = "http://localhost:5000/api/auth/signup";
      const response = axios.post(formURL, formData);
      toast.promise(response, {
        loading: "Registering...",
        success: () => {
          router("/login");
          return "Registration successful. Please login.";
        },
        error: (err) => {
          console.log(err);
          return err.response.data.message;
        },
      });
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <>
      <Header />
      <div className="bg-base-300 p-8 rounded-lg shadow-md w-full max-w-md mx-auto mt-10 border border-base-content">
        <h2 className="text-2xl font-bold mb-6 text-center text-base-content">
          Hello there! Welcome to Rentify
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Full Name */}
          <div className="form-control">
            <label
              htmlFor="name"
              className="label text-sm font-medium text-base-content"
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

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`btn btn-primary w-full ${loading ? "loading" : ""}`}
          >
            {loading ? "Registering..." : "Register"}
          </button>

          <span className="font-normal transition duration-300 flex flex-col items-center justify-center">
            <p className="text-sm">
              Already have an account?
              <Link to="/login" className="text-primary">
                Login
              </Link>
            </p>
          </span>
        </form>
      </div>
    </>
  );
}

export default RegistrationForm;
