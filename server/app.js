import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import dbConfig from "./config/db.config.js";
import userRoute from "./routes/user.route.js";

const app = express();
app.use(bodyParser.json());
dotenv.config();

dbConfig();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Routes
app.use("/api/users", userRoute);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
