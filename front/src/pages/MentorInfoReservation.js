import { useContext, useEffect, useState } from "react";
import TextFormRegister from "../components/TextFormRegister";
import axios from "axios";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
// import { UserContext } from "../hooks/UserContext";
import { NavbarContext } from "../hooks/NavbarContext";
import logo from "../hamburger.png";

const MentorInfoReservation = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  // const id = searchParams.entries();
  const [SlipCSS, setSlipCSS] = useState();
  const [NameData, setNameData] = useState("");
  const [SurnameData, setSurnameData] = useState("");
  const [CitizenID, setCitizenID] = useState("");
  const [BankID, setBankID] = useState("");
  const [Yourself, setYourself] = useState("");
  const [price, setPrice] = useState("");
  const [Datetime, setDatetime] = useState("");

  const [MoneyProfile, setMoneyProfile] = useState();
  const [MoneyProfileURL, setMoneyProfileURL] = useState();
  const [Profile, setProfile] = useState();
  const [ProfileURL, setProfileURL] = useState();
  const [ProfileCitizen, setProfileCitizen] = useState();
  const [ProfileCitizenURL, setProfileCitizenURL] = useState();
  const [Slip, setSlip] = useState();
  const [SlipURL, setSlipURL] = useState();
  const [textarea, setTextarea] = useState(
    "The content of a textarea goes in the value attribute"
  );
  const [textareaDate, setTextareaDate] = useState(
    "The content of a textarea goes in the value attribute"
  );

  const handleBack = () => {
    //go back
    navigate("/", { replace: true });
  };
  const handleReserve = () => {
    //go back
    navigate("/", { replace: true });
  };
  const handleTextareaChange = (event) => {
    setTextarea(event.target.value);
  };
  const handleSetProfile = (e) => {
    setProfile(e.target.files[0]);
  };
  const handleSetSlip = (e) => {
    setSlip(e.target.files[0]);
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
    if (true) {
      try {
        var formData = new FormData();
        formData.append("email", e.target[0].value);
        formData.append("password", e.target[1].value);
        formData.append("name", e.target[3].value);
        formData.append("surname", e.target[5].value);
        formData.append("file", e.target[4].files[0]);
        formData.append("file", e.target[6].files[0]);
        formData.append("file", e.target[7].files[0]);
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
  useEffect(() => {
    setState("register");
    if (!Slip) {
      setSlipURL(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(Slip);
    setSlipURL(objectUrl);

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [Slip]);
  return (
    <div className="w-full">
      <div className="pt-10 py-6 text-center font-bold text-[32px] text-[#8157A1] text-to-[#D27AD3]">
        ลงทะเบียนสำหรับผู้ให้คำปรึกษา
      </div>
      <div className="flex place-content-center">
        <div className="border-2 border-[#8157A1] w-[80%] rounded-3xl">
          <form className="flex flex-col space-y-2" onSubmit={handleSubmit}>
            <div className="space-y-4 pt-10 border-b-2 border-black">
              <div className="flex flex-col sm:flex-row place-content-between">
                <div className="w-full flex flex-col">
                  <div className="w-[100%]">
                    <div className="p-2 sm:py-6 place-content-center flex w-[full]">
                      <div className="w-[80%]  place-content-between flex ">
                        <div className="p-2 sm:px-6 flex">ชื่อจริง</div>
                        <div>
                          <div className={`rounded-md`} name="" id="">
                            {NameData ? NameData : "NameData"}
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
                            {SurnameData ? SurnameData : "SurnameData"}
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
                        {textarea}
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
                    <div>{price ? price : "price"}</div>
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
                        {textareaDate}
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
                            !SlipCSS ? "border-[#8157A1]/50" : "border-red-500"
                          } border-2 rounded-md w-[100%]`}
                          name=""
                          id=""
                          onChange={handleSetSlip}
                        />
                        {/* <button className="w-[60%]">
                          <a href={ProfileURL} target="_blank">
                            Preview
                          </a>
                        </button> */}
                        <img src={SlipURL} width={"100%"} />
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
                      <img src={logo} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex place-content-center py-4">
              <div className="w-1/2 flex place-content-center sm:pl-20">
                <button
                  className=" text-[#8157A1] border-2 border-[#8157A1] hover:bg-[#8157A1] hover:text-white sm:px-10 p-2 rounded-md"
                  onClick={handleBack}
                >
                  ย้อนกลับ
                </button>
              </div>
              <div className="w-1/2 flex place-content-center">
                <button
                  className="bg-[#8157A1] text-white sm:px-10 p-2 rounded-md"
                  onClick={handleReserve}
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
