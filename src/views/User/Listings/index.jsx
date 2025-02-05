import { IconCalendar, IconLocation } from "@tabler/icons-react";
import Product from "../../../components/Dialogs/Product";
import Layout from "../Layout";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Listings = () => {
  return (
    <Layout>
      <Component />
    </Layout>
  );
};

export default Listings;

const Component = () => {
  const [listings, setListings] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/product/")
      .then((res) => res.json())
      .then((data) => setListings(data))
      .catch((err) => console.error("Error fetching listings:", err));
  }, []);

  return (
    <div className="">
      <h1 className="text-4xl font-bold text-center mb-6">
        Available Listings
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
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

              {/* Owner Info */}
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

              {/* Action Buttons */}
              <div className="p-3 flex justify-between">
                <Link
                  to={`/product/${item._id}`}
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

      <div className="flex justify-center mt-8">
        <button
          className="btn btn-primary text-lg rounded-lg"
          onClick={() => {
            document.getElementById("addProduct").showModal();
          }}
        >
          + Add Your Listing
        </button>
      </div>
      <Product />
    </div>
  );
};
