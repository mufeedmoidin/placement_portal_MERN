import {
  Box,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { StContext } from "../Context/StudentContext";
import { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import NoResults from "../Components/NoResults/NoResult";
import JobPosts from "../Components/JobPosts/JobPosts";
export default function ViewAllPost() {
  const { viewAllJobPosts, allJobs, setAllJobs } = useContext(StContext);
  const [search, setSearch] = useState("");
  const [selectedJobTimeType, setSelectedJobTimeType] = useState("All");
  const [selectedJobType, setSelectedJobType] = useState("All");
  const [filteredJobs, setFilteredJobs] = useState([]);
  useEffect(() => {
    viewAllJobPosts();
  }, []);

  useEffect(() => {
    const filterJobs = () => {
      var jobs = allJobs;
      if (search) {
        jobs = jobs.filter(
          (job) =>
            job?.jobTitle?.toLowerCase().includes(search?.toLowerCase()) ||
            job?.jobRole?.toLowerCase().includes(search?.toLowerCase()) ||
            job?.companyData?.name
              ?.toLowerCase()
              .includes(search?.toLowerCase())
        );
      } else if (selectedJobTimeType != "All") {
        jobs = jobs.filter((job) => job.jobTimeType === selectedJobTimeType);
      } else if (selectedJobType != "All") {
        jobs = jobs.filter((job) => job.jobType === selectedJobType);
      } else {
        jobs = allJobs;
      }
      setFilteredJobs(jobs);
    };

    filterJobs();
  }, [search, selectedJobTimeType, selectedJobType, allJobs]);
  // console.log(filteredJobs);
  return (
    <Box sx={{ minHeight: "100vh", p: 2 }}>
      <Grid
        container
        spacing={2}
        sx={{ display: "flex", justifyContent: "space-between", p: 1 }}
      >
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            label="search by job title, role or company"
            //   variant="standard"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    // sx={{ mt: 5 }}
                    aria-label="toggle password visibility"
                    edge="end"
                  >
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">
              Filter by part time & full time
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Filter by part time & full time"
              name="jobTimeType"
              value={selectedJobTimeType || ""}
              onChange={(e) => setSelectedJobTimeType(e.target.value)}
            >
              <MenuItem value="All">All</MenuItem>
              <MenuItem value={"Full Time"}>Full Time</MenuItem>
              <MenuItem value={"Part Time"}>Part Time</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={4}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">
              Filter by job type
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Filter by job type"
              name="jobType"
              value={selectedJobType || ""}
              onChange={(e) => setSelectedJobType(e.target.value)}
            >
              {" "}
              <MenuItem value="All">All</MenuItem>
              <MenuItem value={"On-site"}>On-site</MenuItem>
              <MenuItem value={"Remote"}>Remote</MenuItem>
              <MenuItem value={"Hybrid"}>Hybrid</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <Grid
        container
        spacing={1}
        sx={{ display: "flex", justifyContent: "center", p: 3 }}
      >
        {filteredJobs.length > 0 ? (
          filteredJobs?.map((job, index) => (
            <Grid
              item
              xs={12}
              sm={4}
              sx={{
                p: 1,
                display: "flex",
                // backgroundColor: "yellow",
                width: "40%",
              }}
              key={index}
            >
              <JobPosts width="100%" job={job} />
            </Grid>
          ))
        ) : (
          <Box>
            <NoResults />
          </Box>
        )}
      </Grid>
    </Box>
  );
}
