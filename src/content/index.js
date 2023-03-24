import { GridExpenses } from "./expenseGrid";
import { Login } from "../login";
import { useContext } from "react";
import { AuthContext } from "../contexts/auth/AuthContext";

export const Content = () => {
  const isAuthorization = useContext(AuthContext);
  if (isAuthorization.authorization) {
    return <GridExpenses />;
  } else {
    return <Login />;
  }
};
