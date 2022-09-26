import { useState } from "react";
import TextFormRegister from "../components/TextFormRegister";

const Register = () => {
  const RegExEmail = /.+@.+\..+/gm;
  const [EmailTextCSS, setEmailTextCSS] = useState("");
  const [PasswordCSS, setPasswordCSS] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e.target[0].value, e.target[1].value);
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
    console.log(EmailTextCSS, PasswordCSS);
  };
  return (
    <div className="w-full">
      <div className="pt-10 py-6 text-center font-bold text-[32px] text-[#8157A1] text-to-[#D27AD3]">
        เข้าสู่ระบบ
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

export default Register;
