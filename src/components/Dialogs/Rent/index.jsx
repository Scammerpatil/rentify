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
  function loadScript(src) {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  }
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
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );
    console.log("razorpay", res);
    if (!res) {
      toast.error("Razorpay SDK failed to load. Are you online?");
      return;
    }
    try {
      const response = axios.post(
        "http://localhost:5000/api/booking/addBooking",
        formData
      );

      document.getElementById("payment").close();
      document.getElementById("rentProduct").close();
      toast.promise(response, {
        loading: "Renting product...",
        success: (data) => {
          const options = {
            key: "rzp_test_cXJvckaWoN0JQx",
            amount: data.data.amount,
            currency: "INR",
            name: "Rentify",
            description: "Test Transaction",
            image: "/bg.png",
            order_id: data.data.orderId,
            handler: toast.success("Payment successful!"),
            prefill: {
              name: user?.name,
              email: user?.email,
              contact: user?.contact,
            },
          };
          const paymentObject = new window.Razorpay(options);
          paymentObject.on("payment.failed", function (response) {
            alert(response.error.description);
          });
          paymentObject.open();
          return "Product rented successfully!";
        },
        error: (err) => {
          document.getElementById("rentProduct").close();
          return err.response.data.message || "Error renting product";
        },
      });
    } catch (error) {
      console.error("Error renting product:", error);
      toast.error("Error renting product");
      document.getElementById("rentProduct").close();
    }
  };

  return (
    <>
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
              min={new Date().toISOString().split("T")[0]}
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
              min={formData.startDate || new Date().toISOString().split("T")[0]}
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
                onClick={handleSubmit}
              >
                Rent Now
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </>
  );
};

export default Rent;
