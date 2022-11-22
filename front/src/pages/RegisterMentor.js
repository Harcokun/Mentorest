import axios from "axios";
import { useContext, useEffect, useState } from "react";
import DeleteAccountButton from "../components/DeleteAccountButton";
import Loading from "../components/Loading";
import TextFormRegister from "../components/TextFormRegister";
import { UserContext } from "../hooks/UserContext";
import { useNavigate } from "react-router-dom";

const RegisterMentor = () => {
  // const { Username, setUsername, Password, setPassword, Token, setToken } = useContext(UserContext);
  const navigate = useNavigate();
  const token = localStorage.getItem("token")
    ? localStorage.getItem("token")
    : localStorage.setItem("token", "");
  const [userData, setUserData] = useState();
  const [isSent, setSent] = useState(false);
  const [inputUserData, setInputUserData] = useState({
    email: "",
    name: "",
    surname: "",
    password: "",
    confirmPassword: "",
    profileImg: "",
    profileImgUrl: "",
    phoneNumber: "",
    description: "",
    price: 250,
    availableTime: "",
    citizenId: "",
    bookbank_number: "",
    citizenImg: "",
    bookbankImg: "",
  });
  const [isPasswordValid, setPasswordValid] = useState(false);

  useEffect(() => {
    if (
      inputUserData.password &&
      inputUserData.password === inputUserData.confirmPassword
    ) {
      setPasswordValid(true);
    } else setPasswordValid(false);
  }, [inputUserData.password, inputUserData.confirmPassword]);

  const handleSubmit = (e) => {
    e.preventDefault();

    try {
      var formData = new FormData();
      if (isPasswordValid) formData.append("password", inputUserData.password);
      if (inputUserData.email) formData.append("email", inputUserData.email);
      if (inputUserData.name) formData.append("name", inputUserData.name);
      if (inputUserData.surname)
        formData.append("surname", inputUserData.surname);
      if (inputUserData.citizenId)
        formData.append("citizenId", inputUserData.citizenId);
      if (inputUserData.bookbank_number)
        formData.append("bookbank_number", inputUserData.bookbank_number);
      if (inputUserData.profileImg)
        formData.append("profile_image", inputUserData.profileImg);
      if (inputUserData.citizenImg)
        formData.append("citizen_image", inputUserData.citizenImg);
      if (inputUserData.bookbankImg)
        formData.append("bookbank_image", inputUserData.bookbankImg);
      if (inputUserData.phoneNumber)
        formData.append("telephone_number", inputUserData.phoneNumber);
      if (inputUserData.description)
        formData.append("profile_description", inputUserData.description);
      if (inputUserData.price)
        formData.append("price_rate", inputUserData.price);
      if (inputUserData.availableTime)
        formData.append("date_time_booking", inputUserData.availableTime);
      console.log(formData);
      axios({
        method: "post",
        url: process.env.REACT_APP_REST_API + "/mentor",
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }).then((res) => {
        console.log(res);
        navigate("/login", { replace: true });
      });
    } catch (err) {
      console.log(err);
    }
    setSent(true);
  };

  return (
    <div className="w-full">
      <div className="pt-10 py-6 text-center font-bold text-[32px] text-[#8157A1] text-to-[#D27AD3]">
        ลงทะเบียนผู้ให้คำปรึกษา
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
                          !isSent || !inputUserData.email
                            ? "border-[#8157A1]/50"
                            : "border-red-500"
                        } border-2 rounded-md w-[100%]`}
                        name=""
                        id=""
                        onChange={(event) => {
                          setInputUserData({
                            ...inputUserData,
                            email: event.target.value,
                          });
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="sm:flex place-content-between">
                <div className="sm:w-[50%]">
                  <div className="p-2 py-6 place-content-center flex w-[full]">
                    <div className="w-full sm:w-[80%]  place-content-between flex ">
                      <div className="p-2 px-6 flex">รหัสผ่าน</div>
                      <div>
                        <input
                          type={"password"}
                          className={`${
                            !isSent || !inputUserData.password
                              ? "border-[#8157A1]/50"
                              : "border-red-500"
                          }  border-2 rounded-md w-[100%]`}
                          name=""
                          id=""
                          onChange={(event) => {
                            setInputUserData({
                              ...inputUserData,
                              password: event.target.value,
                            });
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="sm:w-[50%]">
                  <div className="p-2 py-6 place-content-center flex w-[full]">
                    <div className="w-full sm:w-[80%]  place-content-between flex ">
                      <div className="p-2 px-6 flex">ยืนยันรหัสผ่าน</div>
                      <div>
                        <input
                          type={"password"}
                          className={`${
                            !isSent || !inputUserData.confirmPassword
                              ? "border-[#8157A1]/50"
                              : "border-red-500"
                          }  border-2 rounded-md w-[100%]`}
                          name=""
                          id=""
                          onChange={(event) => {
                            setInputUserData({
                              ...inputUserData,
                              confirmPassword: event.target.value,
                            });
                          }}
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
                      <div className="p-2 px-6 flex">
                        ชื่อจริง<div className="">***</div>
                      </div>
                      <div>
                        <input
                          type={"text"}
                          className={`${
                            !isSent || !inputUserData.name
                              ? "border-[#8157A1]/50"
                              : "border-red-500"
                          }  border-2 rounded-md w-[100%]`}
                          name=""
                          id=""
                          onChange={(event) => {
                            setInputUserData({
                              ...inputUserData,
                              name: event.target.value,
                            });
                          }}
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
                            !isSent || !inputUserData.profileImg
                              ? "border-[#8157A1]/50"
                              : "border-red-500"
                          } border-2 rounded-md w-[100%]`}
                          name=""
                          id=""
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
                      </div>
                    </div>
                  </div>
                  <div className="flex place-content-center">
                    <img src={inputUserData.profileImgUrl} width={"60%"} />
                  </div>
                </div>
              </div>
              <div className="sm:w-[50%]">
                <div className="p-2 py-6 place-content-center flex w-[full]">
                  <div className="w-full sm:w-[80%]  place-content-between flex ">
                    <div className="p-2 px-6 flex">
                      นามสกุล<div className="">***</div>
                    </div>
                    <div>
                      <input
                        type={"text"}
                        className={`${
                          !isSent || !inputUserData.surname
                            ? "border-[#8157A1]/50"
                            : "border-red-500"
                        } border-2 rounded-md w-[100%]`}
                        name=""
                        id=""
                        onChange={(event) => {
                          setInputUserData({
                            ...inputUserData,
                            surname: event.target.value,
                          });
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="sm:w-[50%]">
                <div className="p-2 py-6 place-content-center flex w-[full]">
                  <div className="w-full sm:w-[80%]  place-content-between flex ">
                    <div className="p-2 px-6">เบอร์โทรศัพท์</div>
                    <div>
                      <input
                        type={"text"}
                        className={`${
                          !isSent || !inputUserData.phoneNumber
                            ? "border-[#8157A1]/50"
                            : "border-red-500"
                        } border-2 rounded-md w-[100%]`}
                        name=""
                        id=""
                        onChange={(event) => {
                          setInputUserData({
                            ...inputUserData,
                            phoneNumber: event.target.value,
                          });
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="sm:flex place-content-between">
                <div className="sm:w-[50%]">
                  <div className="p-2 py-6 place-content-center flex w-[full]">
                    <div className="w-full sm:w-[80%]  place-content-between flex ">
                      <div className="p-2 px-6 flex">
                        หมายเลขบัตรประชาชน<div className="">***</div>
                      </div>
                      <div>
                        <input
                          type={"text"}
                          className={`${
                            !isSent || inputUserData.citizenId
                              ? "border-[#8157A1]/50"
                              : "border-red-500"
                          }  border-2 rounded-md w-[100%]`}
                          name=""
                          id=""
                          onChange={(event) => {
                            setInputUserData({
                              ...inputUserData,
                              citizenId: event.target.value,
                            });
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="sm:w-[50%]">
                  <div className="p-2 py-6 place-content-center flex w-[full]">
                    <div className="w-full sm:w-[80%]  place-content-between flex ">
                      <div className="p-2 px-6 flex">
                        หมายเลขบัญชีธนาคาร<div className="">***</div>
                      </div>
                      <div>
                        <input
                          type={"text"}
                          className={`${
                            !isSent || inputUserData.bookbank_number
                              ? "border-[#8157A1]/50"
                              : "border-red-500"
                          }  border-2 rounded-md w-[100%]`}
                          name=""
                          id=""
                          onChange={(event) => {
                            setInputUserData({
                              ...inputUserData,
                              bookbank_number: event.target.value,
                            });
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="sm:flex place-content-between">
                <div className="sm:w-[50%]">
                  <div className="p-2 py-6 place-content-center flex w-[full]">
                    <div className="w-full sm:w-[80%]  place-content-between ">
                      <div className="p-2 px-6 flex">
                        รูปบัตรประชาชน<div className="">***</div>
                      </div>
                      <div className="flex-col px-6 flex">
                        <input
                          type="file"
                          className={`${
                            !isSent || inputUserData.citizenImg
                              ? "border-[#8157A1]/50"
                              : "border-red-500"
                          } border-2 rounded-md w-[100%]`}
                          name=""
                          id=""
                          onChange={(event) => {
                            if (event.target.files[1]) {
                              const objectUrl = URL.createObjectURL(
                                event.target.files[1]
                              );
                              setInputUserData({
                                ...inputUserData,
                                citizenImg: event.target.files[1],
                              });
                              // free memory when ever this component is unmounted
                              return () => URL.revokeObjectURL(objectUrl);
                            }
                          }}
                        />
                      </div>
                      <div className="flex-col px-6  flex">
                        <img src={inputUserData.citizenImg} width={"100%"} />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="sm:w-[50%]">
                  <div className="p-2 py-6 place-content-center flex w-[full]">
                    <div className="w-full sm:w-[80%]  place-content-between ">
                      <div className="p-2 px-6">รูปหน้าสมุดบัญชีธนาคาร</div>
                      <div className="flex-col px-6 flex">
                        <input
                          type="file"
                          className={`${
                            !isSent || inputUserData.bookbankImg
                              ? "border-[#8157A1]/50"
                              : "border-red-500"
                          } border-2 rounded-md w-[100%]`}
                          name=""
                          id=""
                          onChange={(event) => {
                            if (event.target.files[2]) {
                              const objectUrl = URL.createObjectURL(
                                event.target.files[2]
                              );
                              setInputUserData({
                                ...inputUserData,
                                bookbankImg: event.target.files[2],
                              });
                              // free memory when ever this component is unmounted
                              return () => URL.revokeObjectURL(objectUrl);
                            }
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex-col flex px-6 ">
                    <img src={inputUserData.bookbankImg} width={"100%"} />
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
                        onChange={(event) => {
                          setInputUserData({
                            ...inputUserData,
                            description: event.target.value,
                          });
                        }}
                        className={`${
                          !isSent || !inputUserData.description
                            ? "border-[#8157A1]/50"
                            : "border-red-500"
                        } border-2 rounded-md w-[80%]`}
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
                        onChange={(event) => {
                          setInputUserData({
                            ...inputUserData,
                            availableTime: event.target.value,
                          });
                        }}
                        className={`${
                          !isSent || !inputUserData.availableTime
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
              <div className="w-1/2 flex place-content-center">
                <button
                  className="bg-[#8157A1] text-white px-4 sm:px-10 p-2 rounded-md"
                  type="submit"
                  disabled={inputUserData.password != "" && !isPasswordValid}
                >
                  ลงทะเบียน
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <button
        className=" text-[#8157A1] border-2 border-[#8157A1] hover:bg-[#8157A1] hover:text-white px-10 my-5 mx-24 p-2 rounded-md"
        onClick={() => {
          navigate("/", { replace: true });
        }}
      >
        ย้อนกลับ
      </button>
    </div>
  );
};

export default RegisterMentor;
