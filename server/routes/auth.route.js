import express from "express";
import dotenv from "dotenv";
import User from "../model/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
const app = express.Router();

dotenv.config();
// Sign up route
app.post("/signup", async (req, res) => {
  const {
    name,
    email,
    password,
    address,
    phoneNumber,
    profilePhoto,
    aadharCard,
    aadharCardImage,
  } = req.body;
  if (
    !name ||
    !email ||
    !password ||
    !address ||
    !phoneNumber ||
    !profilePhoto ||
    !aadharCard ||
    !aadharCardImage
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }
  try {
    // Find if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    // Ecrypt password
    const encryptedPassword = await bcrypt.hash(password, 12);
    // Create new user
    const newUser = new User({
      name,
      email,
      password: encryptedPassword,
      address,
      phone: phoneNumber,
      profileImage: profilePhoto,
      aadharCard: aadharCard,
      aadharCardImage: aadharCardImage,
    });
    await newUser.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

// Login route
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
  try {
    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    // Compare passwords
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const data = {
      id: user._id,
      name: user.name,
      email: user.email,
    };
    // Create token
    const token = jwt.sign(data, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 60 * 60 * 1000,
    });
    res.status(200).json({ message: "Logged in successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
});

// Verify token
app.get("/verifyToken", async (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(203).json({ message: "Unauthorized" });
  }
  try {
    const data = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ email: data.email });
    res.status(200).json({ user: user });
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: "Unauthorized" });
  }
});

// Logout route
app.get("/logout", (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ message: "Logged out successfully" });
});

export default app;
