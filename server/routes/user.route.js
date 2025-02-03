import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import mongoose from "mongoose";
const app = express();

dotenv.config();
app.use(bodyParser.json());
export default app;
