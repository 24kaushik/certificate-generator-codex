import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import connectDB from "./config/db.js";
import certificateRouter from "./routes/certificate.route.js";

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
app.use("/certificate", certificateRouter);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
