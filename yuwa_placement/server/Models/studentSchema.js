const mongoose = require("mongoose");
const { Schema } = mongoose;
// const img = require("../uploads/student/student.jpg");
const studentSchema = new Schema(
  {
    RegNumber: {
      type: String,
      required: true,
    },
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
      default: "student.jpg", // Replace with your default image URL
    },
    resume: {
      type: String,
      // required: true,
    },
    dob: {
      type: String,
      // required: true,
    },
    qualification: {
      type: String,
      // required: true,
    },
    skills: {
      type: [String],
      // required: true,
      default: [], // Initialize as an empty array
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

module.exports = mongoose.model("student", studentSchema);
