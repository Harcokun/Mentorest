import { useContext, useEffect, useState } from "react";
import TextFormRegister from "../components/TextFormRegister";
import axios from "axios";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
// import { UserContext } from "../hooks/UserContext";
import { NavbarContext } from "../hooks/NavbarContext";
import logo from "../hamburger.png";
import Loading from "../components/Loading";

const MentorInfoReservation = () => {
  const navigate = useNavigate();
  const { userId } = useParams();
  const token = localStorage.getItem("token");
  const [userData, setUserData] = useState({});
  const [qrCodeUrl, setQrCodeUrl] = useState("");
  const [isLoading, setLoading] = useState(true);
  const [inputBookingData, setInputBookingData] = useState({
    id_mentor: userId,
    date_booking: "",
    time_booking: "",
    file: "",
  });
  const [isSent, setSent] = useState(false);

  const handleReserve = (e) => {
    e.preventDefault();

    try {
      var formData = new FormData();
      formData.append("id_mentor", userId);
      formData.append("date_booking", inputBookingData.date_booking);
      formData.append("time_booking", inputBookingData.time_booking);
      formData.append("file", inputBookingData.file);

      console.log(formData);
      axios({
        method: "post",
        url: process.env.REACT_APP_REST_API + "/booking",
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
        url: process.env.REACT_APP_REST_API + "/mentor/" + userId,
        headers: { Authorization: "Bearer " + token },
      }).then((res) => {
        console.log(res);
        setUserData(res.data.mentorData);
        setQrCodeUrl(res.data.qrCode);
        setLoading(false);
      });
    } catch (err) {
      console.log(err);
    }
  }, []);

  if (isLoading) return <Loading />;

  return (
    <div className="w-full">
      <div className="pt-10 py-6 text-center font-bold text-[32px] text-[#8157A1] text-to-[#D27AD3]">
        ข้อมูลผู้ให้คำปรึกษา
      </div>
      <div className="flex place-content-center">
        <div className="border-2 border-[#8157A1] w-[80%] rounded-3xl">
          <form className="flex flex-col space-y-2" onSubmit={handleReserve}>
            <div className="space-y-4 pt-10 border-b-2 border-black">
              <div className="flex flex-col sm:flex-row place-content-between">
                <div className="w-full flex flex-col">
                  <div className="w-[100%]">
                    <div className="p-2 sm:py-6 place-content-center flex w-[full]">
                      <div className="w-[80%]  place-content-between flex ">
                        <div className="p-2 sm:px-6 flex">ชื่อจริง</div>
                        <div>
                          <div className={`rounded-md`} name="" id="">
                            {userData.name ? userData.name : "Mentor Name"}
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
                          <div className={`rounded-md`} name="" id="">
                            {userData.surname
                              ? userData.surname
                              : "Mentor Surname"}
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
                        {userData.profile_image ? (
                          <img src={userData.profile_image} width={"60%"} />
                        ) : (
                          <img src={logo} />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="w-[100%]">
                <div className="p-2 sm:py-6 place-content-center flex w-[full]">
                  <div className="w-[100%] flex flex-col ">
                    <div className="p-2 flex place-content-center w-full">
                      <div className="w-[80%]">
                        <div>อธิบายความเป็นตัวเอง</div>
                      </div>
                    </div>
                    <div className="w-full flex place-content-center">
                      <div
                        className={`border-[#8157A1]/50
                         border-2 rounded-md w-[80%]`}
                      >
                        {userData.profile_description
                          ? userData.profile_description
                          : "No Description"}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="sm:w-[50%]">
                <div className="p-2 place-content-center flex w-[full]">
                  <div className="w-[80%]  place-content-between flex ">
                    <div className="  sm:px-4 flex">
                      ราคา(/ชั่วโมง)<div className="text-red-600">*</div>
                    </div>
                    <div>{userData.price ? userData.price : "250"}</div>
                  </div>
                </div>
              </div>
              <div className="w-[100%]">
                <div className="p-2 pb-6 place-content-center flex w-[full]">
                  <div className="w-[100%] flex flex-col ">
                    <div className="p-2  flex place-content-center w-full">
                      <div className="w-[80%]">
                        <div>วัน/เวลาที่สะดวก</div>
                      </div>
                    </div>
                    <div className="w-full flex place-content-center">
                      <div
                        className="border-[#8157A1]/50
                         border-2 rounded-md w-[80%]"
                      >
                        {userData.date_time_booking
                          ? userData.date_time_booking
                          : "Not Defined"}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-bold text-3xl px-8 sm:px-20">
              นัดหมายผู้ให้คำปรึกษา
            </div>
            <div className="flex flex-col sm:flex-row">
              <div className="flex flex-col w-[100%]">
                <div className="w-[100%] ">
                  <div className="p-2 py-6 place-content-center flex w-[full]">
                    <div className="w-full sm:w-[80%]  place-content-between flex ">
                      <div className="  px-4 flex">
                        วันที่<div className="text-red-600">*</div>
                      </div>
                      <div className="w-[60%]">
                        <input
                          type={"text"}
                          className={`border-[#8157A1]/50 border-2 rounded-md w-[80%] sm:w-[100%]`}
                          name=""
                          id=""
                          onChange={(event) => {
                            setInputBookingData({
                              ...inputBookingData,
                              date_booking: event.target.value,
                            });
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-[100%] ">
                  <div className="p-2 py-6 place-content-center flex w-[full]">
                    <div className="w-full sm:w-[80%]  place-content-between flex ">
                      <div className="  px-4 flex">
                        เวลา<div className="text-red-600">*</div>
                      </div>
                      <div className="w-[60%]">
                        <input
                          type={"text"}
                          className={`border-[#8157A1]/50 border-2 rounded-md w-[80%] sm:w-[100%]`}
                          name=""
                          id=""
                          onChange={(event) => {
                            setInputBookingData({
                              ...inputBookingData,
                              time_booking: event.target.value,
                            });
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-[100%]">
                  <div className="p-2 py-6 place-content-center flex w-[full]">
                    <div className="w-full sm:w-[80%]  place-content-between flex flex-col">
                      <div className="p-2 px-6 flex">รูปภาพ</div>
                      <div className="flex-col px-6 flex">
                        <input
                          type="file"
                          className={`${
                            !isSent || !inputBookingData.profileImg
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
                              setInputBookingData({
                                ...inputBookingData,
                                file: objectUrl,
                              });
                              // free memory when ever this component is unmounted
                              return () => URL.revokeObjectURL(objectUrl);
                            }
                          }}
                        />
                        <img
                          src={
                            inputBookingData.file ? inputBookingData.file : logo
                          }
                          width={"100%"}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-[100%]">
                <div className="p-2 py-6 place-content-center flex w-[full]">
                  <div className="w-full sm:w-[80%]  place-content-between flex  flex-col">
                    <div className="px-4 flex">qrcode การโอนเงิน</div>
                    <div className="flex place-content-center">
                      <img src={qrCodeUrl} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex place-content-center py-4">
              <div className="w-1/2 flex place-content-center sm:pl-20">
                <button
                  className=" text-[#8157A1] border-2 border-[#8157A1] hover:bg-[#8157A1] hover:text-white sm:px-10 p-2 rounded-md"
                  onClick={() => {
                    navigate("/", { replace: true });
                  }}
                >
                  ย้อนกลับ
                </button>
              </div>
              <div className="w-1/2 flex place-content-center">
                <button
                  className="bg-[#8157A1] text-white sm:px-10 p-2 rounded-md"
                  type="submit"
                  disabled={!inputBookingData.date_booking || !inputBookingData.time_booking || !inputBookingData.file}
                >
                  นัดหมาย
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MentorInfoReservation;
