import mongoose from "mongoose";

const gallerySchema = new mongoose.Schema(
  {
    galleryType: {
      type: String,
      required: true,
      enum: ["project", "office"],
    },
    image: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: false,
      default: "",
    },
    subTitle: {
      type: String,
      required: false,
      default: "",
    },
  },
  { timestamps: true }
);

const Gallery = mongoose.models.Gallery || mongoose.model("Gallery", gallerySchema);

export default Gallery; 