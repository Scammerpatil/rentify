import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import jwt from "jsonwebtoken";
import Product from "../model/Product.js";
import Review from "../model/Review.js";
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

app.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id)
      .populate("owner")
      .populate("reviews")
      .populate({
        path: "reviews",
        populate: { path: "user" },
      });
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
  const token = req.cookies.token;
  try {
    const data = jwt.verify(token, process.env.JWT_SECRET);
    const products = await Product.find({ owner: { $ne: data.id } }).populate(
      "owner"
    );
    res.status(200).json(products);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

// Add Product
app.post("/addProduct", async (req, res) => {
  const { formData } = req.body;
  const newProduce = new Product({
    ...formData,
    certificate: {
      warrantyCard: formData.warrantyCard,
      insuranceCertificate: formData.insuranceCertificate,
      realTimeImages: formData.realTimeImages,
    },
    location: {
      type: "Point",
      coordinates: [formData.location[0], formData.location[1]],
    },
    owner: formData.user._id,
  });
  try {
    await newProduce.save();
    res.status(201).json({ message: "Product added successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

// Update Product
app.put("/updateProduct/:id", async (req, res) => {
  const { id } = req.params;
  const { formData } = req.body;
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      {
        ...formData,
        location: {
          type: "Point",
          coordinates: [formData.location[0], formData.location[1]],
        },
      },
      { new: true }
    );
    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(updatedProduct);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

// Delete Product
app.delete("/deleteProduct/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deletedProduct = await Product.findByIdAndDelete(id);
    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

// Add Review
app.post("/addReview", async (req, res) => {
  const { productId, review, rating, userId } = req.body;
  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    const newReview = new Review({
      review,
      rating,
      user: userId,
    });
    await newReview.save();
    product.reviews.push(newReview);
    await product.save();
    res.status(201).json(newReview);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

export default app;
