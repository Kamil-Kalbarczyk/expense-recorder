import { useState, useContext } from "react";
import { AuthContext } from "../../../contexts/auth/AuthContext";
import { ProjectsContext } from "../../../contexts/projects/ProjectsContext";
import { CategoriesList } from "./categoriesList";
import { createNewRecorder } from "./createRecorder";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Alert from "@mui/material/Alert";

export const NewRecorder = () => {
  const isAuthorization = useContext(AuthContext);
  const userID = isAuthorization.authorization.uid;
  const recorders = useContext(ProjectsContext).projects;
  const setProjects = useContext(ProjectsContext).setProjects;

  const [newRecorderName, setNewRecorderName] = useState("");
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState("");

  const handleNewRecorderNameChange = (e) => {
    setNewRecorderName(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newRecorderName.length > 0) {
      let errorText = "";
      recorders.forEach((recorder) => {
        if (recorder.project_name === newRecorderName) {
          errorText = "Project with this name already exists!";
          setError(errorText);
        }
      });

      if (errorText.length === 0) {
        const activeCategories = categories.filter(
          (category) => category.active
        );
        const activeCategoryIds = activeCategories.map(
          (category) => category.id
        );
        await createNewRecorder(
          userID,
          newRecorderName,
          activeCategoryIds,
          setProjects
        );
      }
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Create new expense recorder
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          noValidate
          sx={{ mt: 1, width: "90%" }}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            id="name"
            label="name"
            name="name"
            // autoComplete="name"
            autoFocus
            onChange={handleNewRecorderNameChange}
            value={newRecorderName}
          />
          <CategoriesList
            categories={categories}
            setCategories={setCategories}
          />
          <Button
            disabled={newRecorderName.length > 0 ? false : true}
            type="submit"
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Create
          </Button>
        </Box>
        {error ? (
          <Alert variant="filled" severity="error">
            {error}
          </Alert>
        ) : (
          <></>
        )}
      </Box>
    </Container>
  );
};
