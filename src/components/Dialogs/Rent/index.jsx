import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useUser } from "../../../context/UserContext";

const Rent = ({ product }) => {
  const { user } = useUser();
  const [formData, setFormData] = useState({
    renter: user._id,
    listing: product._id,
    startDate: "",
    endDate: "",
    totalPrice: 0,
    paymentMethod: "",
    transactionId: "",
  });

  // ✅ Calculate total price only when startDate or endDate changes
  useEffect(() => {
    if (formData.startDate && formData.endDate) {
      const startDate = new Date(formData.startDate);
      const endDate = new Date(formData.endDate);
      const diffTime = Math.abs(endDate - startDate);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      setFormData((prev) => ({
        ...prev,
        totalPrice: diffDays * product.pricePerDay,
      }));
    }
  }, [formData.startDate, formData.endDate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = axios.post(
        "http://localhost:5000/api/booking/addBooking",
        formData // ✅ Corrected: Send formData directly
      );

      document.getElementById("payment").close();
      document.getElementById("rentProduct").close();
      toast.promise(response, {
        loading: "Renting product...",
        success: "Product rented successfully!",
        error: (err) => err.response?.data?.message || "Error renting product",
      });
    } catch (error) {
      console.error("Error renting product:", error);
      toast.error("Error renting product");
    }
  };

  return (
    <>
      {/* Rent Modal */}
      <dialog id="rentProduct" className="modal">
        <div className="modal-box w-11/12 max-w-5xl bg-base-100 shadow-lg rounded-xl">
          <h3 className="text-2xl font-bold text-center text-primary">
            🛒 Book This Product on Rent
          </h3>
          <form className="space-y-4 p-4">
            {/* Start Date */}
            <input
              type="date"
              name="startDate"
              className="input input-bordered w-full"
              value={formData.startDate}
              onChange={(e) =>
                setFormData({ ...formData, startDate: e.target.value })
              }
              required
            />

            {/* End Date */}
            <input
              type="date"
              name="endDate"
              className="input input-bordered w-full"
              value={formData.endDate}
              onChange={(e) =>
                setFormData({ ...formData, endDate: e.target.value })
              }
              required
            />

            {/* Total Price (ReadOnly) */}
            <input
              type="text"
              className="input input-bordered w-full"
              value={`Total Price: ₹${formData.totalPrice}`}
              readOnly
            />

            {/* Action Buttons */}
            <div className="modal-action flex justify-between">
              <button
                className="btn btn-primary px-6"
                type="button"
                onClick={() => document.getElementById("payment").showModal()}
              >
                Rent Now
              </button>
            </div>
          </form>
        </div>
      </dialog>

      {/* Payment Modal */}
      <dialog id="payment" className="modal">
        <div className="modal-box w-11/12 max-w-5xl bg-base-100 shadow-lg rounded-xl">
          <h3 className="text-2xl font-bold text-center text-primary">
            💳 Pay The Amount
          </h3>
          <form className="space-y-4 p-4">
            {/* Total Price Display */}
            <input
              type="text"
              className="input input-bordered w-full"
              value={`Total Price: ₹${formData.totalPrice}`}
              readOnly
            />

            {/* Payment Method Selection */}
            <select
              className="input input-bordered w-full"
              onChange={(e) =>
                setFormData({ ...formData, paymentMethod: e.target.value })
              }
              required
            >
              <option value="">Select Payment Method</option>
              <option value="credit_card">Credit Card</option>
              <option value="debit_card">Debit Card</option>
              <option value="paypal">PayPal</option>
              <option value="upi">UPI</option>
            </select>

            {/* Transaction ID */}
            <input
              type="text"
              name="transactionId"
              placeholder="Transaction ID"
              className="input input-bordered w-full"
              value={formData.transactionId}
              onChange={(e) =>
                setFormData({ ...formData, transactionId: e.target.value })
              }
              required
            />

            {/* Action Buttons */}
            <div className="modal-action flex justify-between">
              <button
                className="btn btn-primary px-6"
                type="submit"
                onClick={handleSubmit}
              >
                Pay Now
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </>
  );
};

export default Rent;
