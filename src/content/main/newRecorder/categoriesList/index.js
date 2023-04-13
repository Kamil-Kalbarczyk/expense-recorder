import { List } from "@mui/material";
import { ListItem } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import ListItemText from "@mui/material/ListItemText";
import SettingsIcon from "@mui/icons-material/Settings";
import { Checkbox } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export const CategoriesList = () => {
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
        {[1, 2, 3].map((value) => (
          <ListItem
            key={value}
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
                  defaultChecked
                />
              </div>
            }
          >
            <ListItemText primary={`Line item ${value}`} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};
