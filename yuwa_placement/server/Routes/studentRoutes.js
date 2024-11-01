const express = require("express");
const router = express.Router();
const multer = require("multer");
const authStudent = require("../Middleware/authStudent");
const {
  Registration,
  Login,
  getStudentProfile,
  updateProfile,
  submitFeedback,
  viewAllJobPosts,
  viewSingleJobPost,
  viewAllMaterialPosts,
} = require("../Controllers/studentController");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/student/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});
const studentUpload = multer({ storage: storage });

router.post("/Register", Registration);
router.post("/Login", Login);
router.get("/getStudentProfile", authStudent, getStudentProfile);
router.put(
  "/updateProfile",
  authStudent,
  studentUpload.single("profile"),
  updateProfile
);
router.get("/viewSingleJobPost/:id", authStudent, viewSingleJobPost);

router.post("/Feedback", submitFeedback);

router.get("/viewAllJobPosts", authStudent, viewAllJobPosts);
router.get("/viewAllMaterialPosts", authStudent, viewAllMaterialPosts);

module.exports = router;
