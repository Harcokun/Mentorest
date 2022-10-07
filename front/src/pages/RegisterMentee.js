import { useContext, useEffect, useState } from "react";
import TextFormRegister from "../components/TextFormRegister";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../hooks/UserContext";
import { NavbarContext } from "../hooks/NavbarContext";

const RegisterMentee = () => {
  const navigate = useNavigate();
  const RegExEmail = /.+@.+\..+/gm;
  const [EmailTextCSS, setEmailTextCSS] = useState("");
  const [PasswordCSS, setPasswordCSS] = useState("");
  const { setState } = useContext(NavbarContext);
  const handleSubmit = (e) => {
    e.preventDefault();
    const checkEmail = RegExEmail.test(e.target[0].value);
    let checkPassword = false;
    if (e.target[1].value === e.target[2].value && e.target[1].value) {
      checkPassword = true;
    }
    if (checkPassword) {
      setPasswordCSS("");
    } else {
      setPasswordCSS("rgb(239 68 68)");
    }
    if (checkEmail) {
      setEmailTextCSS("");
    } else {
      setEmailTextCSS("rgb(239 68 68)");
    }

    if (checkPassword && checkEmail) {
      try {
        axios
          .post(process.env.REACT_APP_REST_API + "/user", {
            email: e.target[0].value,
            password: e.target[1].value,
            name: e.target[3].value,
            file: e.target[4].value,
            surname: e.target[5].value,
          })
          .then((res) => {
            console.log(res);
            navigate("/login", { replace: true });
          });
      } catch (err) {
        console.log(err);
      }
    }
  };
  useEffect(() => {
    setState("register");
  });
  return (
    <div className="w-full">
      <div className="pt-10 py-6 text-center font-bold text-[32px] text-[#8157A1] text-to-[#D27AD3]">
        ลงทะเบียนสำหรับผู้รับคำปรึกษา
      </div>
      <div className="flex place-content-center">
        <div className="border-2 border-[#8157A1] w-[80%] rounded-3xl">
          <form className="flex flex-col space-y-2" onSubmit={handleSubmit}>
            <div className="space-y-4 pt-10">
              <div className="w-[50%]">
                <TextFormRegister
                  sidetext="อีเมล"
                  type="text"
                  sidetextback=""
                  color={EmailTextCSS}
                />
              </div>
              <div className="flex place-content-between">
                <div className="w-[50%]">
                  <TextFormRegister
                    sidetext="รหัสผ่าน"
                    type="password"
                    sidetextback=""
                    color=""
                  />
                </div>
                <div className="w-[50%]">
                  <TextFormRegister
                    sidetext="ยืนยันรหัสผ่าน"
                    type="password"
                    sidetextback=""
                    color={PasswordCSS}
                  />
                </div>
              </div>
              <div className="flex place-content-between">
                <div className="w-[50%]">
                  <TextFormRegister
                    sidetext="ชื่อจริง"
                    type="text"
                    sidetextback=""
                    color=""
                  />
                </div>
                <div className="w-[50%]">
                  <TextFormRegister
                    sidetext="รูปภาพ"
                    type="file"
                    sidetextback=""
                    color=""
                  />
                </div>
              </div>
              <div className="w-[50%]">
                <TextFormRegister
                  sidetext="นามสกุล"
                  type="text"
                  sidetextback=""
                  color=""
                />
              </div>
            </div>
            <div className="flex place-content-center py-4">
              <div className="w-1/2 flex place-content-center pl-20">
                <button className=" text-[#8157A1] border-2 border-[#8157A1] hover:bg-[#8157A1] hover:text-white px-10 p-2 rounded-md">
                  ย้อนกลับ
                </button>
              </div>
              <div className="w-1/2 flex place-content-center">
                <button className="bg-[#8157A1] text-white px-10 p-2 rounded-md">
                  สมัครสมาชิก
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterMentee;
