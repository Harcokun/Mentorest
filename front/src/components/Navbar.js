import axios from "axios";
import { useContext, useEffect, useState } from "react";
import {
  NavLink,
  withRouter,
  useHistory,
  useNavigate,
  redirect,
} from "react-router-dom";
import logo from "../hamburger.png";
import { NavbarContext } from "../hooks/NavbarContext";
import { UserContext } from "../hooks/UserContext";
const Navbar = () => {
  const navigate = useNavigate();
  // const { userId, Username, setUsername, setPassword, Token, setToken, setLogin, position } =
  //   useContext(UserContext);
  // const { NavState } = useContext(NavbarContext);
  const userData = JSON.parse(localStorage.getItem("userData"))
    ? JSON.parse(localStorage.getItem("userData"))
    : localStorage.setItem(
        "userData",
        JSON.stringify({
          id: 0,
          email: "",
          name: "",
          surname: "",
          password: "",
          position: "",
        })
      );
  const token = localStorage.getItem("token")
    ? localStorage.getItem("token")
    : localStorage.setItem("token", "");
  const navBarState = localStorage.getItem("navBarState")
    ? localStorage.getItem("navBarState")
    : "main-not-login|";
  const loginState = localStorage.getItem("loginState")
    ? localStorage.getItem("loginState")
    : localStorage.setItem("loginState", "logout");
  const [toggle, setToggle] = useState(false);
  const [toggleRegister, setToggleRegister] = useState(false);
  const [toggleHam, setToggleHam] = useState(false);

  const [isLoginAble, setLoginAble] = useState(true);
  const [isRegisterAble, setRegisterAble] = useState(true);

  useEffect(() => {
    if (navBarState === "login") {
      setLoginAble(false);
      setRegisterAble(true);
    }
    if (navBarState === "register") {
      setLoginAble(true);
      setRegisterAble(true);
    }
    if (navBarState === "main") {
      setLoginAble(false);
      setRegisterAble(false);
    }
    if (navBarState === "main-not-login") {
      setLoginAble(true);
      setRegisterAble(true);
    }
  }, [navBarState]);
  if (window.innerWidth >= 640) {
    return (
      <div className="shadow-lg shadow-gray-300 flex place-content-between w-full fixed bg-white">
        <div className="p-4 px-10 font-bold text-[40px] text-[#8157A1]">
          <a href="/">Mentorest</a>
        </div>
        <div className="fixed right-2 top-2 flex">
          {loginState === "login" && (
            <div className="w-full p-4 place-content-center">
              <button
                className="bg-[#8157A1] text-white px-12 p-2 rounded-md"
                onClick={() => {
                  setToggle(!toggle);
                }}
              >
                {userData.email}
              </button>
              {toggle && (
                <div className="border-[#8157A1] border-2 rounded-md bg-white">
                  {(userData.position === "user" || userData.position === "mentor") && (<div
                    className="text-[#8157A1] bg-white hover:bg-[#8157A1]/25 p-2 rounded-t-md flex"
                    onClick={() => {
                      if (userData.position === "user")
                        navigate("/booking/mentee", {
                          replace: true,
                        });
                      if (userData.position === "mentor")
                        navigate("/booking/mentor", {
                          replace: true,
                        });
                    }}
                  >
                    รายการการจอง
                  </div>)}
                  <div
                    className="text-[#8157A1] bg-white hover:bg-[#8157A1]/25 p-2 rounded-b-md flex"
                    onClick={() => {
                      if (userData.position === "user")
                        navigate("/user/mentee/edit/" + userData.id, {
                          replace: true,
                        });
                      if (userData.position === "mentor")
                        navigate("/user/mentor/edit/" + userData.id, {
                          replace: true,
                        });
                      // if (userData.position === "admin")
                      //   navigate("/user/admin/edit/" + userData.id, {
                      //     replace: true,
                      //   });
                    }}
                  >
                    แก้ไขโปรไฟล์
                  </div>
                  <div
                    className="text-[#8157A1] bg-white hover:bg-[#8157A1]/25 p-2 rounded-b-md flex"
                    onClick={() => {
                      axios
                        .post(
                          process.env.REACT_APP_REST_API + "/auth/signout",
                          {
                            token: token,
                          }
                        )
                        .then((res) => {
                          // setUsername("");
                          // setPassword("");
                          // setToken("");
                          // setLogin(false)
                          localStorage.removeItem("userData");
                          localStorage.removeItem("token");
                          localStorage.setItem("navBarState", "login");
                          localStorage.setItem("loginState", "logout");
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
            <div className="p-4">
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
            <div className="p-4">
              <button
                className="bg-[#8157A1] text-white sm:px-10 p-2 rounded-md"
                onClick={() => {
                  setToggleRegister(!toggleRegister);
                }}
              >
                สมัครสมาชิก
              </button>
              {toggleRegister && (
                <div className="border-[#8157A1] border-2 rounded-md bg-white">
                  <div
                    className="text-[#8157A1] bg-white hover:bg-[#8157A1]/25 p-2 rounded-t-md flex"
                    onClick={() => {
                      navigate("/register/mentee", { replace: true });
                    }}
                  >
                    สำหรับผู้รับคำปรึกษา
                  </div>
                  <div
                    className="text-[#8157A1] bg-white hover:bg-[#8157A1]/25 p-2 rounded-b-md flex "
                    onClick={() => {
                      navigate("/register/mentor", { replace: true });
                    }}
                  >
                    สำหรับผู้ให้คำปรึกษา
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    );
  } else {
    return (
      <div className="shadow-lg shadow-gray-300 flex flex-col place-content-between w-full fixed bg-white">
        <div className="p-4 font-bold text-[40px] text-[#8157A1] flex place-content-between">
          <a href="/">Mentorest</a>
          <img
            src={logo}
            width="60"
            height={"40"}
            alt=""
            onClick={() => {
              setToggleHam(!toggleHam);
            }}
          />
        </div>

        {toggleHam && (
          <div className="flex place-content-center border-[#8157A1]">
            <div className="flex flex-col w-[80%] rounded-lg">
              {userData.email && (
                <div className="w-full place-content-center">
                  <div className="bg-[#8157A1] text-white px-4 p-2 rounded-md">
                    {userData.email}
                  </div>
                  <div className="border-[#8157A1] border-2 rounded-md bg-white">
                    <div className="text-[#8157A1] bg-white hover:bg-[#8157A1]/25 p-2 rounded-t-md flex">
                      ดูโปรไฟล์
                    </div>
                    <div
                      className="text-[#8157A1] bg-white hover:bg-[#8157A1]/25 p-2 rounded-b-md flex"
                      onClick={() => {
                        navigate("/user/info/mentor", { replace: true });
                      }}
                    >
                      แก้ไขโปรไฟล์
                    </div>
                    <div
                      className="text-[#8157A1] bg-white hover:bg-[#8157A1]/25 p-2 rounded-b-md flex"
                      onClick={() => {
                        axios
                          .post(
                            process.env.REACT_APP_REST_API + "/auth/signout",
                            {
                              token: token,
                            }
                          )
                          .then((res) => {
                            // setUsername("");
                            // setPassword("");
                            // setToken("");
                            localStorage.removeItem("userData");
                            localStorage.removeItem("token");
                            localStorage.setItem("loginState", "logout");
                            navigate("/login", { replace: true });
                          });
                      }}
                    >
                      ออกจากระบบ
                    </div>
                  </div>
                </div>
              )}
              {isLoginAble && (
                <div className="border-b-2 border-[#8157A1]">
                  <button
                    className="text-[#8157A1] bg-white p-2"
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
                <div className="">
                  <div className=" rounded-md bg-white">
                    <div
                      className="text-[#8157A1] bg-white hover:bg-[#8157A1]/25 p-2 border-b-2 border-[#8157A1] rounded-t-md flex"
                      onClick={() => {
                        navigate("/register/mentee", { replace: true });
                      }}
                    >
                      สมัครสมาชิกสำหรับผู้รับคำปรึกษา
                    </div>
                    <div
                      className="text-[#8157A1] bg-white hover:bg-[#8157A1]/25 p-2 rounded-b-md flex "
                      onClick={() => {
                        navigate("/register/mentor", { replace: true });
                      }}
                    >
                      สำหรับผู้ให้คำปรึกษา
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    );
  }
};

export default Navbar;
