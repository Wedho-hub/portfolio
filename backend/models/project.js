import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
      maxlength: 2000, // avoids overly long text
    },
    techStack: {
      type: [String], // e.g. ["React", "Node.js", "MongoDB"]
      default: [],
    },
    githubUrl: {
      type: String,
      trim: true,
    },
    liveUrl: {
      type: String,
      trim: true,
    },
    image: {
      type: String, // store Cloudinary URL or local path
    },
    featured: {
      type: Boolean,
      default: false, // for highlighting on homepage
    },
  },
  { timestamps: true }
);

export default mongoose.model("project", projectSchema);
