import { createContext, useState } from "react";

export const UserContext = createContext();

export const UsernameContextProvider = ({ children }) => {
  const [value, setValue] = useState();

  return (
    <UserContext.Provider value={{ value, setValue }}>
      {children}
    </UserContext.Provider>
  );
};
