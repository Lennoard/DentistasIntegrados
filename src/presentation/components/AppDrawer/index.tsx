import { User, getAuth } from "@firebase/auth";
import MenuIcon from "@mui/icons-material/Menu";
import { Avatar, ListItemButton, Slide, useScrollTrigger } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DrawerItem } from "./DrawerItem";
import logo from "./../../images/logo.png";

import "./style.css";
import { primaryDark } from "../../theme/pallete";

const HOME_ROUTE = "/home";

const drawerWidth = 320;

const defaultItems = [
  {
    title: "Home",
    route: "/home",
  } as DrawerItem,
  {
    title: "Cadastro",
    route: "/perfil",
  } as DrawerItem,
  {
    title: "Marcar consulta",
    route: "/nova-consulta",
  } as DrawerItem,
  {
    title: "Consultas",
    route: "/consultas",
  } as DrawerItem,
];

export default function AppDrawer(props: DrawerProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  useEffect(() => {
    getAuth().onAuthStateChanged((user) => setUser(user));
  }, []);

  const drawer = (
    <div>
      {user ? <UserCell user={user} /> : <Toolbar />}
      <List>
        {(props.items ? props.items : defaultItems).map((item, index) => {
          if (props.selectedIndex === index) {
            return (
              <Slide direction="right" in={true} key={item.title}>
                <ListItemButton
                  className={
                    index === props.selectedIndex
                      ? "drawerListItem selected"
                      : "drawerListItem"
                  }
                  key={item.title}
                  onClick={() => navigate(item.route)}
                >
                  <ListItemText primary={item.title} />
                </ListItemButton>
              </Slide>
            );
          } else
            return (
              <ListItemButton
                className={
                  index === props.selectedIndex
                    ? "drawerListItem selected"
                    : "drawerListItem"
                }
                key={item.title}
                onClick={() => navigate(item.route)}
              >
                <ListItemText primary={item.title} />
              </ListItemButton>
            );
        })}
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window.document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <HideOnScroll {...props}>
        <AppBar
          color="transparent"
          position="fixed"
          elevation={0}
          sx={{
            width: { lg: `calc(100% - ${drawerWidth}px)` },
            ml: { lg: `${drawerWidth}px` },
          }}
        >
          <Toolbar>
            <IconButton
              color="primary"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, mt: 2, display: { lg: "none" } }}
            >
              <MenuIcon />
            </IconButton>
            <Box sx={{ width: "100%" }} display="flex" alignItems="center">
              <Typography
                marginTop="16px"
                textAlign="center"
                variant="h4"
                flexGrow={1}
                color={primaryDark}
              >
                {props.title}
              </Typography>
              <img onClick={() => {navigate(HOME_ROUTE)}} style={{ cursor: "pointer" }} width="42px" height="42px" src={logo} alt="Logo" />
            </Box>
            {props.filters}
          </Toolbar>
        </AppBar>
      </HideOnScroll>

      <Box
        component="nav"
        sx={{ width: { lg: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "block", md: "block", lg: "none" },
            "& .MuiDrawer-paper": {
              backgroundColor: "#8DC9FD",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "none", md: "none", lg: "block" },
            "& .MuiDrawer-paper": {
              backgroundColor: "#8DC9FD",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          mt: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        {props.children}
      </Box>
    </Box>
  );
}

function HideOnScroll(props: AppBarProps) {
  const { children } = props;
  const trigger = useScrollTrigger({
    target: window,
    disableHysteresis: true,
    threshold: 0,
  });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

function UserCell(props: UserCellProps) {
  const user = props.user;

  return (
    <Box p={3}>
      <Avatar
        src={user.photoURL || ""}
        sx={{ width: 80, height: 80, margin: "auto" }}
      />
      <Typography variant="h5" marginTop="8px" textAlign="center">
        {user.displayName ? user.displayName : user.email?.split("@")[0]}
      </Typography>
      <Typography variant="body1" textAlign="center" noWrap>
        {user.email}
      </Typography>
    </Box>
  );
}

interface DrawerProp {
  title: string | null;
  items: DrawerItem[] | null;
  selectedIndex: number;
  children: React.ReactElement;
  filters: JSX.Element;
}

interface DrawerProps extends Partial<DrawerProp> {}
interface AppBarProps {
  children: React.ReactElement;
}
interface UserCellProps {
  user: User;
}
