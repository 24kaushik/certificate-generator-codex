import { Router } from "express";
import { createCertificate, generateBulkCertificates, getCertificate, searchCertificates } from "../controller/certificate.controller.js";
import upload from "../middlewares/multer.middleware.js";
import verifyJWT from "../middlewares/verifyJWT.middleware.js";
import { dbConnectMiddleware } from "../middlewares/connectDB.middleware.js";

const certificateRouter = Router();


certificateRouter.post("/create", dbConnectMiddleware, verifyJWT, createCertificate);
certificateRouter.get("/search", dbConnectMiddleware, verifyJWT, searchCertificates);
certificateRouter.post("/bulk", dbConnectMiddleware, verifyJWT, upload.single('file'), generateBulkCertificates);

// Unprotected route
certificateRouter.get("/:id", dbConnectMiddleware, getCertificate);

export default certificateRouter;