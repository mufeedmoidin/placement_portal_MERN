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
import { AdContext } from "../Context/AdminContext";
import axios from "axios";
import pic from "../assets/0.jpg";
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
  const { adminToken, setAdminToken, navigate, state, setState } =
    useContext(AdContext);
  // console.log(studentToken, navigate);
  const [userInfo, setUserInfo] = React.useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = React.useState({});

  const handleChange = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  const validate = () => {
    let tempErrors = {};
    tempErrors.email = userInfo.email ? "" : "This field is required.";
    tempErrors.password = userInfo.password ? "" : "This field is required.";
    setErrors(tempErrors);
    return Object.values(tempErrors).every((x) => x === "");
  };

  const handleSubmit = async () => {
    if (validate()) {
      // console.log(userInfo);
      // toast.success("hy");
      axios
        .post("http://localhost:7000/admin/Login", userInfo)
        .then(async (response) => {
          // console.log(response.data);
          alert(response.data.message);
          if (response.data.success) {
            // console.log(response.data);
            localStorage.setItem(
              "loggedInAdmin",
              JSON.stringify(response.data.loggedInAdmin)
            );
            localStorage.setItem(
              "AdminToken",
              JSON.stringify(response.data.adminToken)
            );
            setAdminToken(response.data.adminToken);
            setState((prev) => !prev);
            await navigate("/admin/Dashboard");
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
              mt: 5,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography
              fontFamily={"Poppins"}
              fontWeight={"bolder"}
              component="h1"
              variant="h5"
            >
              Admin Sign In
            </Typography>
            <Box sx={{ mt: 1 }}>
              <TextField
                onChange={handleChange}
                margin="normal"
                required
                fullWidth
                label="Email ID"
                name="email"
                autoFocus
                error={Boolean(errors.email)}
                helperText={errors.email}
              />
              {/* <TextField
                onChange={handleChange}
                margin="normal"
                required
                fullWidth
                label="Enter your Email ID"
                name="email"
                type="email"
                error={Boolean(errors.email)}
                helperText={errors.email}
              /> */}
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
                Sign In
              </Button>
              <Copyright sx={{ mt: 2 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
