import { isValidObjectId } from "mongoose";
import Certificate from "../models/Certificate.model.js";
import generateCertificate from "../utils/generateCertificate.js";

export async function createCertificate(req, res) {
  try {
    const { name, course, qid, eventName, position, date } = req.body;
    if (!name || !course || !qid || !eventName || !position || !date) {
      return res.status(400).json({
        error:
          "All fields are required. (name, course, qid, eventName, position, date)",
      });
    }

    if (
      ![
        "Participant",
        "Winner",
        "First Runner Up",
        "Second Runner Up",
      ].includes(position)
    ) {
      return res.status(400).json({
        error:
          "Invalid position value, Must be Participant, Winner, First Runner Up, or Second Runner Up",
      });
    }

    const newCert = await Certificate.create({
      name,
      course,
      qid,
      eventName,
      position,
      date,
    });
    res.status(201).json({ id: newCert._id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function getCertificate(req, res) {
  try {
    const { id } = req.params;

    if (!id || !isValidObjectId(id)) {
      return res.status(400).json({ error: "ID parameter is invalid" });
    }

    const cert = await Certificate.findById(id);

    if (!cert) {
      return res.status(404).json({ error: "Certificate not found" });
    }

    generateCertificate(res, cert);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}
