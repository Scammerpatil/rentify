import { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../Layout";
import { useUser } from "../../../context/UserContext";
import Product from "../../../components/Dialogs/Product";
import toast from "react-hot-toast";

const MyRental = () => {
  return (
    <Layout>
      <Component />
    </Layout>
  );
};

export default MyRental;

const Component = () => {
  const { user } = useUser();
  const [listings, setListings] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [editData, setEditData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    getMyRentals();
  }, []);

  const getMyRentals = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/rental/${user._id}`
      );
      setListings(response.data.listings);
      setBookings(response.data.bookings);
    } catch (error) {
      console.error("Error fetching rentals:", error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this listing?"))
      return;
    try {
      const res = axios.delete(
        `http://localhost:5000/api/product/deleteProduct/${id}`
      );
      toast.promise(res, {
        loading: "Deleting your product...",
        success: () => {
          getMyRentals();
          return "Product deleted successfully.";
        },
        error: (err) => {
          console.log(err);
          toast.dismiss();
          return `Failed to delete product. ${
            err.response?.data?.message || err.message
          }`;
        },
      });
    } catch (err) {
      console.error("Error deleting product:", err);
      alert("Failed to delete listing.");
    }
  };

  const handleEdit = (product) => {
    setEditData(product);
    setIsEditing(true);
    document.getElementById("addProduct").showModal();
  };

  const handleCloseDialog = () => {
    setEditData(null);
    setIsEditing(false);
    getMyRentals();
  };

  return (
    <>
      <h1 className="text-4xl uppercase font-bold text-center mb-6">
        📦 My Rentals
      </h1>

      {/* Listings Table */}
      <div className="bg-base-300 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">📌 My Listed Products</h2>
        {listings.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="table table-zebra w-full">
              <thead>
                <tr className="text-base">
                  <th>Image</th>
                  <th>Title</th>
                  <th>Category</th>
                  <th>Price/Day</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {listings.map((item) => (
                  <tr key={item._id} className="text-base">
                    <td>
                      <img
                        src={item.images || "/Images/placeholder.png"}
                        alt={item.title}
                        className="h-16 w-16 rounded-md"
                      />
                    </td>
                    <td className="uppercase">{item.title}</td>
                    <td className="uppercase">{item.category}</td>
                    <td>₹{item.pricePerDay}</td>
                    <td>
                      <span
                        className={`badge ${
                          item.availability ? "badge-success" : "badge-error"
                        }`}
                      >
                        {item.availability ? "Available" : "Not Available"}
                      </span>
                    </td>
                    <td>
                      <button
                        className="btn btn-error btn-sm"
                        onClick={() => handleDelete(item._id)}
                      >
                        Delete
                      </button>
                      <button
                        className="btn btn-primary btn-sm ml-2"
                        onClick={() => handleEdit(item)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-secondary btn-sm ml-2"
                        onClick={() =>
                          window.open(`/product/${item._id}`, "_blank")
                        }
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-center text-base-content">
            No products listed yet.
          </p>
        )}
      </div>

      {/* Bookings Table */}
      <div className="bg-base-300 p-6 rounded-lg shadow-lg mt-8">
        <h2 className="text-2xl font-semibold mb-4">📑 Bookings</h2>
        {bookings.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="table table-zebra w-full">
              <thead>
                <tr className="text-base">
                  <th>Product</th>
                  <th>Renter</th>
                  <th>Start Date</th>
                  <th>End Date</th>
                  <th>Total Price</th>
                  <th>View User</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking) => (
                  <tr key={booking._id} className="text-base">
                    <td>{booking.listing.title}</td>
                    <td>{booking.renter.name}</td>
                    <td>{new Date(booking.startDate).toLocaleDateString()}</td>
                    <td>{new Date(booking.endDate).toLocaleDateString()}</td>
                    <td>₹{booking.totalPrice}</td>
                    <td>
                      <button
                        className="btn btn-secondary btn-sm"
                        onClick={() =>
                          window.open(`/user/${booking.renter._id}`, "_blank")
                        }
                      >
                        View User
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-center text-base-content">No bookings yet.</p>
        )}
      </div>

      {/* Add Button */}
      <div className="flex justify-center mt-8">
        <button
          className="btn btn-primary rounded-lg"
          onClick={() => {
            setEditData(null);
            setIsEditing(false);
            document.getElementById("addProduct").showModal();
          }}
        >
          + Add Your Listing
        </button>
      </div>

      <Product
        editMode={isEditing}
        product={editData}
        onClose={handleCloseDialog}
      />
    </>
  );
};
