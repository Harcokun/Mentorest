import axios from "axios";
import { useContext, useEffect, useState } from "react";
import DeleteAccountButton from "../components/DeleteAccountButton";
import Loading from "../components/Loading";
import TextFormRegister from "../components/TextFormRegister";
import { UserContext } from "../hooks/UserContext";
import logo from "../hamburger.png";

const EditProfileMentor = (userId) => {
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
  const [MobilePhoneCSS, setMobilePhoneCSS] = useState("");
  const [CitizenIDCSS, setCitizenIDCSS] = useState("");
  const [BankIDCSS, setBankIDCSS] = useState("");

  const [PriceCSS, setPriceCSS] = useState("");
  const [TextareaCSS, setTextareaCSS] = useState("");
  const [EmailData, setEmailData] = useState("");
  const [NameData, setNameData] = useState("");
  const [PasswordData, setPasswordData] = useState("");
  const [RePasswordData, setRePasswordData] = useState("");
  const [PhoneNumberData, setPhoneNumberData] = useState("");
  const [SurnameData, setSurnameData] = useState("");
  const [PriceData, setPriceData] = useState("");
  const [Yourself, setYourself] = useState("");
  const [Datetime, setDatetime] = useState("");
  const [MoneyProfile, setMoneyProfile] = useState();
  const [MoneyProfileURL, setMoneyProfileURL] = useState();
  const [Profile, setProfile] = useState();
  const [ProfileURL, setProfileURL] = useState();
  const [ProfileCitizen, setProfileCitizen] = useState();
  const [ProfileCitizenURL, setProfileCitizenURL] = useState();
  const [CitizenID, setCitizenID] = useState("");
  const [BankID, setBankID] = useState("");

  const [textarea, setTextarea] = useState(
    "The content of a textarea goes in the value attribute"
  );

  const [textareaDate, setTextareaDate] = useState(
    "Explain yourself. Please refrain from confuse your future self"
  );

  const handleYourselfChange = (event) => {
    setYourself(event.target.value);
  };
  const handleDatetimeChange = (event) => {
    setDatetime(event.target.value);
  };
  const handleTextareaDateChange = (event) => {
    setTextareaDate(event.target.value);
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
    console.log(e);
    let checkPassword = false;
    if (e.target[0].value === e.target[1].value && e.target[0].value) {
      checkPassword = true;
    }
    if (checkPassword) {
      setPasswordCSS("");
    } else {
      setPasswordCSS("rgb(239 68 68)");
    }

    if (e.target[2].value) {
      setProfileCSS("");
    } else {
      setProfileCSS("rgb(239 68 68)");
    }
    if (e.target[3].value) {
      setMobilePhoneCSS("");
    } else {
      setMobilePhoneCSS("rgb(239 68 68)");
    }
    if (e.target[5].value) {
      setPriceCSS("");
    } else {
      setPriceCSS("rgb(239 68 68)");
    }
    if (
      checkPassword &&
      e.target[2].value &&
      e.target[3].value &&
      e.target[5].value
    ) {
      console.log(e.target[4].value);
      try {
        var formData = new FormData();
        formData.append("email", e.target[0].value);
        formData.append("password", e.target[1].value);
        formData.append("name", e.target[3].value);
        formData.append("surname", e.target[4].value);
        formData.append("file", e.target[5].files[0]);
        formData.append("phonenumber", e.target[6].value);
        formData.append("CitizenID", e.target[7].value);
        formData.append("BankID", e.target[8].value);
        formData.append("Citizenfile", e.target[9].files[0]);
        formData.append("Bankfile", e.target[10].files[0]);
        formData.append("Yourself", e.target[11].value);
        formData.append("price", e.target[12].value);
        formData.append("datetime", e.target[13].value);
        console.log(formData);
        axios
          .put(process.env.REACT_APP_REST_API + "/user/update", formData, {
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
  const handlePasswordChange = (e) => {
    setPasswordData(e.target.value);
  };
  const handleRePasswordChange = (e) => {
    setRePasswordData(e.target.value);
  };
  const handlePhoneNumberChange = (e) => {
    setPhoneNumberData(e.target.value);
  };
  const handlePriceChange = (e) => {
    setPriceData(e.target.value);
  };

  useEffect(() => {
    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      axios.get(process.env.REACT_APP_REST_API + "/user").then((res) => {
        console.log(res);
        setEmailData(res.data.email);
        setPasswordData(res.data.password);
        setRePasswordData(res.data.password);
        setNameData(res.data.name);
        setSurnameData(res.data.surname);

        setProfileURL(res.data.image);
        setPhoneNumberData(res.data.phone);
        setCitizenID(res.data.citizenID);
        setBankID(res.data.bankID);
        setYourself(res.data.about);
        setPriceData(res.data.price);
        setDatetime(res.data.date);
        setMoneyProfileURL(res.data.bankimage);
        setProfileCitizenURL(res.data.citizencard);
      });
    } catch (err) {
      console.log(err);
    }
  }, []);

  if (!userData) return <Loading />;
  return (
    <div className="w-full">
      <div className="pt-10 py-6 text-center font-bold text-[32px] text-[#8157A1] text-to-[#D27AD3]">
        แก้ไขข้อมูลส่วนตัว
      </div>
      <div className="text-left mr-10 text-red-600">
        หมายเหตุ: *** คือ ไม่สามารถแก้ไขข้อมูลได้
      </div>
      <div className="flex place-content-center">
        <div className="border-2 border-[#8157A1] w-[80%] rounded-3xl">
          <form className="flex flex-col space-y-2" onSubmit={handleSubmit}>
            <div className="space-y-4 pt-10">
              <div className="sm:w-[50%]">
                <div className="p-2 py-6 place-content-center flex w-[full]">
                  <div className="w-full sm:w-[80%]  place-content-between flex ">
                    <div className="p-2 px-6 flex">อีเมล</div>
                    <div className="p-2">
                      <div className={`rounded-md`} name="" id="">
                        {EmailData ? EmailData : "Dummy"}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="sm:flex place-content-between">
                <div className="sm:w-[50%]">
                  <div className="p-2 py-6 place-content-center flex w-[full]">
                    <div className="w-full sm:w-[80%]  place-content-between flex ">
                      <div className="p-2 sm:px-6">รหัสผ่าน</div>
                      <div className="p-2">
                        <input
                          type={"password"}
                          className={`${
                            !PasswordCSS
                              ? "border-[#8157A1]/50"
                              : "border-red-500"
                          } border-2 rounded-md w-[100%]`}
                          name=""
                          id=""
                          value={PasswordData}
                          onChange={handlePasswordChange}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="sm:w-[50%]">
                  <div className="p-2 py-6 place-content-center flex w-[full]">
                    <div className="w-full sm:w-[80%]  place-content-between flex ">
                      <div className="p-2 sm:px-6">ยืนยันรหัสผ่าน</div>
                      <div className="p-2">
                        <input
                          type={"password"}
                          className={`${
                            !PasswordCSS
                              ? "border-[#8157A1]/50"
                              : "border-red-500"
                          } border-2 rounded-md w-[100%]`}
                          name=""
                          id=""
                          value={RePasswordData}
                          onChange={handleRePasswordChange}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row place-content-between">
                <div className="w-full flex flex-col">
                  <div className="w-[100%]">
                    <div className="p-2 sm:py-6 place-content-center flex w-[full]">
                      <div className="w-[80%]  place-content-between flex ">
                        <div className="p-2 sm:px-6 flex">ชื่อจริง</div>
                        <div>
                          <div className={`rounded-md p-2`} name="" id="">
                            {NameData ? NameData : "Dummy"}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="w-[100%]">
                    <div className="p-2 sm:py-6 place-content-center flex w-[full]">
                      <div className="w-[80%]  place-content-between flex ">
                        <div className="p-2 sm:px-6 flex">นามสกุล</div>
                        <div>
                          <div className={`rounded-md p-2`} name="" id="">
                            {SurnameData ? SurnameData : "Dummy"}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-[100%]">
                  <div className="p-2 sm:py-6 place-content-center flex w-[full]">
                    <div className="w-[80%]  place-content-between flex flex-col sm:flex-row">
                      <div className="p-2 sm:px-6 flex">รูปภาพ</div>
                      <div className="flex-col flex">
                        <input
                          type="file"
                          className={`${
                            userData.profileImg || inputUserData.profileImg
                              ? "border-[#8157A1]/50"
                              : "border-red-500"
                          } border-2 rounded-md w-[100%]`}
                          name=""
                          id=""
                          defaultValue={userData.profileImg}
                          onChange={(event) => {
                            if (event.target.files[0]) {
                              const objectUrl = URL.createObjectURL(
                                event.target.files[0]
                              );
                              setInputUserData({
                                ...inputUserData,
                                profileImg: event.target.files[0],
                                profileImgUrl: objectUrl,
                              });
                              // free memory when ever this component is unmounted
                              return () => URL.revokeObjectURL(objectUrl);
                            }
                          }}
                        />
                        {/* <button className="w-[100%]">
                          <a href={ProfileURL} target="_blank">
                            Preview
                          </a>
                        </button> */}
                        {ProfileURL ? (
                          <img src={ProfileURL} width={"60%"} />
                        ) : (
                          <img src={logo} />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="sm:flex place-content-between">
                <div className="sm:w-[50%]">
                  <div className="p-2 py-6 place-content-center flex w-[full]">
                    <div className="w-full sm:w-[80%]  place-content-between flex ">
                      <div className="  px-6 flex">เบอร์โทรศัพท์</div>
                      <div>
                        <input
                          type={"text"}
                          className={`${
                            !MobilePhoneCSS
                              ? "border-[#8157A1]/50"
                              : "border-red-500"
                          }  border-2 rounded-md w-[100%]`}
                          name=""
                          id=""
                          value={PhoneNumberData}
                          onChange={handlePhoneNumberChange}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="sm:flex place-content-between">
                <div className="sm:w-[50%]">
                  <div className="p-2 py-6 place-content-center flex w-[full]">
                    <div className="w-full sm:w-[80%]  place-content-between flex ">
                      <div className="  px-6 flex">หมายเลขบัตรประชาชน</div>
                      <div className="p-2">
                        {CitizenID ? CitizenID : "Dummy"}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="sm:w-[50%]">
                  <div className="p-2 py-6 place-content-center flex w-[full]">
                    <div className="w-full sm:w-[80%]  place-content-between flex ">
                      <div className="  px-6 flex">หมายเลขบัญชีธนาคาร</div>

                      <div className="p-2">{BankID ? BankID : "Dummy"}</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="sm:flex place-content-between">
                <div className="sm:w-[50%]">
                  <div className="p-2 py-6 place-content-center flex w-[full]">
                    <div className="w-full sm:w-[80%]  place-content-between ">
                      <div className="p-2 px-6 flex">รูปบัตรประชาชน</div>
                      <div className="flex-col px-6  flex">
                        {/* <button className="w-[100%]">
                          <a href={ProfileCitizenURL} target="_blank">
                            Preview
                          </a>
                        </button> */}
                        {ProfileCitizenURL ? (
                          <img src={ProfileCitizenURL} width={"100%"} />
                        ) : (
                          <img src={logo} width={"100%"} />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="sm:w-[50%]">
                  <div className="p-2 py-6 place-content-center flex w-[full]">
                    <div className="w-full sm:w-[80%]  place-content-between ">
                      <div className="p-2 px-6">
                        รูปหน้าสมุดบัญชีธนาคาร
                        <div className="font-bold">***</div>
                      </div>
                      <div className="flex-col flex px-6 ">
                        {MoneyProfileURL ? (
                          <img src={MoneyProfileURL} width={"100%"} />
                        ) : (
                          <img src={logo} width={"100%"} />
                        )}
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
                        onChange={handleYourselfChange}
                        value={Yourself}
                        className={`border-[#8157A1]/50 border-2 rounded-md w-[80%]`}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="sm:w-[50%]">
                <div className="p-2 sm:py-6 place-content-center flex w-[full]">
                  <div className="w-full sm:w-[80%]  place-content-between flex ">
                    <div className="items-center px-4 flex">ราคา(/ชั่วโมง)</div>
                    <div className="p-2">
                      <input
                        type={"text"}
                        className={`${
                          !PriceCSS ? "border-[#8157A1]/50" : "border-red-500"
                        } border-2 rounded-md w-[100%]`}
                        name=""
                        id=""
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-[100%]">
                <div className="p-2 py-6 place-content-center flex w-[full]">
                  <div className="w-[100%] flex flex-col ">
                    <div className="  flex place-content-center w-full">
                      <div className="w-[80%]">
                        <div>วัน/เวลาที่สะดวก</div>
                      </div>
                    </div>
                    <div className="w-full flex place-content-center">
                      <textarea
                        placeholder={textareaDate}
                        onChange={handleDatetimeChange}
                        value={Datetime}
                        className={`border-[#8157A1]/50 border-2 rounded-md w-[80%]`}
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
