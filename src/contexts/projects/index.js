import { createContext, useState } from "react";

export const ProjectsContext = createContext(null);

export const ProjectsContextProvider = ({ children }) => {
  const [projects, setProjects] = useState(null);

  return (
    <ProjectsContext.Provider value={{ projects, setProjects }}>
      {children}
    </ProjectsContext.Provider>
  );
};
