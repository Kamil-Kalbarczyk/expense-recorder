import styled from "styled-components";
import { Typography } from "@mui/material";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import SettingsIcon from "@mui/icons-material/Settings";

const Toolbar = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 10px;
`;

export const RecorderHeader = ({ project_name }) => {
  return (
    <Toolbar>
      <Typography variant="h6" sx={{ ml: 2, flexGrow: 1 }}>
        Recorder {project_name}
      </Typography>
      <Stack direction="row" spacing={2}>
        {/* <Button color="error" variant="" startIcon={<DeleteIcon />}>
          Delete
        </Button> */}
        <Button variant="outlined" startIcon={<SettingsIcon />}>
          Options
        </Button>
      </Stack>
    </Toolbar>
  );
};
