const express = require("express");
const router = express.Router();
const multer = require("multer");
const authAdmin = require("../Middleware/authAdmin");
const {
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
} = require("../Controllers/adminController");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/admin/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});
const adminUpload = multer({ storage: storage });

//jobs
const jobStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/admin/jobs/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});
const adminUploadJobs = multer({ storage: jobStorage });
//material
const materialStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/admin/materials/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});
const adminUploadMaterial = multer({ storage: materialStorage });

router.post("/Login", Login);
router.get("/getAdminProfile", authAdmin, getAdminProfile);

//student
router.get("/getAllStudents", authAdmin, getAllStudents);
router.put("/updateStudent/:id", authAdmin, updateStudent);

//feedback
router.get("/getAllFeedbacks", authAdmin, getAllFeedbacks);
//job
router.post("/postJob", authAdmin, adminUploadJobs.single("logo"), postJob);
router.get("/getAllJobPosts", authAdmin, getAllJobPosts);
router.delete("/deletePost/:id", authAdmin, deletePost);
router.get("/singlePost/:id", authAdmin, singlePost);
router.put(
  "/updateJobPost/:id",
  authAdmin,
  adminUploadJobs.single("logo"),
  updateJobPost
);
//materials
router.post(
  "/postMaterial",
  authAdmin,
  adminUploadMaterial.single("material"),
  postMaterial
);
router.get("/getAllMaterials", authAdmin, getAllMaterials);
router.delete("/deleteMaterial/:id", authAdmin, deleteMaterial);
router.get("/singleMaterial/:id", authAdmin, singleMaterial);
router.put(
  "/updateMaterial/:id",
  authAdmin,
  adminUploadMaterial.single("material"),
  updateMaterial
);

//report
router.get("/getReport", authAdmin, getCounts);
module.exports = router;
