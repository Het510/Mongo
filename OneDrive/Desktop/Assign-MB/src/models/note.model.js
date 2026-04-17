const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    category: {
      type: String,
      enum: ["work", "personal", "study"],
      default: "personal",
    },
    isPinned: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Note", noteSchema);