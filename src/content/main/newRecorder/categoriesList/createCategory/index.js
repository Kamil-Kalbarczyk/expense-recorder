import { useState, useContext } from "react";
import { AuthContext } from "../../../../../contexts/auth/AuthContext";
import { createNewCategory } from "./createNewCategory";
import Menu from "@mui/material/Menu";
import { FormControl } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";

export const CreateCategory = ({ categories, setCategories }) => {
  const isAuthorization = useContext(AuthContext);
  const userID = isAuthorization.authorization.uid;
  const [anchorEl, setAnchorEl] = useState(null);
  const [newCategory, setNewCategory] = useState("");
  const [error, setError] = useState("");

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
    // clear input with new category name
    setNewCategory("");
    setError("");
  };

  const handleNewCategoryNameChange = (e) => {
    setNewCategory(e.target.value);
  };

  const handleNewCategoryClick = async (e) => {
    e.preventDefault();
    let errorText = "";

    categories.forEach((category) => {
      if (category.category.toLowerCase() === newCategory.toLowerCase()) {
        console.log("taki sam");
        errorText = "This category already exists!";
        setError(errorText);
        return;
      }
    });
    if (errorText.length === 0) {
      const addedCategory = await createNewCategory(userID, newCategory);
      // console.log("addedCategory ==> ", addedCategory);
      setCategories([...categories, addedCategory]);
      // close window
      handleClose();
    }
  };

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        Add new category
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <Box
          sx={{
            padding: 5,
            display: "flex",
            flexDirection: "column",
          }}
          component="form"
        >
          <TextField
            margin="normal"
            required
            id="newCategory"
            label="category name"
            name="newCategory"
            autoFocus
            onChange={handleNewCategoryNameChange}
            value={newCategory}
            variant="standard"
          />
          <Button type="submit" onClick={handleNewCategoryClick}>
            Save
          </Button>
          {error ? (
            <Alert variant="filled" severity="error">
              {error}
            </Alert>
          ) : (
            <></>
          )}
        </Box>
      </Menu>
    </div>
  );
};
