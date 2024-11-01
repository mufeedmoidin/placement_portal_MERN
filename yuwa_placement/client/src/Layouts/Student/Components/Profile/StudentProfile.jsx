import { Avatar, Box, Button, Grid, Paper, TextField } from "@mui/material";
import React, { useContext, useState } from "react";
import { StContext } from "../../Context/StudentContext";

export default function StudentProfile({ student, setStudent }) {
  const { updateStudentProfile } = useContext(StContext);
  const [errors, setErrors] = useState({});
  const [imageUrl, setImageUrl] = useState("");
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name == "profile") {
      const file = e.target.files[0];
      if (file) {
        const fileBlob = new Blob([file], { type: file.type });
        const imageUrl = URL.createObjectURL(fileBlob);
        setImageUrl(imageUrl);
      }
      setStudent({ ...student, [name]: file });
    } else {
      setStudent({ ...student, [name]: value });
    }
  };
  const validate = () => {
    let tempErrors = {};
    if (student.name == "") tempErrors.name = "Name cannot be empty!";
    if (!student.phone) {
      tempErrors.phone = "Phone number is required.";
    } else if (!/^\d{10}$/.test(student.phone)) {
      tempErrors.phone = "Phone number must be 10 digits.";
    }
    if (student.npass !== student.cpass) {
      tempErrors.cpass = "Passwords do not match.";
    }
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };
  const handleSubmit = async () => {
    if (validate()) {
      setStudent({ ...student, cpass: "", npass: "" });
      updateStudentProfile(student);
      // Add your form submission logic here
    }
  };
  return (
    <Box
      sx={{
        flexGrow: 1,
        // backgroundColor: "red",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Grid
        container
        spacing={2}
        sx={{
          //   backgroundColor: "purple",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Grid item xs={11} sm={6} mt={3} mb={3}>
          <Paper elevation={2} sx={{ width: "100%", height: "auto" }}>
            <Grid container>
              <Box
                sx={{
                  //   backgroundColor: "green",
                  width: "100%",
                  height: "15vh",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  p: 3,
                }}
              >
                <Avatar
                  src={
                    imageUrl
                      ? imageUrl
                      : `http://localhost:7000/uploads/student/${student?.profile}`
                  }
                  sx={{
                    width: 150,
                    height: 150,
                    objectFit: "contain",
                    // height: "100%",
                  }}
                />
              </Box>
            </Grid>
            <Grid item xs={12} sm={12} p={3}>
              <TextField
                onChange={handleChange}
                fullWidth
                variant="outlined"
                label="Enter your register number"
                name="RegNumber"
                value={student?.RegNumber}
                InputLabelProps={{ shrink: true }}
                error={!!errors.RegNumber}
                helperText={errors.RegNumber}
                disabled
              />
              <TextField
                sx={{ mt: 2 }}
                onChange={handleChange}
                fullWidth
                variant="outlined"
                label="Enter your name"
                name="name"
                value={student?.name}
                InputLabelProps={{ shrink: true }}
                error={!!errors.name}
                helperText={errors.name}
              />
              <TextField
                sx={{ mt: 2 }}
                onChange={handleChange}
                fullWidth
                variant="outlined"
                label="Enter your contact number"
                name="phone"
                value={student?.phone}
                InputLabelProps={{ shrink: true }}
                error={!!errors.phone}
                helperText={errors.phone}
              />

              <TextField
                sx={{ mt: 2 }}
                onChange={handleChange}
                fullWidth
                variant="outlined"
                label="Enter your email"
                name="email"
                value={student?.email}
                InputLabelProps={{ shrink: true }}
                error={!!errors.email}
                helperText={errors.email}
                disabled
              />

              <TextField
                onChange={handleChange}
                sx={{ mt: 2 }}
                fullWidth
                variant="outlined"
                label="Upload your profile picture"
                type="file"
                name="profile"
                InputLabelProps={{ shrink: true }}
                error={!!errors.profile}
                helperText={errors.profile}
              />
              <TextField
                sx={{ mt: 2 }}
                onChange={handleChange}
                fullWidth
                variant="outlined"
                label="Enter your new password"
                name="npass"
                value={student?.npass && student.npass}
                error={!!errors.npass}
                helperText={errors.npass}
              />

              <TextField
                sx={{ mt: 2 }}
                onChange={handleChange}
                fullWidth
                variant="outlined"
                label="Confirm password"
                name="cpass"
                value={student?.cpass && student.cpass}
                error={!!errors.cpass}
                helperText={errors.cpass}
              />
            </Grid>
            <Grid item xs={12} sm={12} p={3}>
              <Button
                onClick={handleSubmit}
                variant="contained"
                fullWidth
                sx={{ mt: 2 }}
              >
                Update
              </Button>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
