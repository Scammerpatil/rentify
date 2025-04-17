import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useUser } from "../../../context/UserContext";

const Product = ({ onClose, product }) => {
  const { user } = useUser();
  const [geoLocation, setGeoLocation] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    images: "",
    pricePerDay: "",
    availability: true,
    address: "",
    warrantyCard: "",
    insuranceCertificate: "",
    realTimeImages: "",
  });

  const isEditMode = Boolean(product?._id);

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
  const expensiveCategories = ["car", "bike", "camera", "laptop"];

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => setGeoLocation([pos.coords.longitude, pos.coords.latitude]),
        (err) => toast.error("Enable location access for accurate listing")
      );
    }

    if (isEditMode) {
      setFormData({ ...product });
      setGeoLocation(product.location || null);
    }
  }, [product]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDocumentUpload = async (e, fieldName, folderName) => {
    if (!formData.title) return toast.error("Enter product title first");

    const file = e.target.files?.[0];
    if (!file) return;

    const form = new FormData();
    form.append("file", file);
    form.append(
      "name",
      `${formData.title
        .split(" ")
        .map(((word) => word.toLowerCase()).join("-"))}-${fieldName}`
    );
    form.append("folderName", folderName || "productDocuments");

    const res = axios.post(
      "http://localhost:5000/api/helper/upload-image",
      form,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );

    toast.promise(res, {
      loading: `Uploading ${fieldName}...`,
      success: (data) => {
        setFormData((prev) => ({ ...prev, [fieldName]: data.data.filePath }));
        return `${fieldName} uploaded`;
      },
      error: `${fieldName} upload failed`,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.title ||
      !formData.description ||
      !formData.category ||
      !formData.pricePerDay ||
      !formData.images
    ) {
      toast.error("All fields are required");
      return;
    }

    if (!geoLocation) {
      toast.error("Location not available");
      return;
    }

    const payload = {
      ...formData,
      user,
      location: geoLocation,
    };

    try {
      const req = isEditMode
        ? axios.put(
            `http://localhost:5000/api/product/updateProduct/${product._id}`,
            {
              formData: payload,
            }
          )
        : axios.post("http://localhost:5000/api/product/addProduct", {
            formData: payload,
          });

      toast.promise(req, {
        loading: isEditMode ? "Updating product..." : "Adding product...",
        success: isEditMode ? "Product updated!" : "Product added!",
        error: (err) =>
          err?.response?.data?.message || "Failed to save product",
      });

      document.getElementById("addProduct").close();
    } catch (error) {
      console.error("Product error:", error);
    }
  };

  return (
    <dialog id="addProduct" className="modal">
      <div className="modal-box w-11/12 max-w-5xl bg-base-100 shadow-lg rounded-xl">
        <h3 className="text-2xl font-bold text-center text-primary uppercase">
          {isEditMode ? "✏️ Edit Product" : "🛒 List Your Product"}
        </h3>

        <form
          className="space-y-4 p-4"
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <input
            type="text"
            name="title"
            placeholder="Product Title"
            className="input input-bordered w-full"
            value={formData.title}
            onChange={handleChange}
          />

          <textarea
            name="description"
            placeholder="Product Description"
            className="textarea textarea-bordered w-full"
            value={formData.description}
            onChange={handleChange}
          ></textarea>

          <select
            name="category"
            className="select select-bordered w-full"
            value={formData.category}
            onChange={handleChange}
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat.charAt(0).toUpperCase() + cat.slice(1).replace(/_/g, " ")}
              </option>
            ))}
          </select>

          <input
            type="file"
            id="productImage"
            name="productImage"
            accept="image/*"
            onChange={(e) => {
              e.preventDefault();
              handleDocumentUpload(e, "images", "productImages");
            }}
            className="file-input file-input-bordered file-input-primary w-full"
            disabled={!formData.title}
          />

          <input
            type="number"
            name="pricePerDay"
            placeholder="Price per day"
            className="input input-bordered w-full"
            value={formData.pricePerDay}
            onChange={handleChange}
          />

          <input
            type="text"
            name="address"
            placeholder="Location"
            className="input input-bordered w-full"
            value={formData.address}
            onChange={handleChange}
          />

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="availability"
              className="checkbox checkbox-primary"
              checked={formData.availability}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  availability: e.target.checked,
                })
              }
            />
            <label>Available for rent</label>
          </div>

          {expensiveCategories.includes(formData.category) && (
            <>
              <label className="label">Warranty Card</label>
              <input
                type="file"
                accept=".pdf,image/*"
                onChange={(e) => {
                  e.preventDefault();
                  handleDocumentUpload(e, "warrantyCard", "productDocuments");
                }}
                className="file-input file-input-bordered w-full"
              />

              <label className="label">Insurance Certificate</label>
              <input
                type="file"
                accept=".pdf,image/*"
                onChange={(e) => {
                  e.preventDefault();
                  handleDocumentUpload(
                    e,
                    "insuranceCertificate",
                    "productDocuments"
                  );
                }}
                className="file-input file-input-bordered w-full"
              />

              <label className="label">Real-Time Images (with date)</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  e.preventDefault();
                  handleDocumentUpload(e, "realTimeImages", "productDocuments");
                }}
                className="file-input file-input-bordered w-full"
              />
            </>
          )}

          <div className="modal-action flex justify-between">
            <button onClick={handleSubmit} className="btn btn-primary px-6">
              {isEditMode ? "Update Product" : "Add Listing"}
            </button>
            <button type="button" className="btn" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
};

export default Product;
