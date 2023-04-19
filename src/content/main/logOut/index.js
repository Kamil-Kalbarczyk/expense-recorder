import { getAuth, signOut } from "firebase/auth";
import { AuthContext } from "../../../contexts/auth/AuthContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Wrapper } from "../../../common/wrapper";
import { Typography } from "@mui/material";
import { Button } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";

export const LogOut = () => {
  const { authorization, setAuthorization } = useContext(AuthContext);
  const navigate = useNavigate();

  const logOut = async () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        setAuthorization(null);
      })
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <Wrapper>
      <Typography align="center" variant="body">
        Are you sure you want to log out?
      </Typography>

      <Button
        sx={{
          margin: "0 auto",
        }}
        variant="outlined"
        endIcon={<LogoutIcon />}
        onClick={async () => {
          await logOut();
        }}
      >
        Log out
      </Button>
    </Wrapper>
  );
};
