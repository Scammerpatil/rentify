import express from "express";
import Razorpay from "razorpay";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import Payment from "../model/Payment.js";
import Booking from "../model/Booking.js";

const app = express();
dotenv.config();
app.use(bodyParser.json());

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

app.post("/addBooking", async (req, res) => {
  try {
    const formData = req.body;

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const startDate = new Date(formData.startDate);
    const endDate = new Date(formData.endDate);

    if (startDate < today || endDate < today) {
      return res.status(400).json({ message: "Dates cannot be in the past." });
    }

    if (endDate <= startDate) {
      return res
        .status(400)
        .json({ message: "End date must be after start date." });
    }

    const previousBookings = await Booking.find({ listing: formData.listing });

    const isAvailable = previousBookings.every((booking) => {
      const existingStart = new Date(booking.startDate);
      const existingEnd = new Date(booking.endDate);

      return endDate <= existingStart || startDate >= existingEnd;
    });

    if (!isAvailable) {
      return res.status(400).json({ message: "Slot not available." });
    }
    const amount = formData.totalPrice * 100;
    const options = {
      amount: amount,
      currency: "INR",
      receipt: `receipt_${Math.random() * 100000}`,
    };
    const order = await razorpay.orders.create(options);
    const payment = new Payment({
      user: formData.renter,
      paymentMethod: "razorpay",
      amount: formData.totalPrice,
      transactionId: order.id,
    });

    await payment.save();

    const newBooking = new Booking({
      renter: formData.renter,
      listing: formData.listing,
      startDate: formData.startDate,
      endDate: formData.endDate,
      totalPrice: formData.totalPrice,
      paymentId: payment._id,
    });

    await newBooking.save();

    res.status(201).json({
      message: "Booking added successfully",
      orderId: order.id,
      amount: order.amount,
    });
  } catch (error) {
    console.error("Booking Error:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

app.get("/getBookings/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const bookings = await Booking.find({ renter: userId })
      .populate("listing")
      .populate("paymentId")
      .populate({
        path: "listing",
        populate: { path: "owner", select: "name profileImage" },
      })
      .exec();
    if (!bookings) {
      return res.status(404).json({ message: "No bookings found" });
    }
    res.status(200).json(bookings);
  } catch (error) {
    console.error("Error fetching bookings:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

export default app;
