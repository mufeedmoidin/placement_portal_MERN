import React, { useContext, useEffect } from "react";
import { AdContext } from "../Context/AdminContext";
import PageBreadcrumbs from "../Components/Breadcrumbs/PageBreadcrumbs";
import Counts from "../Components/Report/Counts";
import ViewAll from "../Components/Feedbacks/ViewAll";
import { Box } from "@mui/material";

export default function Dashboard() {
  const {
    navigate,
    adminToken,
    allFeedbacks,
    getAllFeedbacks,
    getAllReport,
    report,
  } = useContext(AdContext);

  useEffect(() => {
    if (localStorage.getItem("AdminToken") == null) {
      navigate("/admin");
    } else {
      getAllFeedbacks();
      getAllReport();
    }
  }, [adminToken]);
  // console.log(report);
  let sl = allFeedbacks.slice().reverse();
  let filtered = sl.slice(0, 3);
  // console.log(allFeedbacks.slice().reverse());
  return (
    <div>
      <PageBreadcrumbs
        title1={"Dashboard"}
        title2={"Placements"}
        title3={"New Post"}
        isTitle2={false}
        isTitle3={false}
      />
      <Counts report={report} />
      <Box mt={2}>
        <ViewAll allFeedbacks={filtered} />
      </Box>
    </div>
  );
}
