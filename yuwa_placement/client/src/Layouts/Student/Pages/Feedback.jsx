import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Card, Paper } from "@mui/material";
import { useState } from "react";
import axios from "axios";

const defaultTheme = createTheme();

export default function Feedback() {
  const [feedback, setFeedback] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = React.useState({});

  const handleChange = (e) => {
    setFeedback({ ...feedback, [e.target.name]: e.target.value });
  };
  const validate = () => {
    let tempErrors = {};
    tempErrors.name = feedback.name ? "" : "This field is required.";
    if (!feedback.email) {
      tempErrors.email = "This field is required.";
    } else {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      tempErrors.email = emailPattern.test(feedback.email)
        ? ""
        : "Email is not valid.";
    }
    tempErrors.message = feedback.message ? "" : "This field is required.";
    setErrors(tempErrors);
    return Object.values(tempErrors).every((x) => x === "");
  };
  const handleSubmit = (event) => {
    if (validate()) {
      axios
        .post("http://localhost:7000/student/Feedback", feedback)
        .then((response) => {
          alert(response.data.message);
          if (response.data.success) {
            setFeedback({
              name: "",
              email: "",
              message: "",
            });
          }
          // toast.success("hy");
        })
        .catch((error) => {
          console.log(error);
          alert(error.message);
        });
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="sm">
        <CssBaseline />
        <Paper
          elevation={5}
          sx={{
            marginTop: { xs: 2, sm: 2 },
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            mb: 3,
            p: 3,
          }}
        >
          <Typography
            component="h1"
            sx={{ fontWeight: "bolder", fontSize: "1rem", color: "#222a45f5" }}
            variant="overline"
          >
            Submit your feedback here
          </Typography>
          <Box sx={{ mt: 1, p: 2, mb: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12}>
                <TextField
                  value={feedback?.name}
                  onChange={handleChange}
                  name="name"
                  required
                  fullWidth
                  id="Name"
                  label="Enter your Name"
                  autoFocus
                  error={Boolean(errors.name)}
                  helperText={errors.name}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  value={feedback?.email}
                  onChange={handleChange}
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  error={Boolean(errors.email)}
                  helperText={errors.email}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  value={feedback?.message}
                  onChange={handleChange}
                  required
                  fullWidth
                  id="email"
                  label="Message"
                  name="message"
                  multiline
                  rows={4}
                  error={Boolean(errors.message)}
                  helperText={errors.message}
                />
              </Grid>
            </Grid>
            <Button
              onClick={handleSubmit}
              fullWidth
              variant="contained"
              sx={{ mt: 5, backgroundColor: "#222a45f5" }}
            >
              Submit
            </Button>
          </Box>
        </Paper>
      </Container>
    </ThemeProvider>
  );
}
