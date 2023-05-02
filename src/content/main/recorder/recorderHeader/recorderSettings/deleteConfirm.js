import { app } from "../../../../../firebase";
import {
  getFirestore,
  doc,
  deleteDoc,
  collection,
  addDoc,
  Timestamp,
  query,
  where,
  getDocs,
  orderBy,
  limit,
} from "firebase/firestore";
import { useContext } from "react";
import { AuthContext } from "../../../../../contexts/auth/AuthContext";
import { ProjectsContext } from "../../../../../contexts/projects/ProjectsContext";
import { useParams, useNavigate } from "react-router-dom";
import { convertTimestampToDate } from "../../../../../common/functions";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const db = getFirestore(app);

export const DeleteConfirm = ({ open, setOpen, closeSettingsWindow }) => {
  const isAuthorization = useContext(AuthContext);
  const userID = isAuthorization.authorization.uid;
  const recorders = useContext(ProjectsContext).projects;
  const setProjects = useContext(ProjectsContext).setProjects;
  const navigate = useNavigate();
  const { projectID } = useParams();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const getProject = async (db, userID, setProjects) => {
    const q = query(
      collection(db, "projects"),
      where("userID", "==", userID),
      orderBy("create_date", "desc", limit(12))
    );

    const querySnapshot = await getDocs(q);
    setProjects(
      querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        project_id: doc.id,
        period_from: convertTimestampToDate(doc.data()?.period_from?.seconds),
        period_to: convertTimestampToDate(doc.data()?.period_to?.seconds),
      }))
    );
  };

  const handleDeleteRecorder = async () => {
    // delete recorder
    await deleteDoc(doc(db, "projects", projectID));
    // close confirm window
    handleClose();
    // close settings modal window
    closeSettingsWindow();
    // fetch current list of recorders
    getProject(db, userID, setProjects);
    // navigate to main page
    navigate("/");
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{"Delete recorder"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Are you sure you want to delete this recorder? All expenses entered in
          it will be deleted and you will not be able to recover them.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button color="success" variant="contained" onClick={handleClose}>
          Cancel
        </Button>
        <Button
          color="error"
          variant="contained"
          onClick={handleDeleteRecorder}
          autoFocus
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};
