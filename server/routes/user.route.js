import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import User from "../model/User.js";
import Product from "../model/Product.js";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import Booking from "../model/Booking.js";
import Report from "../model/Report.js";
const app = express();

dotenv.config();
app.use(bodyParser.json());
app.use(cookieParser());

// Sign up route
app.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    const listing = await Product.find({ owner: id }).populate("owner");
    if (!user) {
      res.status(404).json("User not found");
    } else {
      res.status(200).json({ user, listing });
    }
  } catch (error) {
    console.log(error);
  }
});

app.get("/dashboard/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);
    const listings = await Product.find({ owner: userId });
    const bookings = await Booking.find({ renter: userId })
      .populate("listing")
      .populate({
        path: "listing",
        populate: {
          path: "owner",
        },
      });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ user, listings, bookings });
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

app.post("/report", async (req, res) => {
  try {
    const { bookingId, reporter, issue, reason } = req.body;
    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }
    const product = await Product.findById(booking.listing);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    const report = new Report({
      ownerId: product.owner,
      bookingId,
      reporter,
      productId: product._id,
      reason,
      description: issue,
    });
    await report.save();
    res.status(201).json({ message: "Report submitted successfully" });
  } catch (error) {
    console.error("Error submitting report:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

app.get("/reports/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const reports = await Report.find({
      $or: [{ ownerId: userId }, { reporter: userId }],
    })
      .populate("reporter", "name profileImage")
      .populate("productId", "title images")
      .populate("ownerId", "name profileImage")
      .populate("bookingId")
      .exec();
    if (!reports) {
      return res.status(404).json({ message: "No reports found" });
    }
    res.status(200).json(reports);
  } catch (error) {
    console.error("Error fetching reports:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

app.put("/report/feedback", async (req, res) => {
  try {
    const { reportId, feedback } = req.body;
    const report = await Report.findById(reportId);
    if (!report) {
      return res.status(404).json({ message: "Report not found" });
    }
    report.feedback = feedback;
    report.status = "Resolved";
    await report.save();
    res.status(200).json({ message: "Feedback submitted successfully" });
  } catch (error) {
    console.error("Error submitting feedback:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

app.post("/wishlist/:action", async (req, res) => {
  try {
    const { action } = req.params;
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded.id) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (action === "add") {
      const productId = req.body.itemId;
      if (!productId) {
        return res.status(400).json({ message: "Product ID is required" });
      }
      user.wishlist.push(productId);
      await user.save();
      res.status(200).json({ message: "Product added to wishlist" });
    } else if (action === "remove") {
      const productId = req.body.itemId;
      if (!productId) {
        return res.status(400).json({ message: "Product ID is required" });
      }
      user.wishlist.pull(productId);
      await user.save();
      res.status(200).json({ message: "Product removed from wishlist" });
    } else {
      res.status(400).json({ message: "Invalid action" });
    }
  } catch (error) {
    console.error("Error updating wishlist:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

export default app;
