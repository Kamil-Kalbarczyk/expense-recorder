import * as React from "react";
import Button from "@mui/material/Button";
import Slide from "@mui/material/Slide";
import { ConfirmWindow } from "./ConfirmWindow";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Slide in alert dialog
      </Button>
      <ConfirmWindow
        open={open}
        Transition={Transition}
        handleClose={handleClose}
      />
    </div>
  );
}
