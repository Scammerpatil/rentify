import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const dbConfig = () => {
  mongoose
    .connect(process.env.MONGO_URI || "")
    .then(() => {
      console.log("Successfully connected to the database");
    })
    .catch((err) => {
      console.log("Could not connect to the database. Exiting now...", err);
      process.exit();
    });
};

export default dbConfig;
