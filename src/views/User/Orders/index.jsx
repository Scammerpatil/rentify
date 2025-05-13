import { useEffect, useState } from "react";
import { useUser } from "../../../context/UserContext";
import Layout from "../Layout";
import axios from "axios";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const Orders = () => {
  return (
    <Layout>
      <Component />
    </Layout>
  );
};

export default Orders;

const Component = () => {
  const [bookings, setBookings] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [reportText, setReportText] = useState("");
  const [reason, setReason] = useState("");

  const { user } = useUser();
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/booking/getBookings/${user._id}`
        );
        setBookings(response.data);
        console.log("Bookings:", response.data);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };
    fetchBookings();
  }, [user._id]);

  const handleReportSubmit = async () => {
    if (!reportText.trim()) return alert("Report cannot be empty");
    try {
      const res = axios.post("http://localhost:5000/api/user/report", {
        bookingId: selectedBooking._id,
        reporter: user._id,
        issue: reportText,
        reason,
      });
      toast.promise(res, {
        loading: "Reporting issue...",
        success: "Issue reported successfully",
        error: "Failed to report issue",
      });
      document.getElementById("reportModal").close();
    } catch (error) {
      console.error("Error reporting issue:", error);
      toast.error("Failed to report issue");
    }
  };
  return (
    <>
      <h1 className="text-4xl uppercase font-bold text-center">Orders</h1>
      <div className="overflow-x-auto mt-10">
        <table className="table table-zebra w-full">
          {/* head */}
          <thead className="bg-base-200">
            <tr>
              <th>#</th>
              <th>Product Name</th>
              <th>Owner Name</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Price Per Date</th>
              <th>Total Price</th>
              <th>Report</th>
              <th>View</th>
            </tr>
          </thead>
          <tbody>
            {bookings.length > 0 ? (
              bookings.map((item, index) => (
                <tr key={index}>
                  <th>{index + 1}</th>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12">
                          <img
                            src={item.listing.images}
                            alt={item.listing.name}
                          />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{item.listing.title}</div>
                        <div className="text-sm opacity-50 capitalize">
                          {item.listing.category}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>{item.listing.owner.name}</td>
                  <td>{new Date(item.startDate).toLocaleDateString()}</td>
                  <td>{new Date(item.endDate).toLocaleDateString()}</td>
                  <td>₹ {item.listing.pricePerDay}</td>
                  <td>₹ {item.totalPrice}</td>
                  <td>
                    <button
                      className="btn btn-primary"
                      onClick={() => {
                        setSelectedBooking(item);
                        document.getElementById("reportModal").showModal();
                      }}
                    >
                      Report
                    </button>
                  </td>
                  <td>
                    <Link
                      to={`/product/${item.listing._id}`}
                      className="btn btn-secondary"
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr className="text-center text-xl font-semibold">
                <td colSpan={9}>No Orders Found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <dialog id="reportModal" className="modal">
        <div className="modal-box w-full max-w-md">
          <h3 className="font-bold text-lg mb-4">Report Product Issue</h3>
          <p className="text-base text-base-content/70 my-4 mb-4">
            Reporting issue for product:{" "}
            <span className="font-semibold">
              {selectedBooking?.listing.title}
            </span>
          </p>
          <label className="label">
            <span className="label-text">Select Reason</span>
          </label>
          <select
            className="select select-primary select-bordered w-full mb-4"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
          >
            <option value="">Select a reason</option>
            <option value="Damaged">Damaged</option>
            <option value="Not as described">Not as described</option>
            <option value="Late delivery">Late delivery</option>
            <option value="Other">Other</option>
          </select>
          <label className="label">
            <span className="label-text">Describe the issue</span>
          </label>
          <textarea
            className="textarea textarea-primary textarea-bordered w-full mb-4"
            placeholder="Describe the issue..."
            rows={4}
            value={reportText}
            onChange={(e) => setReportText(e.target.value)}
          ></textarea>
          <div className="modal-action">
            <button className="btn btn-error" onClick={handleReportSubmit}>
              Submit Report
            </button>
            <button
              className="btn"
              onClick={() => {
                setSelectedBooking(null);
                setReportText("");
                document.getElementById("reportModal").close();
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
};
