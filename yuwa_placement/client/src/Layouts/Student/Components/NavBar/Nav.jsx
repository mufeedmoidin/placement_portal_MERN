import logo from "../../assets/Images/logo.png";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { useContext } from "react";
import { StContext } from "../../Context/StudentContext";
import { Link } from "react-router-dom";
import { Divider } from "@mui/material";
import "./Navbar.css";
import { useEffect } from "react";
import { useState } from "react";
// const settings = ["Profile", "Account", "Dashboard", "Logout"];

function Navbar() {
  const settings = [{ title: "Profile", path: "/Profile" }];
  const { studentToken, navigate, setStudentToken, student } =
    useContext(StContext);
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPosition = window.pageYOffset;
      setScrollPosition(currentScrollPosition);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  var pages = [];
  const basic = [
    { title: "Home", path: "/" },
    { title: "About", path: "/About" },
    { title: "Feedback", path: "/Feedback" },
  ];
  const all = [
    { title: "Home", path: "/" },
    { title: "About", path: "/About" },
    { title: "Feedback", path: "/Feedback" },
    { title: "Job Posts", path: "/Posts" },
    { title: "Material", path: "/Materials" },
  ];

  pages = studentToken ? all : basic;

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleLogout = async () => {
    alert("Logged out!");
    localStorage.removeItem("StudentToken");
    localStorage.removeItem("loggedInStudent");
    setStudentToken(null);
    setTimeout(() => {
      navigate("/Login");
    }, 1000);
  };
  return (
    <AppBar
      elevation={3}
      position={scrollPosition > 50 ? "fixed" : "static"}
      sx={{
        backgroundColor: "#222a45f5",
        p: { xs: 1, sm: 2 },
        borderBottomLeftRadius: scrollPosition > 50 && "50px",
        borderBottomRightRadius: scrollPosition > 50 && "50px",
        transition: "all 0.5s ease-in-out",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}>
            <img src={logo} style={{ width: "30px" }} />
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Yuwa
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page, index) => (
                <MenuItem
                  component={Link}
                  to={page.path}
                  key={index}
                  onClick={handleCloseNavMenu}
                >
                  <Typography textAlign="center">{page.title}</Typography>
                </MenuItem>
              ))}
              {!studentToken && (
                <MenuItem
                  component={Link}
                  to={"/Login"}
                  onClick={handleCloseNavMenu}
                >
                  <Typography textAlign="center">Login</Typography>
                </MenuItem>
              )}
            </Menu>
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}>
            <img src={logo} style={{ width: "30px" }} />
          </Box>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Yuwa
          </Typography>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              // backgroundColor: "red",
              justifyContent: "center",
              alignItems: "center",
              gap: "5%",
            }}
          >
            {pages.map((page, index) => (
              <Typography
                component={Link}
                to={page.path}
                className="link"
                key={index}
                onClick={handleCloseNavMenu}
                style={{
                  my: 2,
                  color: "white",
                  display: "block",
                  fontWeight: "bolder",
                }}
              >
                {page.title}
              </Typography>
            ))}

            {!studentToken && (
              <Typography
                component={Link}
                to={"/Login"}
                className="link"
                style={{
                  my: 2,
                  color: "white",
                  display: "block",
                }}
              >
                Login
              </Typography>
            )}
          </Box>
          {studentToken && (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "2%",
                  }}
                >
                  {/* {console.log(student)} */}
                  <Typography sx={{ p: 2, fontWeight: "bolder" }}>
                    {student?.name}
                  </Typography>
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar
                      alt={student?.name}
                      src={`http://localhost:7000/uploads/student/${student?.profile}`}
                    />
                  </IconButton>
                </Box>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting, index) => (
                  <MenuItem
                    component={Link}
                    to={setting.path}
                    key={index}
                    onClick={handleCloseUserMenu}
                  >
                    <Typography textAlign="center">{setting.title}</Typography>
                  </MenuItem>
                ))}
                <Divider />
                <MenuItem onClick={handleLogout}>
                  <Typography textAlign="center">Logout</Typography>
                </MenuItem>
              </Menu>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;
