import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import dbConfig from "./config/db.config.js";
import userRoute from "./routes/user.route.js";
import authRoute from "./routes/auth.route.js";
import productRoute from "./routes/product.route.js";
import bookingRoute from "./routes/booking.route.js";
import rentalRoute from "./routes/rental.route.js";
import helperRoute from "./routes/helper.route.js";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(bodyParser.json());
app.use(cookieParser());
app.use(morgan("dev"));
app.use(express.json());
dotenv.config();

dbConfig();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Routes
app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/product", productRoute);
app.use("/api/booking", bookingRoute);
app.use("/api/rental", rentalRoute);
app.use("/api/helper", helperRoute);
app.options("*", (req, res) => {
  console.log("OPTIONS preflight hit", req.headers);
  res.sendStatus(200);
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
