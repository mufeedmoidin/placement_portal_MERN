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
import StyleIcon from "@mui/icons-material/Style";
import ImageIcon from "@mui/icons-material/Image";
import FeaturedPlayListIcon from "@mui/icons-material/FeaturedPlayList";
import WebhookIcon from "@mui/icons-material/Webhook";
import SettingsSystemDaydreamIcon from "@mui/icons-material/SettingsSystemDaydream";
import HomeIcon from "@mui/icons-material/Home";
import AltRouteIcon from "@mui/icons-material/AltRoute";
import ListIcon from "@mui/icons-material/List";
import { Link } from "react-router-dom";
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
  let sideOptions = [
    {
      title: "Styling",
      icon: <StyleIcon />,
      options: [
        {
          option: "CSS",
          nav: "/Styling/css",
        },
        {
          option: "Handling Image",
          nav: "/Styling/image",
        },
      ],
    },
    {
      title: "ES6",
      icon: <FeaturedPlayListIcon />,
      options: [
        {
          option: "Arrow Function",
          nav: "/ES6/arrowFunction",
        },
        {
          option: "Variables",
          nav: "/ES6/variables",
        },
        {
          option: "Array Methods",
          nav: "/ES6/map",
        },
        {
          option: "Destructure",
          nav: "/ES6/destructure",
        },
        {
          option: "Spread Operator",
          nav: "/ES6/spread",
        },
        {
          option: "Ternary",
          nav: "/ES6/ternary",
        },
        {
          option: "Modules",
          nav: "/ES6/modules",
        },
      ],
    },
    {
      title: "Hooks",
      icon: <WebhookIcon />,
      options: [
        {
          option: "UseState",
          nav: "/Hooks/useState",
        },
        {
          option: "UseEffect",
          nav: "/Hooks/useEffect",
        },
      ],
    },
    {
      title: "Local Storage",
      icon: <SettingsSystemDaydreamIcon />,
      options: [
        {
          option: "Introduction",
          nav: "/LocalStorage",
        },
        {
          option: "Methods",
          nav: "/LocalStorage/methods",
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

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
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
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            React Syllabus
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          <ListItem disablePadding>
            <ListItemButton component={Link} to="/">
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component={Link} to="/Installation">
              <ListItemIcon>
                <InstallDesktopIcon />
              </ListItemIcon>
              <ListItemText primary="Installation" />
            </ListItemButton>
          </ListItem>
          {sideOptions.map((text, index) => (
            <React.Fragment key={index}>
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
                      component={Link}
                      to={opt.nav}
                      sx={{ pl: 4 }}
                    >
                      {console.log(opt)}
                      <ListItemText primary={opt.option} />
                    </ListItemButton>
                  ))}
                </List>
              </Collapse>
            </React.Fragment>
          ))}

          <ListItem disablePadding>
            <ListItemButton component={Link} to="/Routes">
              <ListItemIcon>
                <AltRouteIcon />
              </ListItemIcon>
              <ListItemText primary="Routing" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component={Link} to="/Props">
              <ListItemIcon>
                <ListIcon />
              </ListItemIcon>
              <ListItemText primary="Props" />
            </ListItemButton>
          </ListItem>
        </List>
        {/* <Divider /> */}
        {/* <List>
          {["All mail", "Trash", "Spam"].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List> */}
      </Drawer>
      <Main open={open}></Main>
    </Box>
  );
}
