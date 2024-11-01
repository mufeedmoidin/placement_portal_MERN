import React, { useContext, useEffect } from "react";
import ImageSlider from "../Components/Slider/Slider";
import AboutSection from "../Components/About/About";
import { StContext } from "../Context/StudentContext";

export default function Home() {
  const {
    studentToken,
    navigate,
    setStudentToken,
    student,
    getStudentProfile,
  } = useContext(StContext);
  useEffect(() => {
    if (localStorage.getItem("StudentToken") != null) {
      getStudentProfile();
    }
  }, []);
  return (
    <div>
      <ImageSlider />
      <AboutSection />
    </div>
  );
}
