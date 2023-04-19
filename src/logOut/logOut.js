// import { app } from "../firebase";
import { getAuth, signOut } from "firebase/auth";

export const logOut = async () => {
  const auth = getAuth();
  signOut(auth)
    .then(() => {
      // Sign-out successful.
    })
    .catch((error) => {
      console.error(error);
    });
};
