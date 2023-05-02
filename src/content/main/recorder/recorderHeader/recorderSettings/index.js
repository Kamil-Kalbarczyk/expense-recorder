import * as React from "react";
import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../../../../contexts/auth/AuthContext";
import { ProjectsContext } from "../../../../../contexts/projects/ProjectsContext";
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
import Alert from "@mui/material/Alert";
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

  const isAuthorization = useContext(AuthContext);
  const userID = isAuthorization.authorization.uid;
  const { projects, setProjects } = useContext(ProjectsContext);
  const recorders = projects;

  const [newRecorderName, setNewRecorderName] = useState("");
  const [error, setError] = useState("");
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);

  const { projectID } = useParams();

  const handleClickOpen = () => {
    setNewRecorderName(project_name);
    setOpen(true);
  };

  const handleClose = () => {
    setError("");
    setNewRecorderName(project_name);
    setOpen(false);
  };

  const handleDeleteClick = () => {
    setDeleteConfirmOpen(true);
  };

  const handleRecordNameChange = (e) => {
    e.preventDefault();
    setNewRecorderName(e.target.value);
  };

  const handleRecordNameSave = (e) => {
    e.preventDefault();

    if (newRecorderName.length > 0) {
      if (newRecorderName === project_name) {
        handleClose();
      } else {
        let errorText = "";
        recorders.forEach((recorder) => {
          if (recorder.project_name === newRecorderName) {
            errorText = "Project with this name already exists!";
            setError(errorText);
          }
        });

        if (errorText.length === 0) {
          changeRecorderName(projectID, newRecorderName, userID, setProjects);
          handleClose();
        }
      }
    }
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
          <Form onSubmit={handleRecordNameSave}>
            <TextField
              id="standard-basic"
              label="Recorder"
              variant="standard"
              value={newRecorderName}
              onChange={handleRecordNameChange}
            />
            <Button
              disabled={newRecorderName === project_name ? true : false}
              color="success"
              variant="contained"
              type="submit"
              startIcon={<SaveIcon />}
              // onClick={handleRecordNameSave}
            >
              Save
            </Button>
            {error ? (
              <Alert variant="filled" severity="error">
                {error}
              </Alert>
            ) : (
              <></>
            )}
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
