import React from "react";
import { Link } from "react-router-dom";
import { Container, Typography, Button, Box } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import bg from "../assets/404.png";
import PageBreadcrumbs from "../Components/Breadcrumbs/PageBreadcrumbs";
const theme = createTheme();

export default function NotFoundPage() {
  return (
    <>
      <PageBreadcrumbs
        title1={"Home"}
        title2={"Error Page"}
        title3={"New Post"}
        isTitle2={true}
        isTitle3={false}
      />
      <ThemeProvider theme={theme}>
        <Container
          component="main"
          maxWidth="xl"
          style={{
            textAlign: "center",
            // marginTop: "10%",
            backgroundImage: `url(${bg})`,
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            color: "#1976d2",
            width: "100%",
            height: "80vh",
            backgroundSize: "contain",
          }}
        >
          {/* <img src={bg} alt="" /> */}
          {/* <Typography variant="h1" component="h1" gutterBottom>
          404
        </Typography>
        <Typography variant="h6" component="h2" gutterBottom>
          Page Not Found
        </Typography>
        <Typography variant="body1" gutterBottom>
          The page you are looking for might have been removed, had its name
          changed, or is temporarily unavailable.
        </Typography>
        <Box mt={4}>
          <Link to="/admin/Dashboard" style={{ textDecoration: "none" }}>
            <Button variant="contained" color="primary">
              Go to Home
            </Button>
          </Link>
        </Box> */}
        </Container>
      </ThemeProvider>
    </>
  );
}
