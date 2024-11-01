import React, { useEffect } from "react";
import { useContext } from "react";
import { StContext } from "../Context/StudentContext";
import StudentProfile from "../Components/Profile/StudentProfile";
import { Box } from "@mui/material";

export default function Profile() {
  const { getStudentProfile, setStudent, student } = useContext(StContext);

  useEffect(() => {
    getStudentProfile();
  }, []);
  return (
    <Box sx={{ minHeight: "100vh" }}>
      <StudentProfile student={student} setStudent={setStudent} />
    </Box>
  );
}
