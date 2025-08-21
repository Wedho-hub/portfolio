import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    message: { type: String, required: true, trim: true },
    meta: {
      ip: String,
      userAgent: String
    }
  },
  { timestamps: true }
);

export default mongoose.model("message", messageSchema);