import { useState, useContext } from "react";
import { AuthContext } from "../../../contexts/auth/AuthContext";
import { CategoriesList } from "./categoriesList";
import { createNewRecorder } from "./createRecorder";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
// import { createTheme, ThemeProvider } from "@mui/material/styles";

// const theme = createTheme();

export const NewRecorder = () => {
  const isAuthorization = useContext(AuthContext);
  const userID = isAuthorization.authorization.uid;

  const [newRecorderName, setNewRecorderName] = useState("");

  const handleNewRecorderNameChange = (e) => {
    setNewRecorderName(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createNewRecorder(userID, newRecorderName);
    console.log(newRecorderName);
  };

  return (
    // <ThemeProvider theme={theme}>
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
          <CategoriesList />
          <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
            Create
          </Button>
        </Box>
      </Box>
    </Container>
    // </ThemeProvider>
  );
};
