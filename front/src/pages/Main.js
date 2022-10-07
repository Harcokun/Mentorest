import axios from "axios";
import { useContext, useEffect } from "react";
import TextForm from "../components/TextForm";
import { NavbarContext } from "../hooks/NavbarContext";
import { UserContext } from "../hooks/UserContext";

const Main = () => {
  const { Username, setUsername, Password, setPassword, Token, setToken } =
    useContext(UserContext);
  const { setState } = useContext(NavbarContext);
  const handleSubmit = (e) => {
    console.log(e.target[0].value, e.target[1].value);

    console.log(Username, Password, Token);
    console.log(process.env.REACT_APP_REST_API, "yoyo");
    try {
      axios.post(process.env.REACT_APP_REST_API + "/");
    } catch (err) {}
    e.preventDefault();
  };
  useEffect(() => {
    setUsername("aaa");
    setState("main");
  }, []);
  return (
    <div className="w-full h-full">
      <div className="pt-10 py-6 font-bold text-[32px] text-[#8157A1] text-to-[#D27AD3] flex place-items-center place-content-center">
        Mentorest
      </div>
    </div>
  );
};

export default Main;
