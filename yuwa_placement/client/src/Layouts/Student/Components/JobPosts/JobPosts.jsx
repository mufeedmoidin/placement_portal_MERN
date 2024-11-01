import React from "react";
import { styled } from "@mui/material/styles";
import {
  Card,
  Typography,
  Avatar,
  Button,
  Box,
  Tooltip,
  IconButton,
} from "@mui/material";
import LanguageIcon from "@mui/icons-material/Language";
import { Link } from "react-router-dom";

const CardWrapper = styled(Card)({
  display: "flex",
  // marginBottom: 16, // 2 * 8px (default MUI spacing unit)
  padding: 15,
  alignItems: "center",
});

const DetailsBox = styled(Box)({
  flex: 1,
  marginLeft: 16, // 2 * 8px
});

const ActionsBox = styled(Box)({
  display: "flex",
  alignItems: "center",
});

const StyledAvatar = styled(Avatar)({
  width: 56,
  height: 56,
});

const EasyApplyButton = styled(Button)({
  display: "flex",
  alignItems: "center",
  marginLeft: 16, // 2 * 8px
});

export default function JobPosts({ job, width }) {
  // console.log(job);
  return (
    <CardWrapper
      elevation={1}
      sx={{
        // borderBottom: "1px solid black",
        // backgroundColor: "red",
        width: "100%",
      }}
    >
      <Box>
        <StyledAvatar
          alt={job?.companyData?.name}
          src={`http://localhost:7000/uploads/jobs/${job?.companyData?.logo}`}
        />
      </Box>
      <DetailsBox>
        <Link to={`/Posts/${job?._id}`} style={{ textDecoration: "none" }}>
          <Typography
            sx={{ fontFamily: "Poppins" }}
            // variant={{ sx: "caption", sm: "h6" }}
            component="div"
          >
            {job?.jobTitle} ({job?.jobTimeType})
          </Typography>
        </Link>
        <Typography
          sx={{ fontFamily: "Poppins" }}
          variant="body2"
          color="textSecondary"
        >
          {job?.companyData?.name}
        </Typography>
        <Typography
          sx={{ fontFamily: "Poppins" }}
          variant="caption"
          color="textSecondary"
        >
          {job?.jobLocation} ({job?.jobType})
        </Typography>
      </DetailsBox>
    </CardWrapper>
  );
}
