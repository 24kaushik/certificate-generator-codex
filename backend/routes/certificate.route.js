import { Router } from "express";
import { createCertificate, generateBulkCertificates, getCertificate } from "../controller/certificate.controller.js";
import upload from "../middlewares/multer.middleware.js";

const certificateRouter = Router();


certificateRouter.post("/create", createCertificate);
certificateRouter.get("/:id", getCertificate);
certificateRouter.post("/bulk", upload.single('file'), generateBulkCertificates);

export default certificateRouter;