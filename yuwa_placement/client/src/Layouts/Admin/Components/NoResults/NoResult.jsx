import React from "react";
import { Box, Paper, Typography, Button, CardMedia } from "@mui/material";
import noResult from "../../assets/noResult.png";
const NoResults = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        // minHeight: "100vh",
        padding: 2,
        // backgroundColor: "#000",
      }}
    >
      <Box
        sx={{ padding: 3, textAlign: "center", maxWidth: 400, width: "100%" }}
      >
        <img style={{ width: "250px" }} src={noResult} />
        <Typography fontFamily={"Poppins"} variant="h5" gutterBottom>
          No results found
        </Typography>
        <Typography fontFamily={"Poppins"} variant="body1" paragraph>
          Try shortening or rephrasing your search.
        </Typography>
      </Box>
    </Box>
  );
};

export default NoResults;
