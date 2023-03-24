import { GridExpenses } from "./expenseGrid";
import { Login } from "../login";
import { useContext } from "react";
import { AuthContext } from "../contexts/auth/AuthContext";

export const Content = () => {
  const isAuthorization = useContext(AuthContext);
  console.log(isAuthorization);
  if (isAuthorization.authorization) {
    return <div>Hello World!</div>;
  } else {
    return <div>Goodbye!!</div>;
  }
};
