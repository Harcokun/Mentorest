import axios from "axios";
import { useContext, useEffect, useState } from "react";
import DeleteAccountButton from "../components/DeleteAccountButton";
import Loading from "../components/Loading";
import TextFormRegister from "../components/TextFormRegister";
import { UserContext } from "../hooks/UserContext";
import { useNavigate } from "react-router-dom";

const EditProfileMentee = () => {
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
    email: "",
    name: "",
    surname: "",
    profileImg: "",
    profileImgUrl: "",
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
      console.log("input:", inputUserData);
      var formData = new FormData();
      if (isPasswordValid) formData.append("password", inputUserData.password);
      if (inputUserData.email) formData.append("email", inputUserData.email);
      if (inputUserData.name) formData.append("name", inputUserData.name);
      if (inputUserData.surname)
        formData.append("surname", inputUserData.surname);
      if (inputUserData.profileImg)
        formData.append("profile_image", inputUserData.profileImgUrl);
      console.log(formData);
      axios({
        method: "post",
        url: process.env.REACT_APP_REST_API + "/user/update",
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
        url: process.env.REACT_APP_REST_API + "/user/info/",
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
              <div className="sm:w-[50%]">
                <div className="p-2 py-6 place-content-center flex w-[full]">
                  <div className="w-full sm:w-[80%]  place-content-between flex ">
                    <div className="p-2 px-6 flex">อีเมล</div>
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
                      <div className="p-2 px-6 flex">ชื่อจริง</div>
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
                      <div className="p-2 px-6 flex">รูปภาพ</div>
                      <div className="flex-col px-6 flex">
                        <input
                          type="file"
                          className={`${
                            !isSent &&
                            !(userData.profile_image || inputUserData.profileImg)
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
                    <div className="p-2 px-6 flex">นามสกุล</div>
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

export default EditProfileMentee;
