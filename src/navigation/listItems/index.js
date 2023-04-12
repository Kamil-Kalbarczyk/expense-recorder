import { useContext, useState } from "react";
import { ProjectsContext } from "../../contexts/projects/ProjectsContext";
import { Link, NavLink } from "react-router-dom";

import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";

export const ListItems = ({ anchor, toggleDrawer }) => {
  const projects = useContext(ProjectsContext).projects;
  const [settingButtons, setSettingButtons] = useState([
    {
      text: "Create new recorder",
      icon: "<SettingsIcon />",
      link: "/",
    },
    {
      text: "Log out",
      icon: "<LogoutIcon />",
      link: "/",
    },
  ]);

  const activeLinkStyle = {
    backgroundColor: "#ddd",
  };

  return (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <Typography
        variant="body1"
        align="center"
        sx={{ fontWeight: "bold", pt: "10px" }}
      >
        Expense recorders:
      </Typography>
      <List>
        {projects.map((project, index) => (
          <ListItem key={project.project_id} disablePadding>
            <ListItemButton
              component={NavLink}
              to={`/grid/${project.project_id}`}
              style={({ isActive }) => (isActive ? activeLinkStyle : undefined)}
            >
              <ListItemIcon>
                <AttachMoneyIcon />
              </ListItemIcon>
              <ListItemText primary={project.project_name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        <ListItem disablePadding>
          <ListItemButton
            component={NavLink}
            to="/new-recorder"
            style={({ isActive }) => (isActive ? activeLinkStyle : undefined)}
          >
            <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary="Create new recorder" />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton
          // component={NavLink}
          // to="/"
          // style={({ isActive }) => (isActive ? activeLinkStyle : undefined)}
          >
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary="Log out" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );
};
