import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import User from "../model/User.js";
import Product from "../model/Product.js";
const app = express();

dotenv.config();
app.use(bodyParser.json());

// Sign up route
app.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    const listing = await Product.find({ owner: id });
    if (!user) {
      res.status(404).json("User not found");
    } else {
      res.status(200).json({ user, listing });
    }
  } catch (error) {
    console.log(error);
  }
});

export default app;
