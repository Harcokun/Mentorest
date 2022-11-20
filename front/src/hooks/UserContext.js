import { createContext, useContext, useState } from "react";

export const UserContext = createContext();
const UserProvider = ({ children }) => {
  const [Username, setUsername] = useState("as");
  const [Password, setPassword] = useState("");
  const [Token, setToken] = useState("");
  const [usertype, setUsertype] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [profile, setProfile] = useState("");
  const [CitizenID, setCitizenID] = useState("");
  const [BankID, setBankID] = useState("");
  const [Citizenfile, setCitizenfile] = useState("");
  const [Bankfile, setBankfile] = useState("");
  const [Yourself, setYourself] = useState("");
  const [price, setPrice] = useState("");
  const [datetime, setDatetime] = useState("");
  return (
    <UserContext.Provider
      value={{
        Username,
        setUsername,
        Password,
        setPassword,
        Token,
        setToken,
        name,
        setName,
        surname,
        setSurname,
        profile,
        setProfile,
        CitizenID,
        setCitizenID,
        BankID,
        setBankID,
        Citizenfile,
        setCitizenfile,
        Bankfile,
        setBankfile,
        Yourself,
        setYourself,
        price,
        setPrice,
        datetime,
        setDatetime,
        usertype,
        setUsertype,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
