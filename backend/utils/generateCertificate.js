import PDFDocument from "pdfkit";
import QRCode from "qrcode";
import sizeOf from "image-size";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// To get __dirname in ES module scope
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Generates a certificate PDF and streams it to the response.
 * @param {object} res - The Express response object.
 * @param {object} cert - An object containing the certificate data.
 */

async function generateCertificate(res, cert) {
  try {
    // --- 1. GET IMAGE DIMENSIONS ---
    const imagePath = "../assets/certificate.png";
    const imageFullPath = path.join(__dirname, imagePath);
    if (!fs.existsSync(imageFullPath)) {
      throw new Error("Certificate template image not found.");
    }
    const certImage = fs.readFileSync(imageFullPath);
    const dimensions = sizeOf(certImage);

    // --- 2. CREATE PDF WITH CUSTOM DIMENSIONS ---
    const doc = new PDFDocument({
      // Set the PDF size to match the image dimensions
      size: [dimensions.width, dimensions.height],
      margin: 0,
    });

    // --- SETUP THE RESPONSE STREAM ---
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `inline; filename=certificate-${cert._id}.pdf`
    );
    doc.pipe(res);

    // --- 3. DEFINE VERIFICATION URL & GENERATE QR CODE ---
    const verificationUrl = `https://certificates.kaushiksarkar.me/certificate/${cert._id}`;
    const qrCodeImage = await QRCode.toDataURL(verificationUrl, { width: 160 });

    // --- 4. REGISTER CUSTOM FONTS ---
    const fontBase = path.join(__dirname, "../assets/fonts");
    doc.registerFont("TitleFont", path.join(fontBase, "title-font.ttf"));
    doc.registerFont("BodyFont", path.join(fontBase, "body-font.ttf"));
    doc.registerFont(
      "BodyFont-Bold",
      path.join(fontBase, "body-font-bold.ttf")
    );

    // --- 5. ADD THE CERTIFICATE BACKGROUND ---
    doc.image(imageFullPath, 0, 0, {
      width: doc.page.width,
      height: doc.page.height,
    });

    // --- 6. PLACE THE DYNAMIC TEXT ---

    // Student Name
    doc
      .font("TitleFont")
      .fontSize(90)
      .fillColor("#1d7c9f")
      .text(cert.name?.toUpperCase(), 50, doc.page.height * 0.38, {
        // 👈 Tweak Y coordinate (using a percentage of page height)
        align: "center",
      });

    // Main descriptive text
    let mainText = "";
    if (cert.position === "Participant") {
      mainText = `For successfully Participating in the ${
        cert.eventName
      }, organized by the Codex Club, Quantum University, on ${cert.date.toLocaleDateString()}.`;
    } else {
      mainText = `For successfully achieving the ${
        cert.position
      } position in the ${
        cert.eventName
      }, organized by the Codex Club, Quantum University, on ${cert.date.toLocaleDateString()}.`;
    }

    // Draw the main text centered
    doc
      .font("BodyFont")
      .fontSize(40)
      .fillColor("#34495e")
      .text(mainText, 160, doc.page.height * 0.5, {
        width: doc.page.width - 320,
        align: "center",
      });

    // --- 7. ADD FOOTER ELEMENTS (QR Code & Verification) ---
    const footerY = doc.page.height * 0.7;

    // QR Code
    const qrWidth = 160;
    doc.image(qrCodeImage, doc.page.width / 2 - qrWidth / 2, footerY, {
      width: qrWidth,
    });

    // Certificate ID & Verification Link
    const verificationTextY = doc.page.height - 200;
    doc
      .font("BodyFont")
      .fontSize(15)
      .fillColor("#555555")
      .text(`Certificate ID: ${cert._id}`, 0, verificationTextY, {
        align: "center",
        width: doc.page.width,
      })
      .text(
        `Verify authenticity at: ${verificationUrl}`,
        0,
        verificationTextY + 20,
        {
          align: "center",
          width: doc.page.width,
          link: verificationUrl,
          underline: true,
        }
      );

    // --- FINALIZE THE DOCUMENT ---
    doc.end();
  } catch (error) {
    console.error("Error generating PDF:", error);
    res.status(500).send("An error occurred while generating the certificate.");
  }
}

export default generateCertificate;
