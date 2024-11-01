import * as React from "react";
import { useContext } from "react";
import { AdContext } from "../Context/AdminContext";
import { Avatar, TextField } from "@mui/material";
import PageBreadcrumbs from "../Components/Breadcrumbs/PageBreadcrumbs";
import { useEffect } from "react";
import ViewAll from "../Components/Feedbacks/ViewAll";

export default function Feedbacks() {
  const { allFeedbacks, setAllFeedbacks, getAllFeedbacks } =
    useContext(AdContext);
  useEffect(() => {
    getAllFeedbacks();
  }, []);
  return (
    <>
      <PageBreadcrumbs
        title1={"Home"}
        title2={"Feedbacks"}
        title3={"New Post"}
        isTitle2={true}
        isTitle3={false}
      />
      <ViewAll allFeedbacks={allFeedbacks} />
    </>
  );
}
