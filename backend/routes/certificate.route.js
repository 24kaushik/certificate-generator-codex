import { Router } from "express";
import { createCertificate, getCertificate } from "../controller/certificate.controller.js";

const certificateRouter = Router();


certificateRouter.post("/create", createCertificate);
certificateRouter.get("/:id", getCertificate);

export default certificateRouter;