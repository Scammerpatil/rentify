import {
  IconCalendar,
  IconHeart,
  IconLocation,
  IconSearch,
} from "@tabler/icons-react";
import Layout from "../Layout";
import haversine from "haversine-distance";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useUser } from "../../../context/UserContext";
import toast from "react-hot-toast";

const Listings = () => {
  return (
    <Layout>
      <Component />
    </Layout>
  );
};

export default Listings;

const Component = () => {
  const { user } = useUser();
  const [listings, setListings] = useState([]);
  const [filteredListings, setFilteredListings] = useState([]);
  const [userCoords, setUserCoords] = useState(null);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [distanceRange, setDistanceRange] = useState("");

  const categories = [
    "All",
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
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserCoords([pos.coords.longitude, pos.coords.latitude]);
      },
      (err) => {
        console.error("Geolocation Error:", err);
      }
    );
  }, []);

  const fetchListings = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/product/", {
        withCredentials: true,
      });
      const data = res.data;
      setListings(res.data);
    } catch (err) {
      console.error("Error fetching listings:", err);
    }
  };
  useEffect(() => {
    fetchListings();
  }, []);

  useEffect(() => {
    let filtered = listings;
    if (user) {
      filtered = listings.sort((a, b) => {
        if (user.wishlist?.includes(a._id) && !user.wishlist?.includes(b._id)) {
          return -1;
        } else if (
          !user.wishlist?.includes(a._id) &&
          user.wishlist?.includes(b._id)
        ) {
          return 1;
        }
        return 0;
      });
    }
    if (category && category !== "All") {
      filtered = filtered.filter((item) => item.category === category);
    }

    if (search.trim()) {
      filtered = filtered.filter((item) =>
        item.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (userCoords && distanceRange) {
      console.log("User Coordinates:", userCoords);
      console.log(
        "Item Coordinates:",
        filtered.map((item) => item.location.coordinates)
      );
      filtered = filtered
        .map((item) => {
          const distance = haversine(userCoords, item.location.coordinates);
          return { ...item, distance };
        })
        .filter((item) => item.distance <= parseFloat(distanceRange))
        .sort((a, b) => a.distance - b.distance);
    } else if (userCoords) {
      filtered = filtered.map((item) => {
        const distance = haversine(userCoords, item.location.coordinates);
        return { ...item, distance };
      });
    }

    setFilteredListings(filtered);
  }, [listings, search, category, userCoords, distanceRange]);

  const handleWishlist = async (itemId, action) => {
    try {
      const res = axios.post(
        `http://localhost:5000/api/user/wishlist/${action}`,
        { itemId },
        { withCredentials: true }
      );
      toast.promise(res, {
        loading: "Updating wishlist...",
        success: (res) => {
          return res.data.message;
        },
        error: (err) => {
          console.error("Error updating wishlist:", err);
          return "Error updating wishlist";
        },
      });
    } catch (err) {
      console.error("Error updating wishlist:", err);
      toast.error("Error updating wishlist");
    }
  };

  return (
    <>
      <h1 className="text-4xl uppercase font-bold text-center mb-6">
        Available Listings
      </h1>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-6 items-center justify-center w-full">
        <select
          className="select select-primary select-bordered w-1/3"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat === "All"
                ? "All Categories"
                : cat.charAt(0).toUpperCase() + cat.slice(1).replace(/_/g, " ")}
            </option>
          ))}
        </select>
        <label className="input input-bordered flex items-center gap-2 input-primary w-1/3">
          <input
            type="text"
            placeholder="Search by name"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full"
          />
          <IconSearch className="text-base-content" size={20} />
        </label>

        {/* Distance */}
        <select
          className="select select-bordered select-primary w-1/3"
          value={distanceRange}
          onChange={(e) => setDistanceRange(e.target.value)}
        >
          <option value="">All Distances</option>
          <option value="0.01">10 Meters</option>
          <option value="0.5">500 Meters</option>
          <option value="1">1 KM</option>
          <option value="5">5 KM</option>
          <option value="10">10 KM</option>
          <option value="50">50 KM</option>
          <option value="100">100 KM</option>
        </select>
      </div>

      {/* Listings */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
        {filteredListings.length > 0 ? (
          filteredListings.map((item) => (
            <div
              key={item._id}
              className="relative card bg-base-300 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-4 rounded-xl border border-base-300 group"
            >
              {/* Wishlist Button */}
              <button
                className={`absolute top-2 right-2 z-10 btn btn-error btn-circle btn-sm ${
                  user.wishlist?.includes(item._id)
                    ? "btn-active text-error-content"
                    : "btn-outline"
                }`}
                onClick={() => {
                  if (user.wishlist?.includes(item._id)) {
                    handleWishlist(item._id, "remove");
                  } else {
                    handleWishlist(item._id, "add");
                  }
                }}
              >
                <IconHeart
                  size={20}
                  className="text-error group-hover:scale-110 transition-transform"
                />
              </button>

              {/* Product Image */}
              <div className="relative h-48 w-full overflow-hidden rounded-lg">
                <img
                  src={item.images || "/Images/placeholder.png"}
                  alt={item.title}
                  className="h-full w-full object-cover rounded-lg group-hover:scale-105 transition duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-lg" />
                <span className="absolute top-2 left-2 bg-primary text-primary-content capitalize text-xs font-semibold px-3 py-1 rounded-full shadow">
                  {item.category}
                </span>
                <span className="absolute bottom-2 left-2 bg-secondary text-secondary-content text-xs px-2 py-1 rounded shadow">
                  {item.certificate ? "Certified" : "Uncertified"}
                </span>
              </div>

              {/* Details Section */}
              <div className="p-4 space-y-2">
                <h3 className="text-lg font-semibold text-primary truncate">
                  {item.title}
                </h3>
                <p className="text-sm text-base-content/80 line-clamp-2">
                  {item.description.slice(0, 60)}...
                </p>

                <div className="flex items-center justify-between">
                  <p className="text-xl font-bold text-secondary">
                    ₹{item.pricePerDay}/day
                  </p>
                  <span
                    className={`badge ${
                      item.availability ? "badge-success" : "badge-error"
                    }`}
                  >
                    {item.availability ? "Available" : "Not Available"}
                  </span>
                </div>

                {/* Location & Date */}
                <div className="flex justify-between text-sm text-base-content/70">
                  <div className="flex items-center gap-1">
                    <IconLocation size={18} />
                    <span>{item.address?.slice(0, 12)}...</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <IconCalendar size={18} />
                    <span>{item.availableFrom || "Notify You"}</span>
                  </div>
                </div>

                {/* Distance */}
                {item.distance && (
                  <div className="text-sm text-info font-medium mt-1">
                    📍 {item.distance.toFixed(2)} KM away
                  </div>
                )}
              </div>

              {/* Owner Info */}
              <div className="flex items-center gap-3 p-3 bg-base-200 rounded-md mt-2">
                <img
                  src={item.owner?.profileImage || "/Images/placeholder.png"}
                  alt="Owner"
                  className="h-10 w-10 rounded-full border-2 border-primary object-cover"
                />
                <Link
                  to={`/user/${item.owner?._id}`}
                  className="font-medium hover:text-primary"
                >
                  {item.owner?.name}
                </Link>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 p-3 pt-2">
                <Link
                  to={item.availability ? `/product/${item._id}` : "#"}
                  className="btn btn-primary btn-sm w-1/2"
                >
                  Rent
                </Link>
                <Link
                  to={`/product/${item._id}`}
                  className="btn btn-secondary btn-sm w-1/2"
                >
                  Details
                </Link>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-base-content col-span-full">
            No listings available.
          </p>
        )}
      </div>
    </>
  );
};
