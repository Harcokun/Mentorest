import axios from "axios";
import { useContext, useEffect, useState } from "react";
import {
  NavLink,
  withRouter,
  useHistory,
  useNavigate,
  redirect,
} from "react-router-dom";
import { NavbarContext } from "../hooks/NavbarContext";
import { UserContext } from "../hooks/UserContext";
const Navbar = () => {
  const navigate = useNavigate();
  const { Username, setUsername, setPassword, Token, setToken } =
    useContext(UserContext);
  const { NavState } = useContext(NavbarContext);
  const [toggle, setToggle] = useState(false);

  const [isLoginAble, setLoginAble] = useState(true);
  const [isRegisterAble, setRegisterAble] = useState(true);

  useEffect(() => {
    if (NavState === "login") {
      setLoginAble(false);
      setRegisterAble(true);
    }
    if (NavState === "register") {
      setLoginAble(true);
      setRegisterAble(false);
    }
    if (NavState === "main") {
      setLoginAble(false);
      setRegisterAble(false);
    }
  }, [NavState]);
  return (
    <div className="shadow-lg shadow-gray-300 flex place-content-between">
      <div className="p-4 px-10 font-bold text-[40px] text-[#8157A1]">
        Mentorest
      </div>
      <div className="fixed right-2 top-2 flex place-items-center">
        {Username && (
          <div className="w-full p-4 place-content-center">
            <button
              className="bg-[#8157A1] text-white px-12 p-2 rounded-md"
              onClick={() => {
                setToggle(!toggle);
              }}
            >
              {Username}
            </button>
            {toggle && (
              <div className="border-[#8157A1] border-2 rounded-md bg-white">
                <div className="text-[#8157A1] bg-white hover:bg-[#8157A1]/25 p-2 rounded-t-md flex">
                  ดูโปรไฟล์
                </div>
                <div
                  className="text-[#8157A1] bg-white hover:bg-[#8157A1]/25 p-2 rounded-b-md flex"
                  onClick={() => {
                    navigate("/edit-profile", { replace: true });
                  }}
                >
                  แก้ไขโปรไฟล์
                </div>
                <div
                  className="text-[#8157A1] bg-white hover:bg-[#8157A1]/25 p-2 rounded-b-md flex"
                  onClick={() => {
                    axios
                      .post(process.env.REACT_APP_REST_API + "/auth/signout", {
                        token: Token,
                      })
                      .then((res) => {
                        setUsername("");
                        setPassword("");
                        setToken("");
                        navigate("/login", { replace: true });
                      });
                  }}
                >
                  ออกจากระบบ
                </div>
              </div>
            )}
          </div>
        )}
        {isLoginAble && (
          <div className="p-4 flex place-content-center">
            <button
              className="text-[#8157A1] bg-white px-10 p-2 border-2 border-[#8157A1] rounded-md"
              onClick={() => {
                console.log(redirect);
                return navigate("/login", { replace: true });
              }}
            >
              เข้าสู่ระบบ
            </button>
          </div>
        )}
        {isRegisterAble && (
          <div className="p-4 flex place-content-center">
            <button
              className="bg-[#8157A1] text-white px-10 p-2 rounded-md"
              onClick={() => {
                console.log(redirect);
                return navigate("/register/mentee", { replace: true });
              }}
            >
              สมัครสมาชิก
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
