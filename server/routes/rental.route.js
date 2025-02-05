import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import User from "../model/User.js";
import Product from "../model/Product.js";
import Booking from "../model/Booking.js";

const app = express();
dotenv.config();
app.use(bodyParser.json());

app.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const listings = await Product.find({ owner: id });
    const productIds = listings.map((product) => product._id);
    const bookings = await Booking.find({
      listing: { $in: productIds },
    }).populate("renter listing");

    res.status(200).json({ user, listings, bookings });
  } catch (error) {
    console.error("Error fetching user data:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

export default app;
