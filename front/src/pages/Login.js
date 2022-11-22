import axios from "axios";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TextForm from "../components/TextForm";
import { NavbarContext } from "../hooks/NavbarContext";
import { UserContext } from "../hooks/UserContext";
import decode from "jwt-decode";

const Login = () => {
  const navigate = useNavigate();
  const loginState = localStorage.getItem("loginState");
  if(loginState == "login") {
    navigate("/", { replace: true });
  }
  // const { setUserId, setUsername, setPassword, setToken, setPosition } =
  //   useContext(UserContext);
  // const { setState } = useContext(NavbarContext);
  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      axios
        .post(process.env.REACT_APP_REST_API + "/auth/signin", {
          email: e.target[0].value,
          password: e.target[1].value,
        })
        .then((res) => {
          const decodedToken = decode(res.data.token);
          const userData = {
            id: decodedToken.id,
            email: e.target[0].value,
            password: e.target[1].value,
            position: decodedToken.position,
          };
          localStorage.setItem("userData", JSON.stringify(userData));
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("loginState", "login");
          // setUsername(e.target[0].value);
          // setPassword(e.target[1].value);
          // setToken(res.data.token);
          // setUserId(decode(res.data.token).id);
          // setPosition(decode(res.data.token).position);
          localStorage.setItem("navBarState", "main");
          navigate("/", { replace: true });

        });
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    // setState("login");
    localStorage.setItem("navBarState", "login");
  });
  return (
    <div className="w-full">
      <div className="pt-10 py-6 text-center font-bold text-[32px] text-[#8157A1] text-to-[#D27AD3]">
        เข้าสู่ระบบ
      </div>
      <div className="flex place-content-center">
        <div className="border-2 border-[#8157A1] w-[80%] rounded-3xl">
          <form className="flex flex-col space-y-2" onSubmit={handleSubmit}>
            <div className="space-y-4 pt-10">
              <TextForm
                sidetext="ชื่อบัญชี"
                type="text"
                sidetextback="ชื่อบัญชี"
              />
              <TextForm
                sidetext="รหัสผ่าน"
                type="password"
                sidetextback="รหัสผ่าน"
              />
            </div>
            <div className="flex place-content-center py-4">
              <button className="bg-[#8157A1] text-white px-10 p-2 rounded-md">
                เข้าสู่ระบบ
              </button>
            </div>
          </form>

          <div className="flex place-content-center pb-4">
            <button className="text-[#8157A1] border-2 border-[#8157A1] hover:bg-[#8157A1] hover:text-white px-8 p-2 rounded-md">
              ลืมรหัสผ่าน
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
