import { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import { ListItems } from "./listItems";

export const Navigation = () => {
  const [navigationState, setNavigationState] = useState(false);

  const toggleDrawer = (anchor, open) => (event) => {
    setNavigationState(open);
  };

  // const list = (anchor) => (
  //   <Box
  //     sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
  //     role="presentation"
  //     onClick={toggleDrawer(anchor, false)}
  //     onKeyDown={toggleDrawer(anchor, false)}
  //   >
  //     <Typography
  //       variant="body1"
  //       align="center"
  //       sx={{ fontWeight: "bold", pt: "10px" }}
  //     >
  //       Recorded expenses:
  //     </Typography>
  //     <List>
  //       {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
  //         <ListItem key={text} disablePadding>
  //           <ListItemButton>
  //             <ListItemIcon>
  //               <AttachMoneyIcon />
  //             </ListItemIcon>
  //             <ListItemText primary={text} />
  //           </ListItemButton>
  //         </ListItem>
  //       ))}
  //     </List>
  //     <Divider />
  //     <List>
  //       {["All mail", "Trash", "Spam"].map((text, index) => (
  //         <ListItem key={text} disablePadding>
  //           <ListItemButton>
  //             <ListItemIcon>
  //               {index % 2 === 0 ? <SettingsIcon /> : <LogoutIcon />}
  //             </ListItemIcon>
  //             <ListItemText primary={text} />
  //           </ListItemButton>
  //         </ListItem>
  //       ))}
  //     </List>
  //   </Box>
  // );

  return (
    <div>
      <Button
        sx={{ fontWeight: "bold" }}
        variant="outlined"
        onClick={toggleDrawer("left", true)}
      >
        <MenuIcon />
      </Button>
      <Drawer
        anchor={"left"}
        open={navigationState}
        onClose={toggleDrawer("left", false)}
      >
        {/* {list("left")} */}
        <ListItems anchor={"left"} toggleDrawer={toggleDrawer} />
      </Drawer>
    </div>
  );
};
