const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");
const adminSchema = require("../Models/adminSchema");
const studentSchema = require("../Models/studentSchema");
const feedbackSchema = require("../Models/feedbackSchema");
const postSchema = require("../Models/postSchema");
const materialSchema = require("../Models/materialSchema");
const SECRETE_KEY = "PLACEMENT";

const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    let admin = await adminSchema.findOne({ email });
    if (!admin) {
      console.log("Invalid Email!");
      res.json({ success: false, message: "Invalid credential!" });
    } else {
      let checkPassword = await bcrypt.compare(password, admin.password);
      if (!checkPassword) {
        console.log("Invalid Password!");
        res.json({ success: false, message: "Invalid credential!" });
      } else {
        let adminId = admin.id;
        let token = await jsonwebtoken.sign(adminId, SECRETE_KEY);
        console.log("Login successful!");
        res.json({
          message: "Login successful!",
          success: true,
          loggedInAdmin: admin,
          adminToken: token,
        });
      }
    }
  } catch (err) {
    console.log("Error occurred" + err);
    res.json({ error: err });
  }
};

const getAdminProfile = async (req, res) => {
  try {
    let admin = await adminSchema.findById(req.admin);
    if (!admin) {
      console.log("Account not found!");
      res.json({
        success: false,
        message: "No admin found with this id!",
      });
    } else {
      res.json({
        success: true,
        message: "Admin profile fetched successfully",
        admin: admin,
      });
    }
  } catch (err) {
    console.log("Error occurred" + err);
    res.json({ error: err });
  }
};

//student
const getAllStudents = async (req, res) => {
  try {
    let students = await studentSchema.find();
    if (!students) {
      console.log("students not found!");
      res.json({
        success: false,
        message: "No students found!",
      });
    } else {
      res.json({
        success: true,
        message: "students info fetched successfully",
        students: students,
      });
    }
  } catch (err) {
    console.log("Error occurred" + err);
    res.json({ error: err });
  }
};
const updateStudent = async (req, res) => {
  try {
    let student = await studentSchema.findById(req.params.id);
    if (!student) {
      console.log("student not found!");
      res.json({
        success: false,
        message: "No students found with this ID!",
      });
    } else {
      const { status } = req.body;
      const updatedStudent = {};
      if (status) {
        updatedStudent.status = status;
      }
      student = await studentSchema.findByIdAndUpdate(
        req.params.id,
        {
          $set: updatedStudent,
        },
        { new: true }
      );
      res.json({
        success: true,
        message: "students status updated successfully",
        student: student,
      });
    }
  } catch (err) {
    console.log("Error occurred" + err);
    res.json({ error: err });
  }
};

//feedback
const getAllFeedbacks = async (req, res) => {
  try {
    let feedbacks = await feedbackSchema.find();
    if (!feedbacks) {
      console.log("feedbacks not found!");
      res.json({
        success: false,
        message: "No feedbacks found!",
      });
    } else {
      res.json({
        success: true,
        message: "feedbacks fetched successfully",
        feedbacks: feedbacks,
      });
    }
  } catch (err) {
    console.log("Error occurred" + err);
    res.json({ error: err });
  }
};

