import { IconCalendar, IconLocation } from "@tabler/icons-react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

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
    <div className="px-10 py-8">
      {/* User Info */}
      <div className="bg-base-200 p-6 rounded-lg shadow-lg text-center flex flex-col items-center space-y-3">
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
      </div>

      {/* User's Listings */}
      <h2 className="text-2xl font-semibold mt-8">Listings by {user.name}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-4">
        {listings.length > 0 ? (
          listings.map((item) => (
            <div
              key={item._id}
              className="card bg-base-300 shadow-lg hover:shadow-2xl transition p-4 rounded-xl border border-base-300"
            >
              {/* Product Image */}
              <div className="relative h-48 w-full">
                <img
                  src={item.images || "/Images/placeholder.png"}
                  alt={item.title}
                  className="h-full w-full object-cover rounded-md"
                />
                <span className="absolute top-2 left-2 bg-primary text-base-content text-xs px-2 py-1 rounded">
                  {item.category}
                </span>
              </div>

              {/* Product Details */}
              <div className="p-4">
                <h3 className="text-lg font-semibold text-primary">
                  {item.title}
                </h3>
                <p className="text-sm text-base-content/80 ">
                  {item.description.slice(0, 60)}...
                </p>

                <div className="flex items-center justify-between mt-2">
                  <p className="text-xl font-bold text-secondary">
                    &#8377; {item.pricePerDay}/day
                  </p>
                  <span className="badge badge-success">Available</span>
                </div>

                {/* Location & Availability */}
                <div className="flex items-center justify-between mt-3 text-base-content">
                  <div className="flex items-center space-x-1">
                    <IconLocation size={20} />
                    <span>{item.location.slice(0, 10)}...</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <IconCalendar size={20} />
                    <span>Available</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-3 flex justify-between">
                <Link
                  to={`/login`}
                  className="btn btn-primary w-1/2 mr-2 text-base"
                >
                  Rent
                </Link>
                <Link
                  to={`/${item._id}`}
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
    </div>
  );
};

export default UserDetails;
