import toast from "react-hot-toast";
import Header from "../../components/Header";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { IconCalendar, IconLocation } from "@tabler/icons-react";
const Category = () => {
  const { category } = useParams();
  const [listings, setListings] = useState([]);
  const getProduct = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/product/category/${category}`
      );
      setListings(response.data);
    } catch (error) {
      toast.error("Failed to fetch products");
    }
  };
  useEffect(() => {
    getProduct();
  }, []);
  return (
    <>
      <Header />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-10 mt-10">
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
                  to={`/details/${item.owner?._id}`}
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
          <p className="text-base-content col-span-full w-full flex items-center justify-center text-5xl">
            No listings available.
          </p>
        )}
      </div>
    </>
  );
};
export default Category;