//jobs
const postJob = async (req, res) => {
  try {
    const {
      name,
      about,
      website,
      jobTitle,
      jobType,
      jobTimeType,
      jobRole,
      jobLocation,
      jobVacancy,
      jobExperience,
      jobSkills,
      jobDescription,
      keyResponsibilities,
      mustHaves,
      interviewLocation,
      interviewMode,
      interviewDate,
    } = req.body;
    const logo = req.file.filename;
    let companyData = { name, logo, about, website };
    let newJobPost = await new postSchema({
      companyData,
      jobTitle,
      jobType,
      jobTimeType,
      jobRole,
      jobVacancy,
      jobLocation,
      jobExperience,
      jobSkills,
      jobDescription,
      keyResponsibilities,
      mustHaves,
      interviewLocation,
      interviewMode,
      interviewDate,
    });
    let savedJobPost = await newJobPost.save();
    console.log("Job inserted successfully");
    res.json({
      success: true,
      message: "Job posted successfully",
      jobPost: savedJobPost,
    });
  } catch (err) {
    console.log("Error occurred" + err);
    res.json({ error: err });
  }
};
const updateJobPost = async (req, res) => {
  try {
    var post = await postSchema.findById(req.params.id);
    if (!post) {
      console.log("Post not found with ID");
      res.json({ success: false, message: "Post does not exist!" });
      return; // Ensure the function exits if post is not found
    }

    const {
      name,
      about,
      website,
      jobTitle,
      jobType,
      jobTimeType,
      jobRole,
      jobLocation,
      jobVacancy,
      jobExperience,
      jobSkills,
      jobDescription,
      keyResponsibilities,
      mustHaves,
      interviewLocation,
      interviewMode,
      interviewDate,
    } = req.body;
    // console.log(req.body);
    var logo = req?.file?.filename;
    var updatedPost = {};

    // Initialize companyData object if any company data is present in the request
    if (name || logo || about || website) {
      updatedPost.companyData = {};
    }

    if (name) {
      updatedPost.companyData.name = name;
    }
    if (logo != undefined) {
      updatedPost.companyData.logo = logo;
    } else {
      updatedPost.companyData.logo = post.companyData?.logo;
    }
    // console.log(logo);
    if (about) {
      updatedPost.companyData.about = about;
    }
    if (website) {
      updatedPost.companyData.website = website;
    }
    if (jobTitle) {
      updatedPost.jobTitle = jobTitle;
    }
    if (jobType) {
      updatedPost.jobType = jobType;
    }
    if (jobTimeType) {
      updatedPost.jobTimeType = jobTimeType;
    }
    if (jobRole) {
      updatedPost.jobRole = jobRole;
    }
    if (jobVacancy) {
      updatedPost.jobVacancy = jobVacancy;
    }
    if (jobLocation) {
      updatedPost.jobLocation = jobLocation;
    }
    if (jobExperience) {
      updatedPost.jobExperience = jobExperience;
    }
    if (jobSkills) {
      updatedPost.jobSkills = jobSkills;
    }
    if (jobDescription) {
      updatedPost.jobDescription = jobDescription;
    }
    if (keyResponsibilities) {
      updatedPost.keyResponsibilities = keyResponsibilities;
    }
    if (mustHaves) {
      updatedPost.mustHaves = mustHaves;
    }
    if (interviewMode) {
      updatedPost.interviewMode = interviewMode;
    }
    if (interviewDate) {
      updatedPost.interviewDate = interviewDate;
    }
    if (interviewLocation) {
      updatedPost.interviewLocation = interviewLocation;
    }

    post = await postSchema.findByIdAndUpdate(
      req.params.id,
      { $set: updatedPost },
      { new: true }
    );

    res.json({
      success: true,
      message: "Job updated successfully",
      post: post,
    });
  } catch (err) {
    console.log("Error occurred" + err);
    res.json({ error: err });
  }
};

const getAllJobPosts = async (req, res) => {
  try {
    let allJobs = await postSchema.find();
    if (!allJobs) {
      console.log("Jobs not found!");
      res.json({
        success: false,
        message: "No Jobs found!",
      });
    } else {
      res.json({
        success: true,
        message: "all job posts fetched successfully",
        allJobs: allJobs,
      });
    }
  } catch (err) {
    console.log("Error occurred" + err);
    res.json({ error: err });
  }
};
const deletePost = async (req, res) => {
  try {
    const post = await postSchema.findById(req.params.id);
    if (!post) {
      console.log("Post not found with with ID");
      res.json({ success: false, message: "Post does not exists!" });
    } else {
      let deletedPost = await postSchema.findByIdAndDelete(req.params.id);
      res.json({
        success: true,
        message: "Post deleted successfully!",
        deletedPost: deletedPost,
      });
    }
  } catch (err) {
    console.log("Error occurred" + err);
    res.json({ error: err });
  }
};
const singlePost = async (req, res) => {
  try {
    const post = await postSchema.findById(req.params.id);
    if (!post) {
      console.log("Post not found with with ID");
      res.json({ success: false, message: "Post does not exists!" });
    } else {
      res.json({
        success: true,
        post: post,
      });
    }
  } catch (err) {
    console.log("Error occurred" + err);
    res.json({ error: err });
  }
};

