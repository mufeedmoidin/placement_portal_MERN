import * as React from "react";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Link } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import GrainIcon from "@mui/icons-material/Grain";

export default function PageBreadcrumbs({
  title1,
  title2,
  title3,
  isTitle2,
  isTitle3,
}) {
  return (
    <div role="presentation">
      <Breadcrumbs sx={{ mb: 3 }} separator="›" aria-label="breadcrumb">
        <Link
          style={{
            display: "flex",
            alignItems: "center",
            color: "black",
            textDecoration: "none",
          }}
          to="/admin/Dashboard"
        >
          <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
          {title1}
        </Link>
        {isTitle2 && (
          <Typography
            sx={{ display: "flex", alignItems: "center" }}
            color="text.primary"
          >
            <WhatshotIcon sx={{ mr: 0.5 }} fontSize="inherit" />
            {title2}
          </Typography>
        )}
        {isTitle3 && (
          <Typography
            sx={{ display: "flex", alignItems: "center" }}
            color="text.primary"
          >
            <GrainIcon sx={{ mr: 0.5 }} fontSize="inherit" />
            {title3}
          </Typography>
        )}
      </Breadcrumbs>
    </div>
  );
}
