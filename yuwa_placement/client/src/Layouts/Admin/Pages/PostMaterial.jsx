import React from "react";
import PageBreadcrumbs from "../Components/Breadcrumbs/PageBreadcrumbs";
import Post from "../Components/Materials/Post/PostMaterial";
export default function PostMaterial() {
  return (
    <div>
      <PageBreadcrumbs
        title1={"Home"}
        title2={"Material"}
        title3={"New Post"}
        isTitle2={true}
        isTitle3={true}
      />
      <Post />
    </div>
  );
}