//materials
const postMaterial = async (req, res) => {
  try {
    const { title, caption } = req.body;
    const material = req?.file?.filename;
    let newMaterialPost = await new materialSchema({
      title,
      caption,
      material,
    });
    let savedMaterialPost = await newMaterialPost.save();
    console.log("Material inserted successfully");
    res.json({
      success: true,
      message: "Material posted successfully",
      material: savedMaterialPost,
    });
  } catch (err) {
    console.log("Error occurred" + err);
    res.json({ error: err });
  }
};
const getAllMaterials = async (req, res) => {
  try {
    let allMaterials = await materialSchema.find();
    if (!allMaterials) {
      console.log("materials not found!");
      res.json({
        success: false,
        message: "No materials found!",
      });
    } else {
      res.json({
        success: true,
        message: "all materials fetched successfully",
        allMaterials: allMaterials,
      });
    }
  } catch (err) {
    console.log("Error occurred" + err);
    res.json({ error: err });
  }
};
const deleteMaterial = async (req, res) => {
  try {
    const material = await materialSchema.findById(req.params.id);
    if (!material) {
      console.log("Material not found with with ID");
      res.json({ success: false, message: "Material does not exists!" });
    } else {
      let deletedMaterial = await materialSchema.findByIdAndDelete(
        req.params.id
      );
      res.json({
        success: true,
        message: "Material deleted successfully!",
        deletedMaterial: deletedMaterial,
      });
    }
  } catch (err) {
    console.log("Error occurred" + err);
    res.json({ error: err });
  }
};
const singleMaterial = async (req, res) => {
  try {
    const material = await materialSchema.findById(req.params.id);
    if (!material) {
      console.log("Material not found with with ID");
      res.json({ success: false, message: "Material does not exists!" });
    } else {
      res.json({
        success: true,
        material: material,
      });
    }
  } catch (err) {
    console.log("Error occurred" + err);
    res.json({ error: err });
  }
};
const updateMaterial = async (req, res) => {
  try {
    let singleMaterial = await materialSchema.findById(req.params.id);
    if (!singleMaterial) {
      console.log("Material not found with with ID");
      res.json({ success: false, message: "Material does not exists!" });
    } else {
      const { title, caption } = req.body;
      const material = req?.file?.filename;
      let updatedMaterial = {};
      if (title) {
        updatedMaterial.title = title;
      }
      if (caption) {
        updatedMaterial.caption = caption;
      }
      if (material) {
        updatedMaterial.material = material;
      }
      singleMaterial = await materialSchema.findByIdAndUpdate(
        req.params.id,
        {
          $set: updatedMaterial,
        },
        { new: true }
      );
      console.log("Material updated successfully");
      res.json({
        success: true,
        message: "Material updated successfully",
        updatedMaterial: updatedMaterial,
      });
    }
  } catch (err) {
    console.log("Error occurred" + err);
    res.json({ error: err });
  }
};

const getCounts = async (req, res) => {
  try {
    let allMaterials = await materialSchema.find();
    let allJobs = await postSchema.find();
    let allStudents = await studentSchema.find();
    if (!allMaterials) {
      console.log("materials not found!");
      res.json({
        success: false,
        message: "No materials found!",
      });
    } else if (!allJobs) {
      console.log("jobs not found!");
      res.json({
        success: false,
        message: "No jobs found!",
      });
    } else if (!allStudents) {
      console.log("students not found!");
      res.json({
        success: false,
        message: "No students found!",
      });
    } else {
      res.json({
        success: true,
        message: "all data fetched successfully",
        m: allMaterials,
        j: allJobs,
        s: allStudents,
      });
    }
  } catch (err) {
    console.log("Error occurred" + err);
    res.json({ error: err });
  }
};
module.exports = {
  Login,
  getAdminProfile,
  getAllStudents,
  updateStudent,
  getAllFeedbacks,
  postJob,
  getAllJobPosts,
  deletePost,
  singlePost,
  updateJobPost,
  postMaterial,
  getAllMaterials,
  deleteMaterial,
  singleMaterial,
  updateMaterial,
  getCounts,
};
