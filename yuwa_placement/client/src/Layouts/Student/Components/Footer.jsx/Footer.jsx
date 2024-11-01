import React from "react";
import "./Footer.css"; // Import your CSS file for styling
import { Box, Typography, IconButton } from "@mui/material";
import { Link } from "react-router-dom";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import logo from "../../assets/Images/logo.png";

const Footer = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#222a45f5",
        // width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        p: 4,
      }}
    >
      <Box
        sx={{
          width: "90%",
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: "center",
          justifyContent: "center",
          p: 4,
          gap: 4,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <img src={logo} alt="Logo" style={{ width: "100px" }} />
          <Typography
            sx={{ color: "white", mt: 2 }}
            variant="h4"
            fontFamily={"Poppins"}
            fontSize={"2.2em"}
          >
            Yuwa Placement
          </Typography>
          <Typography
            sx={{ color: "gray" }}
            variant="caption"
            fontFamily={"Poppins"}
          >
            Empowering Your Future
          </Typography>
        </Box>
      </Box>
      <Typography
        sx={{ color: "gray", mt: 4 }}
        variant="body2"
        fontFamily={"Poppins"}
        textAlign={"center"}
      >
        &copy; 2024 Yuwa Placement. All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
