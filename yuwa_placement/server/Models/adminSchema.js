const mongoose = require("mongoose");
const { Schema } = mongoose;
// const img = require("../uploads/student/student.jpg");
const adminSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    profile: {
      type: String,
      // required: true,
      //   default: img, // Replace with your default image URL
      default: "admin.jpg", // Replace with your default image URL
    },
  },
  {
    timestamps: true, // This will add createdAt and updatedAt fields
  }
);

module.exports = mongoose.model("admin", adminSchema);
