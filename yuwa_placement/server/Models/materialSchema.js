const mongoose = require("mongoose");

const { Schema } = mongoose;
const materialSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    material: {
      type: String,
      required: true,
    },
    caption: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: "Active",
    },
  },
  {
    timestamps: true, // This will add createdAt and updatedAt fields
  }
);
module.exports = mongoose.model("material", materialSchema);
