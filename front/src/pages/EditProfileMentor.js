import axios from "axios";
import { useContext, useEffect, useState } from "react";
import DeleteAccountButton from "../components/DeleteAccountButton";
import TextFormRegister from "../components/TextFormRegister";
import { UserContext } from "../hooks/UserContext";

const EditProfileMentor = () => {
  const { Username, setUsername, Password, setPassword, Token, setToken } =
    useContext(UserContext);
  const RegExEmail = /.+@.+\..+/gm;
  const [EmailTextCSS, setEmailTextCSS] = useState("");
  const [PasswordCSS, setPasswordCSS] = useState("");
  const [NameCSS, setNameCSS] = useState("");
  const [SurnameCSS, setSurnameCSS] = useState("");
  const [ProfileCSS, setProfileCSS] = useState("");
  const [MoneyProfileCSS, setMoneyProfileCSS] = useState("");
  const [ProfileCitizenCSS, setProfileCitizenCSS] = useState("");
  const [TextareaCSS, setTextareaCSS] = useState("");
  const [EmailData, setEmailData] = useState("");
  const [NameData, setNameData] = useState("");
  const [SurnameData, setSurnameData] = useState("");
  const [MoneyProfile, setMoneyProfile] = useState();
  const [MoneyProfileURL, setMoneyProfileURL] = useState();
  const [Profile, setProfile] = useState();
  const [ProfileURL, setProfileURL] = useState();
  const [ProfileCitizen, setProfileCitizen] = useState();
  const [ProfileCitizenURL, setProfileCitizenURL] = useState();
  const [textarea, setTextarea] = useState(
    "The content of a textarea goes in the value attribute"
  );

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
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(
      e.target[0].value,
      e.target[1].value,
      e.target[2].value,
      e.target[3].value,
      e.target[4].value,
      e.target[5].value
    );
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

    if (e.target[3].value) {
      setNameCSS("");
    } else {
      setNameCSS("rgb(239 68 68)");
    }
    if (e.target[5].value) {
      setSurnameCSS("");
    } else {
      setSurnameCSS("rgb(239 68 68)");
    }
    if (e.target[4].value) {
      setProfileCSS("");
    } else {
      setProfileCSS("rgb(239 68 68)");
    }
    if (e.target[6].value) {
      setProfileCitizenCSS("");
    } else {
      setProfileCitizenCSS("rgb(239 68 68)");
    }
    if (e.target[7].value) {
      setMoneyProfileCSS("");
    } else {
      setMoneyProfileCSS("rgb(239 68 68)");
    }
    if (e.target[8].value) {
      setTextareaCSS("");
    } else {
      setTextareaCSS("rgb(239 68 68)");
    }
    if (
      checkPassword &&
      checkEmail &&
      e.target[3].value &&
      e.target[4].value &&
      e.target[5].value &&
      e.target[6].value &&
      e.target[7].value &&
      e.target[8].value
    ) {
      console.log(e.target[4].value);
      try {
        var formData = new FormData();
        formData.append("email", e.target[0].value);
        formData.append("password", e.target[1].value);
        formData.append("name", e.target[3].value);
        formData.append("surname", e.target[5].value);
        formData.append("file", e.target[4].files[0]);
        console.log(formData);
        axios
          .post(process.env.REACT_APP_REST_API + "/user/update", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: "Bearer " + Token,
            },
          })
          .then((res) => {
            console.log(res);
          });
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleEmailChange = (e) => {
    setEmailData(e.target.value);
    console.log(EmailData);
  };

  const handleNameChange = (e) => {
    setNameData(e.target.value);
    console.log(NameData);
  };

  const handleSurnameChange = (e) => {
    setSurnameData(e.target.value);
    console.log(SurnameData);
  };

  useEffect(() => {
    try {
      axios
        .get(
          process.env.REACT_APP_REST_API + "/user/info",
          {},
          {
            headers: {
              Authorization: "Bearer " + Token,
            },
          }
        )
        .then((res) => {
          console.log(res);
          setEmailData(res.data.email);
          setNameData(res.data.name);
          setSurnameData(res.data.surname);
          // setImageData(res.data.image);
        });
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
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
        แก้ไขข้อมูลส่วนตัว
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
                        value={EmailData}
                        onChange={handleEmailChange}
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
                          value={NameData}
                          onChange={handleNameChange}
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
                        {/* <button className="w-[100%]">
                          <a href={ProfileURL} target="_blank">
                            Preview
                          </a>
                        </button> */}
                      </div>
                    </div>
                  </div>
                  <div className="flex place-content-center">
                    <img src={ProfileURL} width={"60%"} />
                  </div>
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
                        value={SurnameData}
                        onChange={handleSurnameChange}
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
                        {/* <button className="w-[100%]">
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
                        {/* <button className="w-[100%]">
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
            </div>
            <div className="flex place-content-center py-4">
              <div className="w-1/2 flex place-content-center sm:pl-20">
                <DeleteAccountButton />
              </div>
              <div className="w-1/2 flex place-content-center">
                <button
                  className="bg-[#8157A1] text-white px-4 sm:px-10 p-2 rounded-md"
                  type="submit"
                >
                  ยืนยัน
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProfileMentor;
