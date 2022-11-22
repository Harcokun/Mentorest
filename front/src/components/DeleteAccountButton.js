import axios from "axios";
import React from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../hooks/UserContext";

const DeleteAccountButton = ({ userId, token }) => {
  // const { setUsername, setPassword, Token, setToken } = useContext(UserContext);
  const navigate = useNavigate();

  const handleDelete = (e) => {
    e.preventDefault();
    try {
      axios({
        method: "post",
        url: process.env.REACT_APP_REST_API + "/user/delete",
        headers: { Authorization: "Bearer " + token },
      }).then((res) => {
        console.log(res);
        localStorage.removeItem("userData");
        localStorage.removeItem("token");
        localStorage.setItem("navBarState", "login");
        localStorage.setItem("loginState", "logout");
        navigate("/login", { replace: true });
      });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <button
      className=" text-[#8157A1] border-2 border-[#8157A1] hover:bg-[#8157A1] hover:text-white px-4 sm:px-10 p-2 rounded-md"
      onClick={handleDelete}
    >
      ลบบัญชี
    </button>
  );
};

export default DeleteAccountButton;
