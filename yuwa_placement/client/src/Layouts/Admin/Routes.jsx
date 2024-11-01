import React from "react";
import AdminContext from "./Context/AdminContext";
import Sidebar from "./Components/Sidebar/Index";
import Login from "./Pages/Login";
import Dashboard from "./Pages/Dashboard";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import Error from "./Pages/Error";
import { useState } from "react";
import { useEffect } from "react";
import Students from "./Pages/Students";
import Feedbacks from "./Pages/Feedbacks";
import PostJob from "./Pages/PostJob";
import ViewJobs from "./Pages/ViewJobs";
import PostMaterial from "./Pages/PostMaterial";
import ViewMaterials from "./Pages/ViewMaterials";
import Profile from "./Pages/Profile";
import SinglePost from "./Pages/SinglePost";
import SingleMaterial from "./Pages/SingleMaterial";

export default function AdminRoutes() {
  const [path, setPath] = useState(null);
  let location = useLocation();
  const [open, setOpen] = useState(localStorage.getItem("sideBar"));
  useEffect(() => {
    setPath(location.pathname);
  }, [location]);
  return (
    <AdminContext>
      {path != "/admin" ? (
        <>
          <Sidebar open={open} setOpen={setOpen} />
          <MainContent open={open} setOpen={setOpen} />
        </>
      ) : (
        <Login />
      )}
    </AdminContext>
  );
}
function MainContent({ open, setOpen }) {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <div
      style={{
        overflow: "auto",
        marginLeft: isSmallScreen ? 0 : !open ? 0 : 230,
        padding: isSmallScreen ? "10px" : "20px",
        marginTop: isSmallScreen ? "10px" : 0, // Adjust top margin for small screens if you have a fixed AppBar
      }}
    >
      <Box
        sx={{
          // backgroundColor: "#E3F2FD",
          minHeight: "85vh",
          padding: 2,
          borderRadius: "10px",
        }}
      >
        <Routes>
          {/* <Route path="/" element={<Login />} /> */}
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/Students" element={<Students />} />
          <Route path="/Placement/Post" element={<PostJob />} />
          <Route path="/Placement/View" element={<ViewJobs />} />
          <Route path="/Placement/View/:id" element={<SinglePost />} />
          <Route path="/Material/Post" element={<PostMaterial open={open} />} />
          <Route path="/Material/View" element={<ViewMaterials />} />
          <Route
            path="/Material/View/:id"
            element={<SingleMaterial open={open} />}
          />
          <Route path="/Feedbacks" element={<Feedbacks />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/*" element={<Error />} />
        </Routes>
      </Box>
    </div>
  );
}
