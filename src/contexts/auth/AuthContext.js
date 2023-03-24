import { createContext, useState } from "react";

export const AuthContext = createContext(null);

export const AuthContextProvider = ({ children }) => {
  const [authorization, setAuthorization] = useState(null);

  return (
    <AuthContext.Provider
      value={{
        authorization,
        setAuthorization,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
