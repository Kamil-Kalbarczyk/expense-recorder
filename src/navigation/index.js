import { ListItems } from "./listItems";
import { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import AlertDialogSlide from "../logOut";

export const Navigation = () => {
  const [navigationState, setNavigationState] = useState(false);

  const toggleDrawer = (anchor, open) => (event) => {
    setNavigationState(open);
  };

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
        <ListItems anchor={"left"} toggleDrawer={toggleDrawer} />
        <AlertDialogSlide />
      </Drawer>
    </div>
  );
};
