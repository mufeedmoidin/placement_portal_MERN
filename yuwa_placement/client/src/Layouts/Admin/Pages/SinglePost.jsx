import React, { useContext } from "react";
import PageBreadcrumbs from "../Components/Breadcrumbs/PageBreadcrumbs";
import { useEffect } from "react";
import { AdContext } from "../Context/AdminContext";
import { useParams } from "react-router-dom";
import UpdateJob from "../Components/UpdateJob/UpdateJob";

export default function SinglePost() {
  const { getSinglePost, singleJob, setSingleJob } = useContext(AdContext);
  let { id } = useParams();
  useEffect(() => {
    getSinglePost(id);
  }, [id]);
  return (
    <div>
      <PageBreadcrumbs
        title1={"Home"}
        title2={"Placements"}
        title3={"Update Post"}
        isTitle2={true}
        isTitle3={true}
      />
      <UpdateJob singleJob={singleJob} setSingleJob={setSingleJob} />
    </div>
  );
}
