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

export const CategoriesList = () => {
  const [categories, setCategories] = useState([]);
  const isAuthorization = useContext(AuthContext);
  const userID = isAuthorization.authorization.uid;
  useEffect(() => {
    fetchCategories(userID).then((data) => {
      setCategories(data);
    });
  }, [userID]);

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
          maxWidth: 360,
          bgcolor: "background.paper",
          margin: 0,
          padding: 0,
        }}
      >
        {categories.map(({ id, active, category }) => (
          <ListItem
            key={id}
            disableGutters
            secondaryAction={
              <div>
                <IconButton
                  aria-label="settings"
                  onClick={(e) => {
                    console.log(e);
                  }}
                >
                  <SettingsIcon />
                </IconButton>
                <Checkbox
                  onChange={(e) => {
                    console.log(e.target.checked);
                  }}
                  // defaultChecked={active ? true : false}
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
