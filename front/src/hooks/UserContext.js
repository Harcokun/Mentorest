import { createContext, useContext, useState } from "react";

export const UserContext = createContext();
const UserProvider = ({ children }) => {
  const [Username, setUsername] = useState("");
  const [Password, setPassword] = useState("");
  const [Token, setToken] = useState("");
  return (
    <UserContext.Provider
      value={{ Username, setUsername, Password, setPassword, Token, setToken }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
