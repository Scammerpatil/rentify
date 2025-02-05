import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import Product from "../model/Product.js";
const app = express();

dotenv.config();
app.use(bodyParser.json());

// Get products by category
app.get("/category/:category", async (req, res) => {
  try {
    const { category } = req.params;
    const products = await Product.find({ category }).populate("owner");
    res.status(200).json(products);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

// Get product by id
app.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id).populate("owner");
    // .populate("bookings");
    if (!product) {
      res.status(404).json("Product not found");
    } else {
      res.status(200).json(product);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

// Get all products
app.get("/", async (req, res) => {
  try {
    const products = await Product.find().populate("owner");
    res.status(200).json(products);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

// Add Product
app.post("/addProduct", async (req, res) => {
  const { formData, user } = req.body;
  const newProduce = new Product({
    ...formData,
    owner: user._id,
  });
  try {
    await newProduce.save();
    res.status(201).json({ message: "Product added successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

export default app;
