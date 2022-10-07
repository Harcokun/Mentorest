import { createContext, useState } from "react";

export const NavbarContext = createContext();

const NavbarProvider = ({ children }) => {
  const [NavState, setState] = useState("");
  return (
    <NavbarContext.Provider value={{ NavState, setState }}>
      {children}
    </NavbarContext.Provider>
  );
};

export default NavbarProvider;
