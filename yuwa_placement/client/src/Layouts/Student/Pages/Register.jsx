import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import { Link } from "react-router-dom";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { toast } from "react-toastify";
import { useContext } from "react";
import { StContext } from "../Context/StudentContext";
import axios from "axios";
import pic from "../assets/Images/03.jpg";
function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const defaultTheme = createTheme();

export default function SignUpSide() {
  const { studentToken, navigate } = useContext(StContext);
  // console.log(studentToken, navigate);
  const [userInfo, setUserInfo] = React.useState({
    number: "",
    name: "",
    phone: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = React.useState({});

  const handleChange = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  const validate = () => {
    let tempErrors = {};
    tempErrors.number = userInfo.number ? "" : "This field is required.";
    tempErrors.name = userInfo.name ? "" : "This field is required.";
    tempErrors.phone = userInfo.phone ? "" : "This field is required.";

    // Email validation
    if (!userInfo.email) {
      tempErrors.email = "This field is required.";
    } else {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      tempErrors.email = emailPattern.test(userInfo.email)
        ? ""
        : "Email is not valid.";
    }

    tempErrors.password = userInfo.password ? "" : "This field is required.";
    setErrors(tempErrors);
    return Object.values(tempErrors).every((x) => x === "");
  };

  const handleSubmit = () => {
    if (validate()) {
      // console.log(userInfo);
      // toast.success("hy");
      axios
        .post("http://localhost:7000/student/Register", userInfo)
        .then((response) => {
          // console.log(response.data);
          alert(response.data.message);
          if (response.data.success) {
            navigate("/Login");
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
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={12}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${pic})`,
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign Up
            </Typography>
            <Box sx={{ mt: 1 }}>
              <TextField
                onChange={handleChange}
                margin="normal"
                required
                fullWidth
                label="Register Number"
                name="number"
                autoFocus
                error={Boolean(errors.number)}
                helperText={errors.number}
              />
              <TextField
                onChange={handleChange}
                margin="normal"
                required
                fullWidth
                label="Enter your Full Name"
                name="name"
                error={Boolean(errors.name)}
                helperText={errors.name}
              />
              <TextField
                onChange={handleChange}
                margin="normal"
                required
                fullWidth
                label="Enter your Contact Number"
                name="phone"
                error={Boolean(errors.phone)}
                helperText={errors.phone}
              />
              <TextField
                onChange={handleChange}
                margin="normal"
                required
                fullWidth
                label="Enter your Email ID"
                name="email"
                type="email"
                error={Boolean(errors.email)}
                helperText={errors.email}
              />
              <TextField
                onChange={handleChange}
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                error={Boolean(errors.password)}
                helperText={errors.password}
              />
              <Button
                onClick={handleSubmit}
                fullWidth
                variant="contained"
                sx={{ mt: 4, mb: 1 }}
              >
                Sign Up
              </Button>
              <Grid container>
                <Grid
                  item
                  sx={{
                    width: "100%",
                    textAlign: "center",
                    p: 1,
                  }}
                >
                  <Link
                    style={{ textDecoration: "none" }}
                    to={"/Login"}
                    variant="body2"
                  >
                    {"Already have an account? "}
                    <span style={{ textDecoration: "underline" }}>Sign In</span>
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 2 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
