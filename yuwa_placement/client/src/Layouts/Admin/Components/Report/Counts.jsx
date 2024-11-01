import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { Card, Typography } from "@mui/material";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import AllInboxIcon from "@mui/icons-material/AllInbox";
import WorkIcon from "@mui/icons-material/WorkOutlineOutlined";
// import WorkOutlineOutlinedIcon from "@mui/icons-material/WorkOutlineOutlined";
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function Counts({ report }) {
  let reports = [
    {
      caption: "Students",
      icon: (
        <PeopleAltIcon
          //   fontSize="larger"

          sx={{ fontSize: "80px", color: "#222a45f5" }}
        />
      ),
      count: report?.studentsCount,
    },
    {
      caption: "Material Posted",
      icon: (
        <AllInboxIcon
          //   fontSize="larger"

          sx={{ fontSize: "80px", color: "#222a45f5" }}
        />
      ),
      count: report?.MaterialsCount,
    },
    {
      caption: "Job Posted",
      icon: (
        <WorkIcon
          //   fontSize="larger"

          sx={{ fontSize: "80px", color: "#222a45f5" }}
        />
      ),
      count: report?.jobsCount,
    },
  ];
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        {reports?.map((report, idnex) => (
          <Grid key={idnex} item xs={12} sm={4}>
            <Item sx={{ borderRight: "4px solid #222a45f5" }}>
              <Box
                sx={{
                  // backgroundColor: "yellow",
                  width: "100%",
                  height: "100%",
                  p: 2,
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Box sx={{ width: "100%" }}>
                  <Box
                    sx={{
                      // backgroundColor: "green",
                      width: "100%",
                      display: "flex",
                      p: 1,
                      justifyContent: "flex-start",
                      flexDirection: "column",
                    }}
                  >
                    <Typography
                      sx={{
                        fontFamily: "Poppins",
                        fontWeight: "bolder",
                        fontSize: "35px",
                        textAlign: "start",
                      }}
                    >
                      {report?.count}
                    </Typography>
                    <Typography
                      sx={{
                        fontFamily: "Poppins",
                        fontWeight: "bolder",
                        //   fontSize: "20px",
                        textAlign: "start",
                      }}
                    >
                      {report?.caption}
                    </Typography>
                  </Box>
                </Box>
                <Box
                  sx={{
                    //   backgroundColor: "purple",
                    width: "30%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {report?.icon}
                </Box>
              </Box>
            </Item>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
