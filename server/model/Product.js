import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
      enum: [
        "car",
        "bike",
        "clothes",
        "room",
        "toys",
        "camera",
        "laptop",
        "computer",
        "mobile",
        "furniture",
        "tools",
        "sports",
        "books",
        "musical_instruments",
        "gaming_console",
        "camping_gear",
        "appliances",
        "party_supplies",
        "event_venues",
        "construction_equipment",
        "medical_equipment",
        "drones",
        "projectors",
        "costumes",
        "bicycles",
        "other",
      ],
    },
    images: {
      type: String,
      required: true,
    },
    pricePerDay: {
      type: Number,
      required: true,
    },
    availability: {
      type: Boolean,
      default: true,
    },
    location: {
      type: String,
      required: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    bookings: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Booking",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
