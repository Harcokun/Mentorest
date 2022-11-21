import axios from "axios";
import { useContext, useEffect, useState } from "react";
import DeleteAccountButton from "../components/DeleteAccountButton";
import Loading from "../components/Loading";
import TextFormRegister from "../components/TextFormRegister";
import { UserContext } from "../hooks/UserContext";

const EditProfileMentor = (userId) => {
  const { Username, setUsername, Password, setPassword, Token, setToken } =
    useContext(UserContext);
  const [userData, setUserData] = useState();
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

    if (isPasswordValid) {
      try {
        var formData = new FormData();
        if (inputUserData.password)
          formData.append("password", inputUserData.password);
        if(inputUserData.profileImg) formData.append("file", inputUserData.profileImg);
        if(inputUserData.phoneNumber) formData.append("phoneNumber", inputUserData.phoneNumber);
        if(inputUserData.description) formData.append("description", inputUserData.description);
        if(inputUserData.price) formData.append("price", inputUserData.price);
        if(inputUserData.availableTime) formData.append("availableTime", inputUserData.availableTime);
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

  useEffect(() => {
    try {
      axios
        .get(
          process.env.REACT_APP_REST_API + "/user/info/" + userId,
          {},
          {
            headers: {
              Authorization: "Bearer " + Token,
            },
          }
        )
        .then((res) => {
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
                    <div className="p-2 px-6 flex">
                      อีเมล<div className="font-bold">***</div>
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
                  <TextFormRegister
                    sidetext="รหัสผ่าน"
                    type="password"
                    sidetextback=""
                    color={userData.password ? "" : "rgb(239 68 68)"}
                    isRequired={true}
                  />
                </div>
                <div className="sm:w-[50%]">
                  <TextFormRegister
                    sidetext="ยืนยันรหัสผ่าน"
                    type="password"
                    sidetextback=""
                    color={userData.password ? "" : "rgb(239 68 68)"}
                    isRequired={true}
                  />
                </div>
              </div>
              <div className="sm:flex place-content-between">
                <div className="sm:w-[50%]">
                  <div className="p-2 py-6 place-content-center flex w-[full]">
                    <div className="w-full sm:w-[80%]  place-content-between flex ">
                      <div className="p-2 px-6 flex">
                        ชื่อจริง<div className="font-bold">***</div>
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
                      </div>
                    </div>
                  </div>
                  <div className="flex place-content-center">
                    <img
                      src={
                        inputUserData.profileImgUrl
                          ? inputUserData.profileImgUrl
                          : userData.profileImgUrl
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
                      นามสกุล<div className="font-bold">***</div>
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
              <div className="sm:flex place-content-between">
                <div className="sm:w-[50%]">
                  <div className="p-2 py-6 place-content-center flex w-[full]">
                    <div className="w-full sm:w-[80%]  place-content-between ">
                      <div className="p-2 px-6 flex">
                        รูปบัตรประชาชน<div className="font-bold">***</div>
                      </div>
                      <div className="flex-col px-6  flex">
                        <img src={userData.citizenCardImgUrl} width={"100%"} />
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
                        <img src={userData.bankAccountImgUrl} width={"100%"} />
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
                          userData.description
                            ? userData.description
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
