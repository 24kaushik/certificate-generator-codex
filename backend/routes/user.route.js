import { register, login, getCurrentUser } from "../controller/user.controller.js";
import express from "express";
import verifyJWT from "../middlewares/verifyJWT.middleware.js";
import { dbConnectMiddleware } from "../middlewares/connectDB.middleware.js";

const userRouter = express.Router();

userRouter.post("/register", dbConnectMiddleware, register);
userRouter.post("/login", dbConnectMiddleware, login);
userRouter.get("/getUser", dbConnectMiddleware, verifyJWT, getCurrentUser);

export default userRouter;