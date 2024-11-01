import React from "react";
import JobPosts from "./JobPosts";
import { Box } from "@mui/material";

export default function RelatedJobs({ data, id }) {
  const filteredJobs = data.filter((item) => item?._id != id);
  return (
    <Box sx={{ width: "100%" }}>
      {filteredJobs
        .slice()
        .reverse()
        .slice(0, 4)
        ?.map((job, index) => (
          <Box sx={{ p: 1, width: "90%" }} key={index}>
            <JobPosts job={job} />
          </Box>
        ))}
    </Box>
  );
}
