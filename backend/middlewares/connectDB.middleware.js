import connectDB from '../config/db.js';

export const dbConnectMiddleware = async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    console.error("Database connection failed:", error);
    res.status(500).json({ error: "Internal server error: Database connection failed." });
  }
};
