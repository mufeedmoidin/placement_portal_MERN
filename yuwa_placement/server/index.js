const express = require("express");
const cors = require("cors");
const app = express();
const ConnectToMongoDb = require("./db");
ConnectToMongoDb();

app.use(express.json());
app.use(cors());

const PORT = 7000;

app.use("/student", require("./Routes/studentRoutes"));
app.use("/uploads/student", express.static("./uploads/student"));

app.use("/admin", require("./Routes/adminRoutes"));
app.use("/uploads/admin", express.static("./uploads/admin"));
app.use("/uploads/jobs", express.static("./uploads/admin/jobs"));
app.use("/uploads/materials", express.static("./uploads/admin/materials"));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
