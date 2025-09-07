import { Schema, model } from "mongoose";

const CertificateSchema = new Schema(
  {
    name: { type: String, required: true },
    generatedBy: { type: Schema.Types.ObjectId, ref: "User" },
    qid: { type: Number, required: true },
    course: { type: String, required: true },
    eventName: { type: String, required: true },
    position: {
      type: String,
      required: true,
      enum: ["Participant", "Winner", "First Runner Up", "Second Runner Up"],
    },
    date: { type: Date, required: true },
  },
  { timestamps: true }
);

const Certificate = model("Certificate", CertificateSchema);
export default Certificate;
