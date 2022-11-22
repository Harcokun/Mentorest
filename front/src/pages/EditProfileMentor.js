import axios from "axios";
import { useContext, useEffect, useState } from "react";
import DeleteAccountButton from "../components/DeleteAccountButton";
import Loading from "../components/Loading";
import TextFormRegister from "../components/TextFormRegister";
import { UserContext } from "../hooks/UserContext";
import { useNavigate } from "react-router-dom";

const EditProfileMentor = () => {
  // const { Username, setUsername, Password, setPassword, Token, setToken } = useContext(UserContext);
  const navigate = useNavigate();
  const token = localStorage.getItem("token")
    ? localStorage.getItem("token")
    : localStorage.setItem("token", "");
  const [userData, setUserData] = useState();
  const [isSent, setSent] = useState(false);
  const [inputUserData, setInputUserData] = useState({
    password: "",
    confirmPassword: "",
    profileImg: undefined,
    profileImgUrl: "",
    phoneNumber: "",
    description: "",
    price: 0,
    availableTime: "",
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
      if (inputUserData.profileImg)
        formData.append("profile_image", inputUserData.profileImg);
      if (inputUserData.phoneNumber)
        formData.append("telephone_number", inputUserData.phoneNumber);
      if (inputUserData.description)
        formData.append("profile_description", inputUserData.description);
      if (inputUserData.price) formData.append("price", inputUserData.price);
      if (inputUserData.availableTime)
        formData.append("date_time_booking", inputUserData.availableTime);
      console.log(formData);
      axios({
        method: "post",
        url: process.env.REACT_APP_REST_API + "/mentor/update",
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + token,
        },
      }).then((res) => {
        console.log(res);
        navigate("/", { replace: true });
      });
    } catch (err) {
      console.log(err);
    }
    setSent(true);
  };

  useEffect(() => {
    try {
      axios({
        method: "get",
        url: process.env.REACT_APP_REST_API + "/mentor/" + localStorage.getItem("userData").id,
        headers: { Authorization: "Bearer " + token },
      }).then((res) => {
        console.log(res);
        setUserData(res.data);
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
      <div className="flex place-content-center">
        <div className="border-2 border-[#8157A1] w-[80%] rounded-3xl">
          <form className="flex flex-col space-y-2" onSubmit={handleSubmit}>
            <div className="space-y-4 pt-10">
              <div className="text-right font-bold mr-10 text-red-600">
                หมายเหตุ: *** คือ ไม่สามารถแก้ไขข้อมูลได้
              </div>
              <div className="sm:w-[50%]">
                <div className="p-2 py-6 place-content-center flex w-[full]">
                  <div className="w-full sm:w-[80%]  place-content-between flex ">
                    <div className="p-2 px-6 flex">
                      อีเมล<div className="">***</div>
                    </div>
                    <div>
                      <input
                        type={"text"}
                        className={`${
                          userData.email
                            ? "border-[#8157A1]/50"
                            : "border-red-500"
                        } border-2 rounded-md w-[100%]`}
                        name=""
                        id=""
                        defaultValue={userData.email}
                        disabled={true}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="sm:flex place-content-between">
                <div className="sm:w-[50%]">
                  <div className="p-2 py-6 place-content-center flex w-[full]">
                    <div className="w-full sm:w-[80%]  place-content-between flex ">
                      <div className="p-2 px-6 flex">รหัสผ่านใหม่</div>
                      <div>
                        <input
                          type={"password"}
                          className={`${
                            !isSent && !inputUserData.password
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
                      <div className="p-2 px-6 flex">ยืนยันรหัสผ่านใหม่</div>
                      <div>
                        <input
                          type={"password"}
                          className={`${
                            !isSent && !inputUserData.confirmPassword
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
                            userData.name
                              ? "border-[#8157A1]/50"
                              : "border-red-500"
                          }  border-2 rounded-md w-[100%]`}
                          name=""
                          id=""
                          defaultValue={userData.name}
                          disabled={true}
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
                            !isSent &&
                            !(
                              userData.profile_image || inputUserData.profileImg
                            )
                              ? "border-[#8157A1]/50"
                              : "border-red-500"
                          } border-2 rounded-md w-[100%]`}
                          name=""
                          id=""
                          defaultValue={userData.profile_image}
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
                    <img
                      src={
                        inputUserData.profileImgUrl
                          ? inputUserData.profileImgUrl
                          : userData.profile_image
                      }
                      width={"60%"}
                    />
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
                          userData.surname
                            ? "border-[#8157A1]/50"
                            : "border-red-500"
                        } border-2 rounded-md w-[100%]`}
                        name=""
                        id=""
                        defaultValue={userData.surname}
                        disabled={true}
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
                          !isSent && !inputUserData.phoneNumber
                            ? "border-[#8157A1]/50"
                            : "border-red-500"
                        } border-2 rounded-md w-[100%]`}
                        name=""
                        defaultValue={userData.telephone_number}
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
                            !userData.citizenId
                              ? "border-[#8157A1]/50"
                              : "border-red-500"
                          }  border-2 rounded-md w-[100%]`}
                          name=""
                          id=""
                          defaultValue={userData.citizenId}
                          disabled={true}
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
                            !userData.bookbank_number
                              ? "border-[#8157A1]/50"
                              : "border-red-500"
                          }  border-2 rounded-md w-[100%]`}
                          name=""
                          id=""
                          defaultValue={userData.bookbank_number}
                          disabled={true}
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
                      <div className="flex-col px-6  flex">
                        <img src={userData.citizen_image} width={"100%"} />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="sm:w-[50%]">
                  <div className="p-2 py-6 place-content-center flex w-[full]">
                    <div className="w-full sm:w-[80%]  place-content-between ">
                      <div className="p-2 px-6">
                        รูปหน้าสมุดบัญชีธนาคาร
                        <div className="">***</div>
                      </div>
                      <div className="flex-col flex px-6 ">
                        <img src={userData.bookbank_image} width={"100%"} />
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
                        defaultValue={
                          userData.profile_description
                            ? userData.profile_description
                            : "Explain yourself. Please refrain from confuse your future self"
                        }
                        onChange={(event) => {
                          setInputUserData({
                            ...inputUserData,
                            description: event.target.value,
                          });
                        }}
                        className={`${
                          !inputUserData.description
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
                        defaultValue={userData.date_time_booking}
                        onChange={(event) => {
                          setInputUserData({
                            ...inputUserData,
                            availableTime: event.target.value,
                          });
                        }}
                        className={`${
                          !isSent && !inputUserData.availableTime
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
                  disabled={inputUserData.password != "" && !isPasswordValid}
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
