const jwt = require("jsonwebtoken");
const SECRETE_KEY = "PLACEMENT";

const authStudent = (req, res, next) => {
  const token = req.header("auth-token");
  // console.log(token);
  if (!token) {
    res.send("token not found");
  }
  try {
    const studentId = jwt.verify(token, SECRETE_KEY);
    // console.log(studentId,'studentId')
    // console.log(token,'token')
    req.student = studentId;
    next();
  } catch (err) {
    console.log(err);
  }
};
module.exports = authStudent;
