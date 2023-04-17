import { CreateCategory } from "./createCategory";
import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../../../contexts/auth/AuthContext";
import { fetchCategories } from "./fetchCategories";
import { List } from "@mui/material";
import { ListItem } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import ListItemText from "@mui/material/ListItemText";
import SettingsIcon from "@mui/icons-material/Settings";
import { Checkbox } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export const CategoriesList = ({ categories, setCategories }) => {
  const isAuthorization = useContext(AuthContext);
  const userID = isAuthorization.authorization.uid;
  useEffect(() => {
    fetchCategories(userID).then((data) => {
      setCategories(data);
    });
  }, [userID]);

  const handleCheckboxChange = (id, active) => {
    const currentCategory = categories.filter(
      (category) => category.id === id
    )[0];

    currentCategory.active = active;

    const allCategories = categories.filter((category) => category.id !== id);
    allCategories.push(currentCategory);

    function keepingOrdering(a, b) {
      if (a.create_date < b.create_date) {
        return -1;
      }
      if (a.create_date > b.create_date) {
        return 1;
      }
      return 0;
    }

    allCategories.sort(keepingOrdering);

    setCategories(allCategories);
  };

  return (
    <Box>
      <Typography
        sx={{ textAlign: "center", mt: 1, padding: 0 }}
        variant="subtitle1"
      >
        Categories:
      </Typography>
      <List
        sx={{
          width: "100%",
          maxWidth: 300,
          bgcolor: "background.paper",
          margin: "0 auto",
          padding: 0,
        }}
      >
        {categories.map(({ id, active, category }) => (
          <ListItem
            key={id}
            disableGutters
            secondaryAction={
              <div>
                {/* setting option is hiding in comment, but maybe it will be necessary to bring it back in the future. */}
                {/* <IconButton
                  aria-label="settings"
                  onClick={(e) => {
                    console.log(e);
                  }}
                >
                  <SettingsIcon />
                </IconButton> */}
                <Checkbox
                  onChange={(e) => {
                    const checkedValue = e.target.checked;
                    handleCheckboxChange(id, checkedValue);
                  }}
                  checked={active}
                />
              </div>
            }
          >
            <ListItemText primary={category} />
          </ListItem>
        ))}
      </List>
      <CreateCategory categories={categories} setCategories={setCategories} />
    </Box>
  );
};
