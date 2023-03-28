import { GridExpenses } from "./expenseGrid";
import { Login } from "../login";
import { CheckProjectExists } from "../common/checkProjectExists";
import { useContext } from "react";
import { AuthContext } from "../contexts/auth/AuthContext";

export const Content = () => {
  const isAuthorization = useContext(AuthContext);
  if (isAuthorization.authorization) {
    return (
      <>
        <CheckProjectExists />
        <GridExpenses />
      </>
    );
  } else {
    return <Login />;
  }
};
