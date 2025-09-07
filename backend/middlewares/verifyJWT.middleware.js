import jwt from "jsonwebtoken";
import User from "../models/User.model.js";

const verifyJWT = (req, res, next) => {
  try {
    const token = req.headers["authorization"]?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: "Failed to authenticate token" });
      }
      
      try {
        const user = await User.findById(decoded._id).select("-password");
        
        if (!user || !user.isVerified) {
          return res.status(401).json({ message: "User not found or not verified" });
        }
        
        req.user = user;
        next();
      } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
      }
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

export default verifyJWT;