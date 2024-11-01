const jwt = require("jsonwebtoken");
const SECRETE_KEY = "PLACEMENT";

const authAdmin = (req, res, next) => {
  const token = req.header("auth-token");
  // console.log(token);
  if (!token) {
    res.status(404).json({ message: "token not found", success: false });
  }
  try {
    const adminId = jwt.verify(token, SECRETE_KEY);
    // console.log(adminId,'adminId')
    // console.log(token,'token')
    req.admin = adminId;
    next();
  } catch (err) {
    console.log(err);
  }
};
module.exports = authAdmin;
