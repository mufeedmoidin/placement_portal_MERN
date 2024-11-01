const mongoose = require("mongoose");
const { Schema } = mongoose;
const feedbackSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, // This will add createdAt and updatedAt fields
  }
);

module.exports = mongoose.model("feedback", feedbackSchema);
