import axios from "axios";
import React from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../hooks/UserContext";

const DeleteAccountButton = ({ prop }) => {
  const { setUsername, setPassword, Token, setToken } = useContext(UserContext);
  const navigate = useNavigate();

  const handleDelete = (e) => {
    e.preventDefault();
    let config = {
      headers: {
        Authorization: "Bearer " + Token,
      },
    };
    axios
      .post(process.env.REACT_APP_REST_API + "/user/delete", config)
      .then((res) => {
        setUsername("");
        setPassword("");
        setToken("");
        navigate("/login", { replace: true });
      });
  };
  return (
    <button
      className=" text-[#8157A1] border-2 border-[#8157A1] hover:bg-[#8157A1] hover:text-white px-10 p-2 rounded-md"
      onClick={handleDelete}
    >
      ลบบัญชี
    </button>
  );
};

export default DeleteAccountButton;
