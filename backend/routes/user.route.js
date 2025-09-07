import { register, login, getCurrentUser } from "../controller/user.controller.js";
import express from "express";
import verifyJWT from "../middlewares/verifyJWT.middleware.js";

const userRouter = express.Router();

userRouter.post("/register", register);
userRouter.post("/login", login);
userRouter.get("/getUser", verifyJWT, getCurrentUser);

export default userRouter;