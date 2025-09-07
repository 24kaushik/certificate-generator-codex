import express from "express";
import cors from "cors";
import dotenv from "dotenv";
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

// User Routes
import userRouter from "./routes/user.route.js";
app.use("/user", userRouter);



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
