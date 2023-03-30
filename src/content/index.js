import { Navigation } from "../navigation";
import { GridExpenses } from "./expenseGrid";
import { Login } from "../login";
import { ProjectsContextProvider } from "../contexts/projects/ProjectsContext";
// import { CheckProjectExists } from "../common/checkProjectExists";
import { useContext } from "react";
import { AuthContext } from "../contexts/auth/AuthContext";
import { ProjectsContext } from "../contexts/projects/ProjectsContext";

export const Content = () => {
  const isAuthorization = useContext(AuthContext);
  const projects = useContext(ProjectsContext);
  if (isAuthorization.authorization) {
    return (
      <ProjectsContextProvider>
        <Navigation />
        {/* <CheckProjectExists /> */}
        <GridExpenses />
      </ProjectsContextProvider>
    );
  } else {
    return <Login />;
  }
};
