import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./Components/Sidebar/Index";
import Home from "./Pages/Home";
import Installation from "./Pages/Installation";
import CSS from "./Pages/Css";
import Image from "./Pages/Image";
import Arrow from "./Pages/Arrow";
import Variables from "./Pages/Variables";
import Map from "./Pages/Map";
import Destructure from "./Pages/Destructure";
import Spread from "./Pages/Spread";
import Ternary from "./Pages/Ternary";
import Modules from "./Pages/Modules";
import State from "./Pages/State";
import Effect from "./Pages/Effect";
import Storage from "./Pages/Storage";
import Lmethods from "./Pages/Lmethods";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import Routings from "./Pages/Routings";
import Properties from "./Pages/Properties";

function App() {
  const [open, setOpen] = React.useState(true);
  return (
    <Router>
      <Sidebar open={open} setOpen={setOpen} />
      <MainContent open={open} setOpen={setOpen} />
    </Router>
  );
}

function MainContent({ open, setOpen }) {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <div
      style={{
        marginLeft: isSmallScreen ? 0 : !open ? 0 : 230,
        padding: isSmallScreen ? "10px" : "20px",
        marginTop: isSmallScreen ? "10px" : 0, // Adjust top margin for small screens if you have a fixed AppBar
      }}
    >
      <Box
        sx={{
          backgroundColor: "#E3F2FD",
          minHeight: "100vh",
          padding: 2,
          borderRadius: "20px",
        }}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Installation" element={<Installation />} />
          <Route path="/Styling/css" element={<CSS />} />
          <Route path="/Styling/image" element={<Image />} />
          <Route path="/ES6/arrowFunction" element={<Arrow />} />
          <Route path="/ES6/variables" element={<Variables />} />
          <Route path="/ES6/map" element={<Map />} />
          <Route path="/ES6/destructure" element={<Destructure />} />
          <Route path="/ES6/spread" element={<Spread />} />
          <Route path="/ES6/modules" element={<Modules />} />
          <Route path="/Routes" element={<Routings />} />
          <Route path="/Props" element={<Properties />} />
          <Route path="/Hooks/useState" element={<State />} />
          <Route path="/Hooks/useEffect" element={<Effect />} />
          <Route path="/LocalStorage" element={<Storage />} />
          <Route path="/LocalStorage/methods" element={<Lmethods />} />
        </Routes>
      </Box>
    </div>
  );
}

export default App;
