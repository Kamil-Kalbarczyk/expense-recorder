import * as React from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import DeleteIcon from "@mui/icons-material/Delete";
import SettingsIcon from "@mui/icons-material/Settings";
import SaveIcon from "@mui/icons-material/Save";
import TextField from "@mui/material/TextField";
import { Typography } from "@mui/material";
import Divider from "@mui/material/Divider";
import { DeleteConfirm } from "./deleteConfirm";

import { changeRecorderName } from "./changeRecorderName";

const DialogFlexContent = styled(DialogContent)`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: center;
  // align-items: center;
  gap: 20px;
  width: 380px;
`;

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
`;

const FlexRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const RecorderSettings = ({ project_name }) => {
  const [open, setOpen] = useState(false);

  const [recordNewName, setRecordNewName] = useState("");
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);

  const { projectID } = useParams();

  const handleClickOpen = () => {
    setRecordNewName(project_name);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDeleteClick = () => {
    setDeleteConfirmOpen(true);
  };

  const handleRecordNameChange = (e) => {
    setRecordNewName(e.target.value);
  };

  const handleRecordNameSave = () => {
    console.log(recordNewName);
    changeRecorderName(projectID, recordNewName);
    handleClose();
    setRecordNewName(project_name);
  };

  return (
    <div>
      <Button
        variant="outlined"
        startIcon={<SettingsIcon />}
        onClick={handleClickOpen}
      >
        Settings
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>Recorder settings</DialogTitle>
        <DialogFlexContent>
          <Form>
            <TextField
              id="standard-basic"
              label="Recorder"
              variant="standard"
              value={recordNewName}
              onChange={handleRecordNameChange}
            />
            <Button
              color="success"
              variant="contained"
              startIcon={<SaveIcon />}
              onClick={handleRecordNameSave}
            >
              Save
            </Button>
          </Form>
          <Divider />
          <FlexRow>
            <Typography>Delete this recorder?</Typography>
            <div>
              <Button
                color="error"
                variant="contained"
                startIcon={<DeleteIcon />}
                onClick={handleDeleteClick}
              >
                Delete
              </Button>
              <DeleteConfirm
                open={deleteConfirmOpen}
                setOpen={setDeleteConfirmOpen}
              />
            </div>
          </FlexRow>
        </DialogFlexContent>
      </Dialog>
    </div>
  );
};
