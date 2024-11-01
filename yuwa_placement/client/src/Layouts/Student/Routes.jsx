import React, { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import NavBar from "./Components/NavBar/Nav";
import ImageSlider from "./Components/Slider/Slider";
import StudentContext from "./Context/StudentContext";
import Home from "./Pages/Home";
import Footer from "./Components/Footer.jsx/Footer";
import About from "./Pages/About";
import Login from "./Pages/Login";
import SignUpSide from "./Pages/Register";
import Feedback from "./Pages/Feedback";
import ViewAllPost from "./Pages/ViewAllPost";
import SinglePost from "./Pages/SinglePost";
import Materials from "./Pages/Materials";
import Profile from "./Pages/Profile";
import { Box } from "@mui/material";
export default function StudentRoutes() {
  const [path, setPath] = useState(null);
  let location = useLocation();
  // console.log(location.pathname);
  useEffect(() => {
    setPath(location.pathname);
  }, [location]);
  return (
    <StudentContext>
      {path != "/Login" && path != "/Register" && <NavBar />}
      <Box
      // sx={{
      //   mt: path != "/Login" && path != "/Register" ? { xs: 10, sm: 12 } : 0,
      // }}
      >
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/About" element={<About />} />
          <Route exact path="/Profile" element={<Profile />} />
          <Route exact path="/Posts" element={<ViewAllPost />} />
          <Route exact path="/Posts/:id" element={<SinglePost />} />
          <Route exact path="/Register" element={<SignUpSide />} />
          <Route exact path="/Feedback" element={<Feedback />} />
          <Route exact path="/Materials" element={<Materials />} />
        </Routes>
      </Box>
      <Routes>
        <Route exact path="/Login" element={<Login />} />
      </Routes>
      {path != "/Login" && path != "/Register" && <Footer />}

      {/* <Routes>
        <Route />
      </Routes> */}
    </StudentContext>
  );
}
