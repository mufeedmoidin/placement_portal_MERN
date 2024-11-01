import React, { useContext } from "react";
import PageBreadcrumbs from "../Components/Breadcrumbs/PageBreadcrumbs";
import { useParams } from "react-router-dom";
import { AdContext } from "../Context/AdminContext";
import { useEffect } from "react";
import UpdateMaterial from "../Components/Materials/Update/Update";

export default function SingleMaterial() {
  const { getSingleMaterial, singleMaterial, setSingleMaterial } =
    useContext(AdContext);
  let { id } = useParams();
  useEffect(() => {
    getSingleMaterial(id);
  }, [id]);
  //   console.log(singleMaterial);
  return (
    <div>
      <PageBreadcrumbs
        title1={"Home"}
        title2={"Material"}
        title3={"Update"}
        isTitle2={true}
        isTitle3={true}
      />
      <UpdateMaterial data={singleMaterial} id={id} />
    </div>
  );
}
