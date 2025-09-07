import { isValidObjectId } from "mongoose";
import Certificate from "../models/Certificate.model.js";
import generateCertificate from "../utils/generateCertificate.js";
import parseCSVBuffer from "../utils/parseCSV.js";

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

export async function generateBulkCertificates(req, res) {
  try {
    const file = req.file;
    const { position, eventName, date } = req.body;

    if (!position || !eventName || !date) {
      return res
        .status(400)
        .json({ error: "position, eventName and date are required" });
    }

    if (!file) {
      return res.status(400).json({ error: "No file uploaded" });
    }
    // Check if file is .csv
    const ext = file.originalname.split(".").pop();
    if (ext !== "csv") {
      await deleteFile();
      return res
        .status(400)
        .json({ message: "Invalid file type. Only .csv files are allowed" });
    }

    if (file.size > 5 * 1024 * 1024) {
      await deleteFile();
      return res
        .status(400)
        .json({ message: "File size should be less than 5MB" });
    }

    // Process CSV file
    const rows = await parseCSVBuffer(req.file.buffer);
    if (
      ["name", "course", "qid"].some((header) => !rows.headers.includes(header))
    ) {
      return res
        .status(400)
        .json({ error: "CSV file must contain name, course and qid columns" });
    }

    const certData = rows.data.map((row) => ({
      name: row.name,
      course: row.course,
      qid: row.qid,
      eventName,
      position,
      date,
    }));

    await Certificate.insertMany(certData);
    res.status(200).json({ message: "Certificates generated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}
