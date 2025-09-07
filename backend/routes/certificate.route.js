import { Router } from "express";
import { createCertificate, generateBulkCertificates, getCertificate, searchCertificates } from "../controller/certificate.controller.js";
import upload from "../middlewares/multer.middleware.js";
import verifyJWT from "../middlewares/verifyJWT.middleware.js";

const certificateRouter = Router();


certificateRouter.post("/create", verifyJWT, createCertificate);
certificateRouter.get("/search", verifyJWT, searchCertificates);
certificateRouter.post("/bulk", verifyJWT, upload.single('file'), generateBulkCertificates);

// Unprotected route
certificateRouter.get("/:id", getCertificate);

export default certificateRouter;