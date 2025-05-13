import { IconCalendar, IconLocation } from "@tabler/icons-react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Header from "../../components/Header";

const UserDetails = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [listings, setListings] = useState([]);

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/user/${userId}`
      );
      setUser(response.data.user);
      setListings(response.data.listing);
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  if (!user) return <div className="text-center py-10">Loading...</div>;

  return (
    <>
      <Header />
      {/* User Info */}
      <div className="bg-base-200 px-10 pt-24 py-6 rounded-lg shadow-lg text-center flex flex-col items-center space-y-3">
        <img
          src={user.profileImage || "/Images/placeholder.png"}
          alt={user.name}
          className="h-24 w-24 rounded-full mx-auto border-4 border-primary object-cover"
        />
        <h1 className="text-3xl font-bold mt-3">{user.name}</h1>
        <p className="text-base-content">{user.email}</p>
        <p className="text-base-content/80">{user.phone}</p>
        <p className="text-base-content/70">
          {user.address || "Address not available"}
        </p>
        <p className="text-base-content/70">{user.aadharCard}</p>
        <a className="text-base-content/70" href={user.aadharCardImage}>
          <img
            src={user.aadharCardImage || "/Images/placeholder.png"}
            alt="Aadhar Card"
            className="h-24 w-24 rounded-full mx-auto border-4 border-primary object-cover"
          />
        </a>
        <div className="flex items-center space-x-2 mt-3">
          <a href={`mailto:${user.email}`} className="btn btn-primary btn-sm">
            Contact
          </a>
        </div>
      </div>

      {/* User's Listings */}
      <h2 className="text-2xl font-semibold mt-8 text-center">
        Listings by {user.name}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-4 px-10">
        {listings.length > 0 ? (
          listings.map((item) => (
            <div
              key={item._id}
              className="card bg-base-300 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border border-base-300 rounded-xl overflow-hidden group"
            >
              {/* Product Image */}
              <div className="relative h-48 w-full overflow-hidden">
                <img
                  src={item.images || "/Images/placeholder.png"}
                  alt={item.title}
                  className="h-full w-full object-contain rounded-t-xl transform group-hover:scale-105 transition duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent rounded-t-xl"></div>
                <span className="absolute top-2 left-2 bg-primary text-primary-content capitalize text-xs font-medium px-3 py-1 rounded-full shadow">
                  {item.category}
                </span>
              </div>

              {/* Product Info */}
              <div className="p-4">
                <div>
                  <h3 className="text-lg font-semibold text-primary mb-1 truncate">
                    {item.title}
                  </h3>
                  <p className="text-sm text-base-content/80 mb-3">
                    {item.description.slice(0, 60)}...
                  </p>
                </div>

                <div className="flex items-center justify-between text-base mt-2">
                  <p className="text-xl font-bold text-secondary">
                    ₹{item.pricePerDay}/day
                  </p>
                  <span className="badge badge-success text-xs">Available</span>
                </div>

                {/* Location & Availability */}
                <div className="flex items-center justify-between mt-3 text-xs text-base-content/70">
                  <div className="flex items-center gap-1">
                    <IconLocation size={18} />
                    <span>{item.address?.slice(0, 12)}...</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <IconCalendar size={18} />
                    <span>Available</span>
                  </div>
                </div>
              </div>

              {/* Owner Info */}
              <div className="flex items-center gap-3 p-4 bg-base-100 border-t border-base-200 text-base-content">
                <img
                  src={item.owner?.profileImage || "/Images/placeholder.png"}
                  alt="Owner"
                  className="h-10 w-10 rounded-full object-cover border-2 border-primary"
                />
                <Link
                  to={`/details/${item.owner?._id}`}
                  className="font-medium hover:text-primary transition"
                >
                  {item.owner?.name}
                </Link>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 p-4 pt-2">
                <Link to="/login" className="btn btn-primary btn-sm w-1/2">
                  Rent
                </Link>
                <Link
                  to={`/${item._id}`}
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

export default UserDetails;
