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
    aadharCard: "",
    aadharCardImage: "",
  });
  const [errors, setErrors] = useState({});
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

    if (!formData.aadharCard.trim()) {
      newErrors.aadharCard = "Aadhar Card Number is required.";
    }
    if (!/^\d{12}$/.test(formData.aadharCard)) {
      newErrors.aadharCard = "Aadhar Card Number must be 12 digits.";
    }
    if (!formData.aadharCardImage) {
      newErrors.aadharCardImage = "Aadhar Card Image is required.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleUploadImage = (e, folderName, path) => {
    if (!formData.name) {
      toast.error("Name is required for images");
      return;
    }
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > 5 * 1024 * 1024) {
        alert("File size exceeds 5MB");
        return;
      }

      const form = new FormData();
      form.append("file", file);
      form.append("name", formData.name.split(" ").join("_"));
      form.append("folderName", folderName);
      const imageResponse = axios.post(
        "http://localhost:5000/api/helper/upload-image",
        form,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast.promise(imageResponse, {
        loading: "Uploading Image...",
        success: (data) => {
          console.log(data.data);
          setFormData({
            ...formData,
            [path]: data.data.filePath,
          });
          return "Image Uploaded Successfully";
        },
        error: (err) => `This just happened: ${err}`,
      });
    }
  };

  const handleSubmit = async () => {
    if (!validate()) {
      toast.error("Please fill in all required fields.");
      return;
    }
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
        <div className="space-y-4">
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
              className="label text-sm font-medium text-base-content"
            >
              <span className="label-text">Profile Photo</span>
            </label>
            <input
              type="file"
              id="profilePhoto"
              name="profilePhoto"
              accept="image/*"
              onChange={(e) => {
                handleUploadImage(e, "profileImages", "profilePhoto");
              }}
              disabled={!formData.name}
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
              type="text"
              id="phoneNumber"
              name="phoneNumber"
              pattern="\+?\d{10}"
              maxLength={10}
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

          <div className="form-control">
            <label
              htmlFor="aadharCard"
              className="label text-sm font-medium text-gray-700"
            >
              <span className="label-text">Aadhar Card Number</span>
            </label>
            <input
              type="text"
              id="aadharCard"
              name="aadharCard"
              pattern="\d{12}"
              maxLength={12}
              value={formData.aadharCard}
              onChange={handleChange}
              className={`input input-bordered w-full ${
                errors.aadharCard ? "input-error" : ""
              }`}
            />
            {errors.aadharCard && (
              <p className="text-red-600 text-sm">{errors.aadharCard}</p>
            )}
          </div>

          <div className="form-control">
            <label
              htmlFor="aadharCardImage"
              className="label text-sm font-medium text-gray-700"
            >
              <span className="label-text">Aadhar Card Image</span>
            </label>
            <input
              type="file"
              id="aadharCardImage"
              name="aadharCardImage"
              accept="image/*"
              className="file-input file-input-bordered file-input-primary w-full"
              disabled={!formData.name}
              onChange={(e) => {
                handleUploadImage(e, "aadharCardImage", "aadharCardImage");
              }}
            />
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
          <button className={`btn btn-primary w-full`} onClick={handleSubmit}>
            Register
          </button>

          <span className="font-normal transition duration-300 flex flex-col items-center justify-center">
            <p className="text-sm">
              Already have an account?
              <Link to="/login" className="text-primary">
                Login
              </Link>
            </p>
          </span>
        </div>
      </div>
    </>
  );
}

export default RegistrationForm;
