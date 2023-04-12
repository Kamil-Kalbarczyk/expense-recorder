import { useContext } from "react";
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
        {["All mail", "Trash", "Spam"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <SettingsIcon /> : <LogoutIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};
