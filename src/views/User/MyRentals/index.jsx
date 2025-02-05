import { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../Layout";
import { useUser } from "../../../context/UserContext";

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

  useEffect(() => {
    getMyRentals();
  }, []);

  const getMyRentals = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/rental/${user._id}`
      );
      console.log(response.data);
      setListings(response.data.listings);
      setBookings(response.data.bookings);
    } catch (error) {
      console.error("Error fetching rentals:", error);
    }
  };

  return (
    <div className="px-10 py-8">
      <h1 className="text-4xl font-bold text-center mb-6">📦 My Rentals</h1>
      <div className="bg-base-200 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">📌 My Listed Products</h2>
        {listings && listings.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Title</th>
                  <th>Category</th>
                  <th>Price/Day</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {listings.map((item) => (
                  <tr key={item._id}>
                    <td>
                      <img
                        src={item.images || "/Images/placeholder.png"}
                        alt={item.title}
                        className="h-16 w-16 rounded-md"
                      />
                    </td>
                    <td>{item.title}</td>
                    <td>{item.category}</td>
                    <td>₹{item.pricePerDay}</td>
                    <td>
                      <span
                        className={`badge ${
                          item.availability ? "badge-success" : "badge-error"
                        }`}
                      >
                        {item.availability ? "Available" : "Rented"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-center text-gray-500">No products listed yet.</p>
        )}
      </div>

      {/* Bookings */}
      <div className="bg-base-200 p-6 rounded-lg shadow-lg mt-8">
        <h2 className="text-2xl font-semibold mb-4">📑 Bookings</h2>
        {bookings.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Renter</th>
                  <th>Start Date</th>
                  <th>End Date</th>
                  <th>Total Price</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking) => (
                  <tr key={booking._id}>
                    <td>{booking.listing.title}</td>
                    <td>{booking.renter.name}</td>
                    <td>{new Date(booking.startDate).toLocaleDateString()}</td>
                    <td>{new Date(booking.endDate).toLocaleDateString()}</td>
                    <td>₹{booking.totalPrice}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-center text-gray-500">No bookings yet.</p>
        )}
      </div>
    </div>
  );
};
