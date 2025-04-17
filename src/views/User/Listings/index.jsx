import { IconCalendar, IconLocation, IconSearch } from "@tabler/icons-react";
import Layout from "../Layout";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Listings = () => {
  return (
    <Layout>
      <Component />
    </Layout>
  );
};

export default Listings;

const haversineDistance = (coords1, coords2) => {
  console.log("Calculating distance between:", coords1, coords2);
  const toRad = (value) => (value * Math.PI) / 180;
  const [lon1, lat1] = coords1;
  const [lon2, lat2] = coords2;

  const R = 6371;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;

  return R * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))); // in KM
};

const Component = () => {
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

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/product/", {
          withCredentials: true,
        });
        setListings(res.data);
      } catch (err) {
        console.error("Error fetching listings:", err);
      }
    };
    fetchListings();
  }, []);

  useEffect(() => {
    let filtered = listings;

    if (category && category !== "All") {
      filtered = filtered.filter((item) => item.category === category);
    }

    if (search.trim()) {
      filtered = filtered.filter((item) =>
        item.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (userCoords && distanceRange) {
      filtered = filtered
        .map((item) => {
          const distance = haversineDistance(
            userCoords,
            item.location.coordinates
          );
          return { ...item, distance };
        })
        .filter((item) => item.distance <= parseFloat(distanceRange))
        .sort((a, b) => a.distance - b.distance);
    } else if (userCoords) {
      filtered = filtered.map((item) => {
        const distance = haversineDistance(
          userCoords,
          item.location.coordinates
        );
        return { ...item, distance };
      });
    }

    setFilteredListings(filtered);
  }, [listings, search, category, userCoords, distanceRange]);

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
              className="card bg-base-300 shadow-lg hover:shadow-2xl transition p-4 rounded-xl border border-base-300"
            >
              <div className="relative h-48 w-full">
                <img
                  src={item.images || "/Images/placeholder.png"}
                  alt={item.title}
                  className="h-full w-full object-cover rounded-md"
                />
                <span className="absolute top-2 left-2 bg-primary text-xs text-primary-content px-2 py-1 rounded capitalize">
                  {item.category}
                </span>
                <span className="absolute top-2 right-2 bg-secondary text-xs text-secondary-content px-2 py-1 rounded">
                  {item.certificate ? "Certified" : "Uncertified"}
                </span>
              </div>

              <div className="p-4">
                <h3 className="text-lg font-semibold text-primary">
                  {item.title}
                </h3>
                <p className="text-sm text-base-content/80">
                  {item.description.slice(0, 60)}...
                </p>

                <div className="flex items-center justify-between mt-2">
                  <p className="text-xl font-bold text-secondary">
                    ₹ {item.pricePerDay}/day
                  </p>
                  {item.availability ? (
                    <span className="badge badge-success">Available</span>
                  ) : (
                    <span className="badge badge-error">Not Available</span>
                  )}
                </div>

                <div className="flex items-center justify-between mt-3 text-base-content">
                  <div className="flex items-center space-x-1">
                    <IconLocation size={20} />
                    <span>{item.address?.slice(0, 10)}...</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <IconCalendar size={20} />
                    <span>{item.availableFrom || "Notify You"}</span>
                  </div>
                </div>

                <div className="text-sm mt-2 text-info font-medium">
                  📍 {item.distance?.toFixed(2)} KM away
                </div>
              </div>

              <div className="p-3 bg-base-200 rounded-md">
                <Link
                  to={`/user/${item.owner?._id}`}
                  className="flex items-center space-x-3"
                >
                  <img
                    src={item.owner?.profileImage || "/Images/placeholder.png"}
                    alt="Owner"
                    className="avatar h-10 w-10 rounded-full border-2 border-primary object-cover"
                  />
                  <span className="font-medium text-base-content">
                    {item.owner?.name}
                  </span>
                </Link>
              </div>

              <div className="p-3 flex justify-between">
                <Link
                  to={item.availability ? `/product/${item._id}` : "#"}
                  className="btn btn-primary w-1/2 mr-2 text-base"
                >
                  Rent
                </Link>
                <Link
                  to={`/product/${item._id}`}
                  className="btn btn-secondary w-1/2 text-base"
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
