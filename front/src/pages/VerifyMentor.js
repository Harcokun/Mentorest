import { useContext, useEffect, useState } from "react";
import TextFormRegister from "../components/TextFormRegister";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
// import { UserContext } from "../hooks/UserContext";
import { NavbarContext } from "../hooks/NavbarContext";
import logo from "../hamburger.png";

const VerifyMentor = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const RegExEmail = /.+@.+\..+/gm;
  const [EmailData, setEmailData] = useState("");
  const [PasswordData, setPasswordData] = useState("");
  const [RePasswordData, setRePasswordData] = useState("");
  const [NameData, setNameData] = useState("");
  const [SurnameData, setSurnameData] = useState("");
  const [PhoneNumber, setPhoneNumber] = useState("");
  const [CitizenID, setCitizenID] = useState("");
  const [BankID, setBankID] = useState("");
  const [Yourself, setYourself] = useState("");
  const [price, setPrice] = useState("");
  const [Datetime, setDatetime] = useState("");
  const [MoneyProfileURL, setMoneyProfileURL] = useState();
  const [ProfileURL, setProfileURL] = useState();
  const [ProfileCitizenURL, setProfileCitizenURL] = useState();

  const handleVerify = () => {
    //go back
    navigate("/", { replace: true });
  };
  const handleFinish = () => {
    //go back
    navigate("/", { replace: true });
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
    setState("main");
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
        setPhoneNumber(res.data.phone);
        setCitizenID(res.data.citizenID);
        setBankID(res.data.bankID);
        setYourself(res.data.about);
        setPrice(res.data.price);
        setDatetime(res.data.date);
        setMoneyProfileURL(res.data.bankimage);
        setProfileCitizenURL(res.data.citizencard);
        navigate("/login", { replace: true });
      });
    } catch (err) {
      console.log(err);
    }
  }, []);
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
                  <div className="w-[80%]  place-content-between flex ">
                    <div className="p-2 sm:px-6 flex">อีเมล</div>
                    <div className="p-2">
                      <div className={`rounded-md`} name="" id="">
                        {EmailData ? EmailData : "EmailData"}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="sm:flex place-content-between">
                <div className="sm:w-[50%]">
                  <div className="p-2 py-6 place-content-center flex w-[full]">
                    <div className="w-[80%]  place-content-between flex ">
                      <div className="p-2 sm:px-6">รหัสผ่าน</div>
                      <div className="p-2">
                        {PasswordData ? PasswordData : "PasswordData"}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="sm:w-[50%]">
                  <div className="p-2 py-6 place-content-center flex w-[full]">
                    <div className="w-[80%]  place-content-between flex ">
                      <div className="p-2 sm:px-6">ยืนยันรหัสผ่าน</div>
                      <div className="p-2">
                        {RePasswordData ? RePasswordData : "RePasswordData"}
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
                          <div className={`rounded-md p-2`} name="" id="">
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

              <div className="sm:flex place-content-between">
                <div className="sm:w-[50%]">
                  <div className="p-2 py-6 place-content-center flex w-[full]">
                    <div className="w-full sm:w-[80%]  place-content-between flex ">
                      <div className="  px-6 flex">เบอร์โทรศัพท์</div>
                      <div>
                        <div className={`rounded-md w-[100%]`} name="" id="">
                          {PhoneNumber ? PhoneNumber : "PhoneNumber"}
                        </div>
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
                      <div>{CitizenID ? CitizenID : "CitizenID"}</div>
                    </div>
                  </div>
                </div>
                <div className="sm:w-[50%]">
                  <div className="p-2 py-6 place-content-center flex w-[full]">
                    <div className="w-full sm:w-[80%]  place-content-between flex ">
                      <div className="  px-6 flex">หมายเลขบัญชีธนาคาร</div>
                      <div>
                        <div>{BankID ? BankID : "BankID"}</div>
                      </div>
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
                      <div className="p-2 px-6">รูปหน้าสมุดบัญชีธนาคาร</div>
                      <div className="flex-col flex px-6 ">
                        <img src={MoneyProfileURL} width={"60%"} />
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
                      <div
                        className={`border-[#8157A1]/50
                         border-2 rounded-md w-[80%]`}
                      >
                        {Yourself ? Yourself : "Yourself"}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="sm:flex place-content-between">
                <div className="sm:w-[50%]">
                  <div className="p-2 py-6 place-content-center flex w-[full]">
                    <div className="w-full sm:w-[80%]  place-content-between flex ">
                      <div className="  px-6 flex">ราคา(/ชั่วโมง)</div>
                      <div>{price ? price : "price"}</div>
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
                      <div
                        className={`border-[#8157A1]/50
                         border-2 rounded-md w-[80%]`}
                      >
                        {Datetime ? Datetime : "Datetime"}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex place-content-end py-4">
              <div className="flex place-content-end sm:px-20 ">
                <button
                  className=" bg-[#F8FD0F] text-[#8157A1] border-2 px-6 sm:px-10 p-2 rounded-md"
                  onClick={handleVerify}
                >
                  verify
                </button>
              </div>
              <div className="px-2 sm:px-5  sm:pr-28 flex">
                <button
                  className="bg-[#8157A1] text-white px-6 sm:px-10 p-2 rounded-md"
                  onClick={handleFinish}
                >
                  เสร็จสิ้น
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default VerifyMentor;
