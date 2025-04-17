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
    address: {
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
    location: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point",
      },
      coordinates: {
        type: [Number],
        required: true,
      },
    },
    reviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Review",
      },
    ],
    certificate: {
      warrantyCard: { type: String },
      insuranceCertificate: { type: String },
      realTimeImages: { type: String },
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", ProductSchema);
export default Product;
