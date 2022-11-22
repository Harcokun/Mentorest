import axios from "axios";
import { useContext, useEffect, useState } from "react";
import DeleteAccountButton from "../components/DeleteAccountButton";
import Loading from "../components/Loading";
import TextFormRegister from "../components/TextFormRegister";
import { UserContext } from "../hooks/UserContext";
import { useNavigate } from "react-router-dom";
import logo from "../icon-human.png";

const VerifyMentor = () => {
  // const { Username, setUsername, Password, setPassword, Token, setToken } = useContext(UserContext);
  const navigate = useNavigate();
  const token = localStorage.getItem("token")
    ? localStorage.getItem("token")
    : localStorage.setItem("token", "");
  const [userData, setUserData] = useState();
  const [inputUserData, setInputUserData] = useState({
    password: "",
    confirmPassword: "",
    profileImg: "",
    profileImgUrl: "",
    phoneNumber: "",
    description: "",
    price: 250,
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

  const handleVerify = (event) => {
    event.preventDefault();
    try {
      axios({
        method: "post",
        url: process.env.REACT_APP_REST_API + "/accept-mentor",
        data: { id: userData.id },
        headers: { Authorization: "Bearer " + token },
      }).then((res) => {
        navigate("/", { replace: true });
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    try {
      axios({
        method: "get",
        url:
          process.env.REACT_APP_REST_API +
          "/mentor/" +
          JSON.parse(localStorage.getItem("userData")).id,
        headers: { Authorization: "Bearer " + token },
      }).then((res) => {
        console.log(res);
        setUserData(res.data.mentorData);
      });
    } catch (err) {
      console.log(err);
    }
  }, []);

  if (!userData) return <Loading />;
  return (
    <div className="w-full">
      <div className="pt-10 py-6 text-center font-bold text-[32px] text-[#8157A1] text-to-[#D27AD3]">
        อนุมัติคำขอเป็นผู้ให้คำปรึกษา
      </div>
      <div className="flex place-content-center">
        <div className="border-2 border-[#8157A1] w-[80%] rounded-3xl">
          <form className="flex flex-col space-y-2" onSubmit={handleVerify}>
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
                        รูปภาพ<div className="">***</div>
                      </div>
                    </div>
                  </div>
                  <div className="flex place-content-center">
                    <img
                      src={
                        userData.profile_image ? userData.profile_image : logo
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
                    <div className="p-2 px-6">
                      เบอร์โทรศัพท์<div className="">***</div>
                    </div>
                    <div>
                      <input
                        type={"text"}
                        className={`${
                          userData.telephone_number
                            ? "border-[#8157A1]/50"
                            : "border-red-500"
                        } border-2 rounded-md w-[100%]`}
                        name=""
                        defaultValue={userData.telephone_number}
                        id=""
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
                      <div className="p-2 px-6 flex">
                        หมายเลขบัตรประชาชน<div className="">***</div>
                      </div>
                      <div>
                        <input
                          type={"text"}
                          className={`${
                            userData.citizenId
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
                            userData.bookbank_number
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
                        disabled={true}
                        className={`${
                          userData.profile_description
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
                    <div className="p-2 px-6">
                      ราคา/ชั่วโมง<div className="">***</div>
                    </div>
                    <div>
                      <input
                        type={"text"}
                        className={`${
                          userData.price_rate
                            ? "border-[#8157A1]/50"
                            : "border-red-500"
                        } border-2 rounded-md w-[100%]`}
                        name=""
                        defaultValue={userData.price_rate}
                        id=""
                        disabled={true}
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
                        disabled={true}
                        className={`${
                          userData.date_time_booking
                            ? "border-[#8157A1]/50"
                            : "border-red-500"
                        } border-2 rounded-md w-[80%]`}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex place-content-end py-4">
              <div className="flex place-content-end sm:px-20 ">
                <button
                  className=" bg-[#F8FD0F] text-[#8157A1] border-2 px-6 sm:px-10 p-2 rounded-md"
                  type="submit"
                >
                  verify
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

export default VerifyMentor;
