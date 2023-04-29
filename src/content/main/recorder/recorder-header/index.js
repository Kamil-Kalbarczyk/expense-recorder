import Box from "@mui/material/Box";
import { Typography } from "@mui/material";

export const RecorderHeader = ({ project_name }) => {
  return (
    <Typography variant="h6" sx={{ ml: 2 }}>
      Recorder {project_name}
    </Typography>
  );
};
