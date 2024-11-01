import {
  Avatar,
  Box,
  Button,
  Chip,
  IconButton,
  Paper,
  Tooltip,
  Typography,
} from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionActions from "@mui/material/AccordionActions";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import React from "react";
import LanguageIcon from "@mui/icons-material/Language";
import { Link } from "react-router-dom";
import moment from "moment";
import WorkIcon from "@mui/icons-material/Work";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ShareLocationIcon from "@mui/icons-material/ShareLocation";
import ChromeReaderModeIcon from "@mui/icons-material/ChromeReaderMode";
import BadgeIcon from "@mui/icons-material/Badge";
import { useState } from "react";
export default function SingleJob({ job }) {
  const [showAll, setShowAll] = useState(false);
  const postedDate = moment(job?.createdAt);

  // Get the relative time using Moment.js
  const daysAgo = postedDate.fromNow();

  const toggleShowAll = () => {
    setShowAll(!showAll);
  };

  const aboutText = job?.companyData?.about.split(" ");
  //   const displayText = showAll ? about : aboutText.slice(0, 20).join(" ");
  const displayText = showAll
    ? job?.companyData?.about
    : job?.companyData?.about.split(" ").slice(0, 20).join(" ");
  return (
    <>
      <Paper sx={{ p: 2 }} elevation={3}>
        <Box sx={{ display: "flex", p: 1 }}>
          <Box
            sx={{
              p: 1,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "10%",
            }}
          >
            <Avatar
              src={`http://localhost:7000/uploads/jobs/${job?.companyData?.logo}`}
              sx={{ width: { sm: 50, xs: 30 }, height: { sm: 50, xs: 30 } }}
            />
          </Box>
          <Box
            sx={{
              p: 1,
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Typography variant="h6" fontFamily={"Poppins"}>
              {job?.companyData?.name}
            </Typography>
          </Box>
        </Box>
        <Box sx={{ display: "flex", p: 1 }}>
          <Box sx={{ width: "100%", textAlign: "start" }}>
            <Typography variant="h6" fontFamily={"Poppins"}>
              {job?.jobTitle}
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <Typography variant="caption" fontFamily={"Poppins"}>
                {job?.jobLocation}
              </Typography>
              <Typography variant="caption" fontFamily={"Poppins"}>
                {daysAgo}
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "flex-start",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              width: "100%",

              display: "flex",
              justifyContent: "flex-start",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "1%",
                p: 1,
              }}
            >
              <WorkIcon />
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
                width: "100%",
                p: 1,
              }}
            >
              <Typography fontFamily={"Poppins"} variant="body2">
                {job?.jobType} / {job?.jobTimeType}
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              width: "100%",

              display: "flex",
              justifyContent: "flex-start",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "1%",
                p: 1,
              }}
            >
              <SupervisorAccountIcon />
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
                width: "100%",
                p: 1,
              }}
            >
              <Typography fontFamily={"Poppins"} variant="body2">
                {job?.jobRole}
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              width: "100%",

              display: "flex",
              justifyContent: "flex-start",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "1%",
                p: 1,
              }}
            >
              <LocalOfferIcon />
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
                width: "100%",
                p: 1,
              }}
            >
              <Typography fontFamily={"Poppins"} variant="body2">
                Vacancy : {job?.jobVacancy}
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              width: "100%",

              display: "flex",
              justifyContent: "flex-start",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "1%",
                p: 1,
              }}
            >
              <AutoAwesomeIcon />
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
                width: "100%",
                p: 1,
              }}
            >
              <Typography fontFamily={"Poppins"} variant="body2">
                Experience : {job?.jobExperience}
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              width: "100%",

              display: "flex",
              justifyContent: "flex-start",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "1%",
                p: 1,
              }}
            >
              <CalendarMonthIcon />
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
                width: "100%",
                p: 1,
              }}
            >
              <Typography fontFamily={"Poppins"} variant="body2">
                Interview Date : {job?.interviewDate}
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              width: "100%",

              display: "flex",
              justifyContent: "flex-start",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "1%",
                p: 1,
              }}
            >
              <ShareLocationIcon />
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
                width: "100%",
                p: 1,
              }}
            >
              <Typography fontFamily={"Poppins"} variant="body2">
                Interview Location : {job?.interviewLocation}
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              width: "100%",

              display: "flex",
              justifyContent: "flex-start",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "1%",
                p: 1,
              }}
            >
              <ChromeReaderModeIcon />
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
                width: "100%",
                p: 1,
              }}
            >
              <Typography fontFamily={"Poppins"} variant="body2">
                Interview Mode : {job?.interviewMode}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Paper>
      <Paper sx={{ p: 2, mt: 2 }} elevation={3}>
        <Box sx={{ display: "flex", p: 1 }}>
          <Box sx={{ width: "100%", textAlign: "start" }}>
            <Typography variant="h6" fontFamily={"Poppins"}>
              About the job
            </Typography>
            <Typography variant="body2" fontFamily={"Poppins"}>
              {job?.jobDescription}
            </Typography>
          </Box>
        </Box>
        <Accordion elevation={0}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            <Box
              sx={{
                // backgroundColor: "red",
                width: "100%",
                display: "flex",
                // p: 1,
                justifyContent: "center",
              }}
            >
              <Typography variant="body1"> See more</Typography>
              {/* <ExpandMoreIcon /> */}
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <Box sx={{ p: 1 }}>
              <Box
                sx={{
                  //   backgroundColor: "yellow",
                  display: "flex",
                  justifyContent: "flex-start",
                  p: 1,
                }}
              >
                <Typography fontWeight={"bolder"} fontFamily={"Poppins"}>
                  Responsibilities
                </Typography>
              </Box>
              <Box
                sx={{
                  //   backgroundColor: "yellow",
                  display: "flex",
                  justifyContent: "flex-start",
                  //   p: 1,
                }}
              >
                <ul>
                  {job?.keyResponsibilities?.map((item, index) => (
                    <li>
                      <Typography variant="body2" sx={{ textAlign: "start" }}>
                        {item}
                      </Typography>
                    </li>
                  ))}
                </ul>
              </Box>
            </Box>
            <Box sx={{ p: 1 }}>
              <Box
                sx={{
                  //   backgroundColor: "yellow",
                  display: "flex",
                  justifyContent: "flex-start",
                  p: 1,
                }}
              >
                <Typography fontWeight={"bolder"} fontFamily={"Poppins"}>
                  Requirements:
                </Typography>
              </Box>
              <Box
                sx={{
                  //   backgroundColor: "yellow",
                  display: "flex",
                  justifyContent: "flex-start",
                  //   p: 1,
                }}
              >
                <ul>
                  {job?.mustHaves?.map((item, index) => (
                    <li>
                      <Typography variant="body2" sx={{ textAlign: "start" }}>
                        {item}
                      </Typography>
                    </li>
                  ))}
                </ul>
              </Box>
            </Box>
            <Box sx={{ p: 1 }}>
              <Box
                sx={{
                  //   backgroundColor: "yellow",
                  display: "flex",
                  justifyContent: "flex-start",
                  flexWrap: "wrap",
                  p: 1,
                }}
              >
                <Typography fontWeight={"bolder"} fontFamily={"Poppins"}>
                  Skills added by the job poster
                </Typography>
              </Box>
              <Box
                sx={{
                  //   backgroundColor: "yellow",
                  display: "flex",
                  justifyContent: "flex-start",
                  p: 1,
                  flexWrap: "wrap",
                }}
              >
                {job?.jobSkills?.map((item, index) => (
                  <Chip label={item} sx={{ m: "2px" }} />
                ))}
              </Box>
            </Box>
          </AccordionDetails>
        </Accordion>
      </Paper>
      <Paper sx={{ p: 2, mt: 2 }} elevation={3}>
        <Box sx={{ display: "flex", p: 1 }}>
          <Box sx={{ width: "100%", textAlign: "start" }}>
            <Typography variant="h6" fontFamily={"Poppins"}>
              About the company
            </Typography>
          </Box>
        </Box>
        <Box sx={{ display: "flex", p: 1 }}>
          <Box
            sx={{
              p: 1,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "10%",
            }}
          >
            <Avatar
              src={`http://localhost:7000/uploads/jobs/${job?.companyData?.logo}`}
              sx={{ width: { sm: 50, xs: 30 }, height: { sm: 50, xs: 30 } }}
            />
          </Box>
          <Box
            sx={{
              p: 1,
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Typography variant="h6" fontFamily={"Poppins"}>
              {job?.companyData?.name}
            </Typography>
          </Box>
          <Box
            sx={{
              p: 1,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "10%",
            }}
          >
            <Tooltip title="visit website">
              <Link to={`${job?.companyData?.website}`} target="_blank">
                {/* <Typography>website</Typography> */}
                <LanguageIcon color="primary" />
              </Link>
            </Tooltip>
          </Box>
        </Box>
        <Box sx={{ width: "100%", textAlign: "start" }}>
          <Typography variant="body1" fontFamily="Arial">
            {displayText}.
            {!showAll && aboutText?.length > 20 && (
              <span
                style={{ color: "#1976d2", ml: 2, fontWeight: "bold" }}
                onClick={toggleShowAll}
              >
                see more
              </span>
            )}
            {showAll && (
              <span
                style={{ color: "#1976d2", ml: 2, fontWeight: "bold" }}
                onClick={toggleShowAll}
              >
                see less
              </span>
            )}
          </Typography>
        </Box>
      </Paper>
    </>
  );
}
