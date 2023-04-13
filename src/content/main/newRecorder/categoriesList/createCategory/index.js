import * as React from "react";
import Menu from "@mui/material/Menu";
import { FormControl } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

export const CreateCategory = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
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
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <Box sx={{ padding: 5, display: "flex", flexDirection: "column" }}>
          <FormControl>
            <TextField
              margin="normal"
              required
              id="newCategory"
              label="category name"
              name="newCategory"
              // autoComplete="name"
              autoFocus
              // onChange={handleChange}
              // value={name}
              variant="standard"
            />
            <Button type="submit">Save</Button>
          </FormControl>
        </Box>
      </Menu>
    </div>
  );
};
