const studentSchema = require("../Models/studentSchema");
const feedbackSchema = require("../Models/feedbackSchema");
const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");
const postSchema = require("../Models/postSchema");
const materialSchema = require("../Models/materialSchema");
const SECRETE_KEY = "PLACEMENT";

const Registration = async (req, res) => {
  try {
    const { number, name, phone, email, password } = req.body;
    let checkEmail = await studentSchema.findOne({ email: email });
    let checkRegister = await studentSchema.findOne({ RegNumber: number });
    if (checkEmail) {
      console.log("Email already exists!");
      res.json({ success: false, message: "Email already exists!" });
    } else if (checkRegister) {
      console.log("Register already exists!");
      res.json({
        success: false,
        message: "Register number already has been used!",
      });
    } else {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      let newStudent = await new studentSchema({
        RegNumber: number,
        name,
        phone,
        email,
        password: hashedPassword,
      });
      let savedStudent = await newStudent.save();
      console.log("New student registered successfully");
      res.json({
        success: true,
        message: "New student registered successfully",
        student: savedStudent,
      });
    }
  } catch (err) {
    console.log("Error occurred" + err);
    res.json({ error: err });
  }
};
const Login = async (req, res) => {
  try {
    const { number, password } = req.body;
    let student = await studentSchema.findOne({ RegNumber: number });
    if (!student) {
      console.log("Invalid Register Number!");
      res.json({ success: false, message: "Invalid credential!" });
    } else {
      let checkPassword = await bcrypt.compare(password, student.password);
      if (!checkPassword) {
        console.log("Invalid Password!");
        res.json({ success: false, message: "Invalid credential!" });
      } else {
        if (student?.status == "Active") {
          let studentId = student.id;
          let token = await jsonwebtoken.sign(studentId, SECRETE_KEY);
          console.log("Login successful!");
          res.json({
            message: "Login successful!",
            success: true,
            loggedInStudent: student,
            studentToken: token,
          });
        } else {
          console.log("Account not verified!");
          res.json({
            message: "your account has not been verified!",
            success: false,
          });
        }
      }
    }
  } catch (err) {
    console.log("Error occurred" + err);
    res.json({ error: err });
  }
};

const getStudentProfile = async (req, res) => {
  try {
    let student = await studentSchema.findById(req.student);
    if (!student) {
      console.log("Account not found!");
      res.json({
        success: false,
        message: "No student found with this id!",
      });
    } else {
      res.json({
        success: true,
        message: "student profile fetched successfully",
        student: student,
      });
    }
  } catch (err) {
    console.log("Error occurred" + err);
    res.json({ error: err });
  }
};
const updateProfile = async (req, res) => {
  try {
    let student = await studentSchema.findById(req.student);
    if (!student) {
      console.log("Account not found!");
      res.json({
        success: false,
        message: "No student found with this id!",
      });
    } else {
      const { name, phone, npass } = req.body;
      const img = req?.file?.filename;
      let updatedStudent = {};
      if (name) {
        updatedStudent.name = name;
      }
      if (phone) {
        updatedStudent.phone = phone;
      }
      if (npass) {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(npass, salt);
        updatedStudent.password = hashedPassword;
      }
      if (img) {
        updatedStudent.profile = img;
      }
      student = await studentSchema.findByIdAndUpdate(
        req.student,
        { $set: updatedStudent },
        { new: true }
      );
      console.log("Student profile updated successfully");
      res.json({
        success: true,
        message: "Student profile updated successfully",
        student: student,
      });
    }
  } catch (err) {
    console.log("Error occurred" + err);
    res.json({ error: err });
  }
};
const submitFeedback = async (req, res) => {
  try {
    const { name, email, message } = req.body;
    let newFeedback = await new feedbackSchema({
      name,
      email,
      message,
    });
    let savedFeedback = await newFeedback.save();
    console.log("feedback submitted successfully");
    res.json({
      success: true,
      message: "Thank you for your valuable feedback ",
      feedback: savedFeedback,
    });
  } catch (err) {
    console.log("Error occurred" + err);
    res.json({ error: err });
  }
};
const ProfileUpdate = async (req, res) => {
  try {
    const { number, name, phone, email, password } = req.body;
    let checkEmail = await studentSchema.findOne({ email: email });
    let checkRegister = await studentSchema.findOne({ RegNumber: number });
    if (checkEmail) {
      console.log("Email already exists!");
      res.json({ message: "Email already exists!" });
    } else if (checkRegister) {
      console.log("Register already exists!");
      res.json({ message: "Register number already has been used!" });
    } else {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      let newStudent = await new studentSchema({
        number,
        name,
        phone,
        email,
        password: hashedPassword,
      });
      let savedStudent = await newStudent.save();
      console.log("New student registered successfully");
      res.json({
        success: true,
        message: "New student registered successfully",
        customer: savedStudent,
      });
    }
  } catch (err) {
    console.log("Error occurred" + err);
    res.json({ error: err });
  }
};
const viewAllJobPosts = async (req, res) => {
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
const viewSingleJobPost = async (req, res) => {
  try {
    let job = await postSchema.findById(req.params.id);
    if (!job) {
      console.log("Job not found with this ID!");
      res.json({
        success: false,
        message: "Job not found with this ID!",
      });
    } else {
      res.json({
        success: true,
        message: "Job fetched successfully",
        job: job,
      });
    }
  } catch (err) {
    console.log("Error occurred" + err);
    res.json({ error: err });
  }
};
const viewAllMaterialPosts = async (req, res) => {
  try {
    let allMaterials = await materialSchema.find();
    if (!allMaterials) {
      console.log("Materials not found!");
      res.json({
        success: false,
        message: "No Materials found!",
      });
    } else {
      res.json({
        success: true,
        message: "all Materials fetched successfully",
        allMaterials: allMaterials,
      });
    }
  } catch (err) {
    console.log("Error occurred" + err);
    res.json({ error: err });
  }
};
module.exports = {
  Registration,
  Login,
  getStudentProfile,
  submitFeedback,
  viewAllJobPosts,
  viewSingleJobPost,
  viewAllMaterialPosts,
  updateProfile,
};
