import { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../Layout";
import { useUser } from "../../../context/UserContext";

const Dashboard = () => {
  return (
    <Layout>
      <Component />
    </Layout>
  );
};

export default Dashboard;

const Component = () => {
  const { user } = useUser();
  const [data, setData] = useState({ listings: [], bookings: [] });

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/user/dashboard/${user._id}`
        );
        setData(response.data);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };
    fetchDashboardData();
  }, []);

  return (
    <>
      <h1 className="text-4xl uppercase font-bold text-center mb-6">
        📊 Dashboard
      </h1>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-base-200 p-6 rounded-lg shadow-lg text-center">
          <h2 className="text-xl font-semibold">📦 Total Listings</h2>
          <p className="text-3xl font-bold">{data.listings.length}</p>
        </div>
        <div className="bg-base-200 p-6 rounded-lg shadow-lg text-center">
          <h2 className="text-xl font-semibold">📑 Total Bookings</h2>
          <p className="text-3xl font-bold">{data.bookings.length}</p>
        </div>
        <div className="bg-base-200 p-6 rounded-lg shadow-lg text-center">
          <h2 className="text-xl font-semibold">⭐ User Rating</h2>
          <p className="text-3xl font-bold">4.8/5</p>
        </div>
      </div>

      {/* Recent Bookings */}
      <div className="bg-base-200 p-6 rounded-lg shadow-lg mt-8">
        <h2 className="text-2xl font-semibold mb-4">📌 Recent Bookings</h2>
        {data.bookings.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Owner</th>
                  <th>Start Date</th>
                  <th>End Date</th>
                  <th>Total Price</th>
                </tr>
              </thead>
              <tbody>
                {data.bookings.slice(0, 5).map((booking) => (
                  <tr key={booking._id}>
                    <td>{booking.listing.title}</td>
                    <td>{booking.listing.owner.name}</td>
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
    </>
  );
};
