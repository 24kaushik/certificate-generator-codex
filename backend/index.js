import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import connectDB from "./config/db.js";

// Configure environment variables, Express setup, db.
dotenv.config();
const app = express();
connectDB();
const PORT = process.env.PORT || 6969;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check endpoint
app.get("/", (_, res) => {
  res.send("Api working!");
});

// Certificate Routes
import certificateRouter from "./routes/certificate.route.js";
app.use("/certificate", certificateRouter);

// Auth Routes
import authRouter from "./routes/auth.route.js";
app.use("/auth", authRouter);



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
