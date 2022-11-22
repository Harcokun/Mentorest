import { useContext, useEffect, useState } from "react";
import TextFormRegister from "../components/TextFormRegister";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import { UserContext } from "../hooks/UserContext";
import { NavbarContext } from "../hooks/NavbarContext";

const RegisterMentor = () => {
  const navigate = useNavigate();
  const RegExEmail = /.+@.+\..+/gm;
  const [color, setColor] = useState(false);
  const [EmailTextCSS, setEmailTextCSS] = useState("");
  const [PasswordCSS, setPasswordCSS] = useState("");
  const [NameCSS, setNameCSS] = useState("");
  const [SurnameCSS, setSurnameCSS] = useState("");
  const [PhoneNumberCSS, setPhoneNumberCSS] = useState("");
  const [ProfileCSS, setProfileCSS] = useState("");
  const [MoneyProfileCSS, setMoneyProfileCSS] = useState("");
  const [ProfileCitizenCSS, setProfileCitizenCSS] = useState("");
  const [TextareaCSS, setTextareaCSS] = useState("");
  const [HourlyPriceCSS, setHourlyPriceCSS] = useState();
  const [AvailableTimeCSS, setAvailableTimeCSS] = useState();
  const [MoneyProfile, setMoneyProfile] = useState();
  const [MoneyProfileURL, setMoneyProfileURL] = useState();
  const [Profile, setProfile] = useState();
  const [ProfileURL, setProfileURL] = useState("");
  const [ProfileCitizen, setProfileCitizen] = useState("");
  const [ProfileCitizenURL, setProfileCitizenURL] = useState("");
  const [textarea, setTextarea] = useState(
    "Explain yourself. Please refrain from confuse your future self"
  );
  const [availableTime, setAvailableTime] = useState("");

  const handleTextareaChange = (event) => {
    setTextarea(event.target.value);
  };
  const handleSetProfile = (e) => {
    setProfile(e.target.files[0]);
  };
  const handleSetMoneyProfile = (e) => {
    setMoneyProfile(e.target.files[0]);
  };
  const handleSetProfileCitizen = (e) => {
    setProfileCitizen(e.target.files[0]);
  };
  const { setState } = useContext(NavbarContext);
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e);
    const checkEmail = RegExEmail.test(e.target[0].value);
    let checkPassword = false;
    if (e.target[1].value === e.target[2].value && e.target[1].value) {
      checkPassword = true;
    }
    checkPassword? setPasswordCSS("") : setPasswordCSS("rgb(239 68 68)");
    checkEmail? setEmailTextCSS("") : setEmailTextCSS("rgb(239 68 68)");
    e.target[3].value? setNameCSS("") : setNameCSS("rgb(239 68 68)");
    e.target[4].value?  setProfileCSS("") : setProfileCSS("rgb(239 68 68)");
    e.target[5].value? setSurnameCSS("") : setSurnameCSS("rgb(239 68 68)");
    e.target[6].value? setPhoneNumberCSS("") : setPhoneNumberCSS("rgb(239 68 68)");
    e.target[7].value? setProfileCitizenCSS("") : setProfileCitizenCSS("rgb(239 68 68)");
    e.target[8].value? setMoneyProfileCSS("") : setMoneyProfileCSS("rgb(239 68 68)");
    e.target[9].value? setTextareaCSS("") : setTextareaCSS("rgb(239 68 68)");
    e.target[10].value? setHourlyPriceCSS("") : setHourlyPriceCSS("rgb(239 68 68)");
    e.target[11].value? setAvailableTimeCSS("") : setAvailableTimeCSS("rgb(239 68 68)");
    
    if (
      checkPassword &&
      checkEmail &&
      e.target[3].value &&
      e.target[5].value &&
      e.target[4].value &&
      e.target[6].value &&
      e.target[7].value &&
      e.target[8].value &&
      e.target[10].value
    ) {
      try {
        var formData = new FormData();
        formData.append("email", e.target[0].value);
        formData.append("password", e.target[1].value);
        formData.append("name", e.target[3].value);
        formData.append("surname", e.target[5].value);
        formData.append("phonenumber", e.target[6].value);
        formData.append("description", e.target[9].value);
        formData.append("price", e.target[10].value);
        formData.append("availabletime", e.target[11].value);
        formData.append("file", e.target[4].files[0]);
        formData.append("file", e.target[7].files[0]);
        formData.append("file", e.target[8].files[0]);
        console.log(formData);
        axios
          .post(process.env.REACT_APP_REST_API + "/user", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
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
    if (!Profile) {
      setProfileURL(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(Profile);
    setProfileURL(objectUrl);

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [Profile]);

  useEffect(() => {
    setState("register");
    if (!ProfileCitizen) {
      setProfileCitizenURL(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(ProfileCitizen);
    setProfileCitizenURL(objectUrl);

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [ProfileCitizen]);

  useEffect(() => {
    setState("register");
    if (!MoneyProfile) {
      setMoneyProfileURL(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(MoneyProfile);
    setMoneyProfileURL(objectUrl);

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [MoneyProfile]);
  return (
    <div className="w-full">
      <div className="pt-10 py-6 text-center font-bold text-[32px] text-[#8157A1] text-to-[#D27AD3]">
        ลงทะเบียนสำหรับผู้ให้คำปรึกษา
      </div>
      <div className="flex place-content-center">
        <div className="border-2 border-[#8157A1] w-[80%] rounded-3xl">
          <form className="flex flex-col space-y-2" onSubmit={handleSubmit}>
            <div className="space-y-4 pt-10">
              <div className="sm:w-[50%]">
                <div className="p-2 py-6 place-content-center flex w-[full]">
                  <div className="w-full sm:w-[80%]  place-content-between flex ">
                    <div className="p-2 px-6 flex">
                      อีเมล<div className="text-red-600">*</div>
                    </div>
                    <div>
                      <input
                        type={"text"}
                        className={`${
                          !EmailTextCSS
                            ? "border-[#8157A1]/50"
                            : "border-red-500"
                        } border-2 rounded-md w-[100%]`}
                        name=""
                        id=""
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="sm:flex place-content-between">
                <div className="sm:w-[50%]">
                  <TextFormRegister
                    sidetext="รหัสผ่าน"
                    type="password"
                    sidetextback=""
                    color={PasswordCSS}
                    isRequired={true}
                  />
                </div>
                <div className="sm:w-[50%]">
                  <TextFormRegister
                    sidetext="ยืนยันรหัสผ่าน"
                    type="password"
                    sidetextback=""
                    color={PasswordCSS}
                    isRequired={true}
                  />
                </div>
              </div>
              <div className="sm:flex place-content-between">
                <div className="sm:w-[50%]">
                  <div className="p-2 py-6 place-content-center flex w-[full]">
                    <div className="w-full sm:w-[80%]  place-content-between flex ">
                      <div className="p-2 px-6 flex">
                        ชื่อจริง<div className="text-red-600">*</div>
                      </div>
                      <div>
                        <input
                          type={"text"}
                          className={`${
                            !NameCSS ? "border-[#8157A1]/50" : "border-red-500"
                          }  border-2 rounded-md w-[100%]`}
                          name=""
                          id=""
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="sm:w-[50%]">
                  <div className="p-2 py-6 place-content-center flex w-[full]">
                    <div className="w-full sm:w-[80%]  place-content-between flex flex-col">
                      <div className="p-2 px-6 flex">
                        รูปภาพ<div className="text-red-600">*</div>
                      </div>
                      <div className="flex-col px-6 flex">
                        <input
                          type="file"
                          className={`${
                            !ProfileCSS
                              ? "border-[#8157A1]/50"
                              : "border-red-500"
                          } border-2 rounded-md w-[100%]`}
                          name=""
                          id=""
                          onChange={handleSetProfile}
                        />
                        {/* <button className="w-[60%]">
                          <a href={ProfileURL} target="_blank">
                            Preview
                          </a>
                        </button> */}
                        <img src={ProfileURL} width={"100%"} />
                      </div>
                    </div>
                  </div>
                  {/* <div className="flex place-content-center"></div> */}
                </div>
              </div>
              <div className="sm:w-[50%]">
                <div className="p-2 py-6 place-content-center flex w-[full]">
                  <div className="w-full sm:w-[80%]  place-content-between flex ">
                    <div className="p-2 px-6 flex">
                      นามสกุล<div className="text-red-600">*</div>
                    </div>
                    <div>
                      <input
                        type={"text"}
                        className={`${
                          !SurnameCSS ? "border-[#8157A1]/50" : "border-red-500"
                        } border-2 rounded-md w-[100%]`}
                        name=""
                        id=""
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="sm:w-[50%]">
                <div className="p-2 py-6 place-content-center flex w-[full]">
                  <div className="w-full sm:w-[80%]  place-content-between flex ">
                    <div className="p-2 px-6 flex">
                      เบอร์โทรศัพท์<div className="text-red-600">*</div>
                    </div>
                    <div>
                      <input
                        type={"text"}
                        className={`${
                          !PhoneNumberCSS ? "border-[#8157A1]/50" : "border-red-500"
                        } border-2 rounded-md w-[100%]`}
                        name=""
                        id=""
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="sm:flex place-content-between">
                <div className="sm:w-[50%]">
                  <div className="p-2 py-6 place-content-center flex w-[full]">
                    <div className="w-full sm:w-[80%]  place-content-between ">
                      <div className="p-2 px-6 flex">
                        รูปบัตรประชาชน<div className="text-red-600">*</div>
                      </div>
                      <div className="flex-col px-6  flex">
                        <input
                          type="file"
                          className={`${
                            !ProfileCitizenCSS
                              ? "border-[#8157A1]/50"
                              : "border-red-500"
                          } border-2 rounded-md w-[100%]`}
                          name=""
                          id=""
                          onChange={handleSetProfileCitizen}
                        />
                        {/* <button className="w-[60%]">
                          <a href={ProfileCitizenURL} target="_blank">
                            Preview
                          </a>
                        </button> */}
                        <img src={ProfileCitizenURL} width={"100%"} />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="sm:w-[50%]">
                  <div className="p-2 py-6 place-content-center flex w-[full]">
                    <div className="w-full sm:w-[80%]  place-content-between ">
                      <div className="p-2 px-6">รูปหน้าสมุดบัญชีธนาคาร</div>
                      <div className="flex-col flex px-6 ">
                        <input
                          type="file"
                          className={`${
                            !MoneyProfileCSS
                              ? "border-[#8157A1]/50"
                              : "border-red-500"
                          } border-2 rounded-md w-[100%]`}
                          name=""
                          id=""
                          onChange={handleSetMoneyProfile}
                        />
                        {/* <button className="w-[60%]">
                          <a href={MoneyProfileURL} target="_blank">
                            Preview
                          </a>
                        </button> */}
                        <img src={MoneyProfileURL} width={"100%"} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-[100%]">
                <div className="p-2 py-6 place-content-center flex w-[full]">
                  <div className="w-[100%] flex flex-col ">
                    <div className="p-2 flex place-content-center w-full">
                      <div className="w-[80%]">
                        <div>อธิบายความเป็นตัวเอง</div>
                      </div>
                    </div>
                    <div className="w-full flex place-content-center">
                      <textarea
                        placeholder={textarea}
                        onChange={handleTextareaChange}
                        className={`${
                          !TextareaCSS
                            ? "border-[#8157A1]/50"
                            : "border-red-500"
                        } border-2 rounded-md w-[80%]`}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="sm:w-[50%]">
                <div className="p-2 py-6 place-content-center flex w-[full]">
                  <div className="w-full sm:w-[80%]  place-content-between flex ">
                    <div className="p-2 px-6 flex">
                      ราคา(/ชั่วโมง)<div className="text-red-600">*</div>
                    </div>
                    <div>
                      <input
                        type={"text"}
                        className={`${
                          !HourlyPriceCSS ? "border-[#8157A1]/50" : "border-red-500"
                        } border-2 rounded-md w-[100%]`}
                        name=""
                        id=""
                        defaultValue={0}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-[100%]">
                <div className="p-2 py-6 place-content-center flex w-[full]">
                  <div className="w-[100%] flex flex-col ">
                    <div className="p-2 flex place-content-center w-full">
                      <div className="w-[80%]">
                        <div>วัน/เวลาที่สะดวก</div>
                      </div>
                    </div>
                    <div className="w-full flex place-content-center">
                      <textarea
                        placeholder={""}
                        onChange={(event) => {setAvailableTime(event.target.value)}}
                        className={`${
                          !AvailableTimeCSS
                            ? "border-[#8157A1]/50"
                            : "border-red-500"
                        } border-2 rounded-md w-[80%]`}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex place-content-center py-4">
              <div className="w-1/2 flex place-content-center sm:pl-20">
                <button className=" text-[#8157A1] border-2 border-[#8157A1] hover:bg-[#8157A1] hover:text-white px-4 sm:px-10 p-2 rounded-md">
                  ย้อนกลับ
                </button>
              </div>
              <div className="w-1/2 flex place-content-center">
                <button className="bg-[#8157A1] text-white px-4 sm:px-10 p-2 rounded-md">
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

export default RegisterMentor;