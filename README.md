# Certificate Generator for CodeX Club 🎓✨

Welcome to the **Certificate Generator**! Gone are the days when students could just Photoshop their way to glory and claim GP marks without even showing up. This time, we’re serious. This time, we’ve got **technology**. 💻

## What is this sorcery? 🧙‍♂️

This is a **Certificate Generator** built for the **CodeX Club** at Quantum University. It creates **verifiable certificates** for events, ensuring that only the deserving get their shiny pieces of paper. No more sneaky edits, no more fake certificates. If you didn’t attend, you’re out of luck. 😏

## Why do we need this? 🤔

Let’s face it: 
- Some students are *too creative* with Photoshop. 🖼️
- GP marks are precious, and we’re tired of handing them out to ghost participants. 👻
- We want to reward the real heroes who actually show up and participate. 🦸‍♀️🦸‍♂️

So, we built this system to generate certificates with **QR codes** that link to a verification page. If your certificate doesn’t pass the scan test, you’re busted. 🚨

## How does it work? 🛠️

1. **Input the Details**: Enter the participant’s name, course, event name, position, and date.
2. **Generate the Certificate**: The system creates a beautiful PDF certificate with all the details.
3. **Add a QR Code**: Each certificate gets a unique QR code that links to its verification page.
4. **Verify Authenticity**: Anyone can scan the QR code to check if the certificate is legit.

## Features 🌟

- **Customizable Certificates**: Add event-specific details and participant info.
- **QR Code Verification**: Each certificate is linked to a unique verification URL.
- **Anti-Fraud**: No more fake certificates. If it’s not in the system, it doesn’t exist. Period. 🛑
- **PDF Generation**: Generates high-quality certificates ready for printing or sharing.

## Tech Stack ⚙️

- **Backend**: Node.js, Express, Mongoose
- **Database**: MongoDB
- **PDF Generation**: PDFKit
- **QR Code Generation**: QRCode.js

## How to Run 🏃‍♂️

1. Clone the repo:
   ```bash
   git clone https://github.com/your-repo/certificate-generator.git
   cd certificate-generator/backend