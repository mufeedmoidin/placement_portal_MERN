import React, { useEffect } from "react";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import { StContext } from "../Context/StudentContext";
import SingleJob from "../Components/JobPosts/SingleJob";
import RelatedJobs from "../Components/JobPosts/RelatedJobs";
import { Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
export default function SinglePost() {
  const {
    viewSingleJobPost,
    singleJob,
    setSingleJob,
    allJobs,
    viewAllJobPosts,
  } = useContext(StContext);
  const { id } = useParams();
  useEffect(() => {
    viewSingleJobPost(id);
    viewAllJobPosts();
  }, [id]);
  // console.log(singleJob);
  // console.log(allJobs);
  return (
    <Box sx={{ flexGrow: 1, p: 3, minHeight: "100vh" }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={8}>
          {/* <Item> */}
          <SingleJob job={singleJob} />
          {/* </Item> */}
        </Grid>
        <Grid item xs={12} sm={4}>
          {/* <Item> */}
          <Typography variant="overline">Related jobs</Typography>
          <RelatedJobs data={allJobs} id={id} />
          {/* </Item> */}
        </Grid>
      </Grid>
    </Box>
  );
}
