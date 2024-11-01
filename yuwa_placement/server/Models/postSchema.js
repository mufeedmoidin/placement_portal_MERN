const mongoose = require("mongoose");

const { Schema } = mongoose;
const postSchema = new Schema(
  {
    companyData: {
      name: {
        type: String,
        required: true,
      },
      logo: {
        type: String,
        required: true,
      },
      about: {
        type: String,
        required: true,
      },
      website: {
        type: String,
        required: true,
      },
    },
    jobTitle: {
      type: String,
      required: true,
    },
    jobType: {
      type: String,
      required: true,
    },
    jobTimeType: {
      type: String,
      required: true,
    },
    jobRole: {
      type: String,
      required: true,
    },
    jobVacancy: {
      type: String,
      required: true,
    },
    jobLocation: {
      type: String,
      required: true,
    },
    jobExperience: {
      type: String,
      required: true,
    },
    jobSkills: {
      type: [],
    },
    jobDescription: {
      type: String,
      required: true,
    },
    keyResponsibilities: [],
    mustHaves: [],
    interviewDate: {
      type: Date,
      required: true,
    },
    interviewLocation: {
      type: String,
    },
    interviewMode: {
      type: String,
    },
    interviewDate: {
      type: String,
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
module.exports = mongoose.model("post", postSchema);
