import { List } from "@mui/material";
import { ListItem } from "@mui/material";
import IconButton from "@mui/material/IconButton";
// import CommentIcon from "@mui/material/CommentIcon";
import ListItemText from "@mui/material/ListItemText";
import SettingsIcon from "@mui/icons-material/Settings";
import { Checkbox } from "@mui/material";

export const CategoriesList = () => {
  return (
    <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
      {[1, 2, 3].map((value) => (
        <ListItem
          key={value}
          disableGutters
          secondaryAction={
            // <IconButton aria-label="comment">
            //   <SettingsIcon />
            // </IconButton>
            <Checkbox
              //   value="checkedA"
              //   inputProps={{
              //     "aria-label": "Checkbox A",
              //   }}
              defaultChecked
            />
          }
        >
          <ListItemText primary={`Line item ${value}`} />
        </ListItem>
      ))}
    </List>
  );
};
