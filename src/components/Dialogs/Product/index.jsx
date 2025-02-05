import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useUser } from "../../../context/UserContext";

const Product = ({ onClose }) => {
  const { user } = useUser();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    images: "",
    pricePerDay: "",
    location: "",
  });

  const categories = [
    "car",
    "bike",
    "clothes",
    "room",
    "toys",
    "camera",
    "laptop",
    "computer",
    "mobile",
    "furniture",
    "tools",
    "sports",
    "books",
    "musical_instruments",
    "gaming_console",
    "camping_gear",
    "appliances",
    "party_supplies",
    "event_venues",
    "construction_equipment",
    "medical_equipment",
    "drones",
    "projectors",
    "costumes",
    "bicycles",
    "other",
  ];

  const handleUploadImage = async (e) => {
    e.preventDefault();
    const image = e.target.files[0];
    if (image) {
      const imageData = new FormData();
      imageData.append("file", image);
      imageData.append("upload_preset", "Rentify");
      imageData.append("cloud_name", "dkoxvg4cc");
      toast.loading("Uploading image...");
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
              images: data.url,
            }));
            toast.dismiss();
            toast.success("Image uploaded successfully.");
          });
      } catch (error) {
        console.error(error);
        toast.error("An error occurred during image upload.");
      }
    } else {
      toast.error("Please select an image to upload.");
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !formData.category ||
      !formData.description ||
      !formData.images ||
      !formData.title ||
      !formData.pricePerDay
    ) {
      document.getElementById("addProduct").close();
      toast.error("All Fields are required");
      document.getElementById("addProduct").showModal();
      return;
    }
    try {
      const response = axios.post(
        "http://localhost:5000/api/product/addProduct",
        { formData, user }
      );
      document.getElementById("addProduct").close();
      toast.promise(response, {
        loading: "Adding Your Product....",
        success: "Product added Successfully",
        error: (err) => {
          console.log(err);
          toast.dismiss();
          return `Oops.${err.response.data.message}`;
        },
      });
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  return (
    <dialog id="addProduct" className="modal">
      <div className="modal-box w-11/12 max-w-5xl bg-base-100 shadow-lg rounded-xl">
        <h3 className="text-2xl font-bold text-center text-primary">
          🛒 List Your Product
        </h3>
        <form onSubmit={handleSubmit} className="space-y-4 p-4">
          {/* Title */}
          <input
            type="text"
            name="title"
            placeholder="Product Title"
            className="input input-bordered w-full"
            value={formData.title}
            onChange={handleChange}
            required
          />

          {/* Description */}
          <textarea
            name="description"
            placeholder="Product Description"
            className="textarea textarea-bordered w-full"
            value={formData.description}
            onChange={handleChange}
            required
          ></textarea>

          {/* Category Dropdown */}
          <select
            name="category"
            className="select select-bordered w-full"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat.charAt(0).toUpperCase() + cat.slice(1).replace(/_/g, " ")}
              </option>
            ))}
          </select>

          {/* Image URL */}
          <input
            type="file"
            id="profilePhoto"
            name="profilePhoto"
            accept="image/*"
            onChange={handleUploadImage}
            className="file-input file-input-bordered file-input-primary w-full"
          />

          {/* Price Per Day */}
          <input
            type="number"
            name="pricePerDay"
            placeholder="Price per day"
            className="input input-bordered w-full"
            value={formData.pricePerDay}
            onChange={handleChange}
            required
          />

          {/* Location */}
          <input
            type="text"
            name="location"
            placeholder="Location"
            className="input input-bordered w-full"
            value={formData.location}
            onChange={handleChange}
            required
          />

          {/* Action Buttons */}
          <div className="modal-action flex justify-between">
            <button type="submit" className="btn btn-primary px-6">
              Add Listing
            </button>
            <button type="button" className="btn" onClick={onClose}>
              Close
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
};

export default Product;
