import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import InstallDesktopIcon from "@mui/icons-material/InstallDesktop";
import ChatIcon from "@mui/icons-material/Chat";
import GroupsIcon from "@mui/icons-material/Groups";
import StyleIcon from "@mui/icons-material/Style";
import ImageIcon from "@mui/icons-material/Image";
import FeaturedPlayListIcon from "@mui/icons-material/FeaturedPlayList";
import WebhookIcon from "@mui/icons-material/Webhook";
import SettingsSystemDaydreamIcon from "@mui/icons-material/SettingsSystemDaydream";
import HomeIcon from "@mui/icons-material/Home";
import AltRouteIcon from "@mui/icons-material/AltRoute";
import ListIcon from "@mui/icons-material/List";
import sbg from "../../assets/sbg.jpg";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import AccountMenu from "../Menu/Menu";
import { useContext } from "react";
import { AdContext } from "../../Context/AdminContext";
const drawerWidth = 240;
const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export default function PersistentDrawerLeft({ open, setOpen }) {
  const { admin } = useContext(AdContext);
  let sideOptions = [
    {
      title: "Placement",
      icon: <StyleIcon sx={{ color: "white" }} />,
      options: [
        {
          option: "Post New",
          nav: "Placement/Post",
        },
        {
          option: "View All",
          nav: "Placement/View",
        },
      ],
    },
    {
      title: "Material",
      icon: <FeaturedPlayListIcon sx={{ color: "white" }} />,
      options: [
        {
          option: "Post New",
          nav: "Material/Post",
        },
        {
          option: "View All",
          nav: "Material/View",
        },
      ],
    },
  ];
  const theme = useTheme();

  const [openSections, setOpenSections] = React.useState({
    Installation: false,
    CSS: false,
    Image: false,
    ES6: false,
    Hooks: false,
    LocalStorage: false,
  });
  // console.log(open);
  const handleDrawerOpen = () => {
    localStorage.setItem("sideBar", true);
    setOpen(true);
  };

  const handleDrawerClose = () => {
    localStorage.setItem("sideBar", false);
    setOpen(false);
  };

  const handleToggle = (section) => {
    setOpenSections((prevState) => ({
      ...prevState,
      [section]: !prevState[section],
    }));
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        sx={{
          backgroundImage: `linear-gradient(rgba(34, 42, 69, 0.96), rgba(34, 42, 69, 0.96)), url(${sbg})`,
        }}
        position="fixed"
        open={open}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Box
              sx={{
                width: "20%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {" "}
              <img src={logo} alt="" style={{ width: "30px" }} />
            </Box>
            <Box
              sx={{
                width: "160%",
              }}
            >
              <Typography
                fontFamily={"Poppins"}
                variant="h6"
                noWrap
                component="div"
              >
                Yuva Placements
              </Typography>
            </Box>

            <Box
              sx={{
                width: "25%",
                display: { xs: open ? "none" : "flex", sm: "flex" },
                justifyContent: "flex-end",
                alignItems: "center",
              }}
            >
              <AccountMenu />
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            backgroundImage: `linear-gradient(rgba(34, 42, 69, 0.96), rgba(34, 42, 69, 0.96)), url(${sbg})`,
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon sx={{ color: "white" }} />
            ) : (
              <ChevronRightIcon sx={{ color: "white" }} />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List sx={{ color: "white" }}>
          <ListItem disablePadding>
            <ListItemButton component={Link} to="/admin/Dashboard">
              <ListItemIcon>
                <HomeIcon sx={{ color: "white" }} />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component={Link} to="Students">
              <ListItemIcon>
                <GroupsIcon sx={{ color: "white" }} />
              </ListItemIcon>
              <ListItemText primary="Students" />
            </ListItemButton>
          </ListItem>
          {sideOptions.map((text, index) => (
            <React.Fragment key={text?.title}>
              <ListItem disablePadding>
                <ListItemButton onClick={() => handleToggle(index)}>
                  <ListItemIcon>{text.icon}</ListItemIcon>
                  <ListItemText primary={text?.title} />
                  {openSections[index] ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
              </ListItem>
              <Collapse in={openSections[index]} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {text.options?.map((opt, index2) => (
                    <ListItemButton
                      key={index2}
                      component={Link}
                      to={opt.nav}
                      sx={{ pl: 4 }}
                    >
                      <ListItemText primary={opt.option} />
                    </ListItemButton>
                  ))}
                </List>
              </Collapse>
            </React.Fragment>
          ))}
          <ListItem disablePadding>
            <ListItemButton component={Link} to="Feedbacks">
              <ListItemIcon>
                <ChatIcon sx={{ color: "white" }} />
              </ListItemIcon>
              <ListItemText primary="Feedbacks" />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
      <Main open={open}></Main>
    </Box>
  );
}
