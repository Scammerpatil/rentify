import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema(
  {
    renter: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    listing: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "confirmed", "completed", "cancelled"],
      default: "pending",
    },
    paymentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Payment",
    },
  },
  { timestamps: true }
);

const Booking = mongoose.model("Booking", BookingSchema);

export default Booking;
