import axios from "axios";
import { useContext, useEffect, useState } from "react";
import DeleteAccountButton from "../components/DeleteAccountButton";
import TextFormRegister from "../components/TextFormRegister";
import { UserContext } from "../hooks/UserContext";

const EditProfileMentee = () => {
  const { Username, setUsername, Password, setPassword, Token, setToken } =
    useContext(UserContext);
  const RegExEmail = /.+@.+\..+/gm;
  const [EmailTextCSS, setEmailTextCSS] = useState("");
  const [PasswordCSS, setPasswordCSS] = useState("");
  const [NameCSS, setNameCSS] = useState("");
  const [SurnameCSS, setSurnameCSS] = useState("");
  const [ImageCSS, setImageCSS] = useState("");
  const [EmailData, setEmailData] = useState("");
  const [NameData, setNameData] = useState("");
  const [SurnameData, setSurnameData] = useState("");
  const [ImageData, setImageData] = useState("");
  const [FileURL, setFileURL] = useState();
  const handleSetFile = (e) => {
    setImageData(e.target.files[0]);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e);
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
    if (NameData) {
      setNameCSS("");
    } else {
      setNameCSS("rgb(239 68 68)");
    }
    if (SurnameData) {
      setSurnameCSS("");
    } else {
      setSurnameCSS("rgb(239 68 68)");
    }
    if (ImageData) {
      setImageCSS("");
    } else {
      setImageCSS("rgb(239 68 68)");
    }

    if (
      checkPassword &&
      checkEmail &&
      e.target[0].value &&
      e.target[1].value &&
      e.target[2].value &&
      e.target[3].value &&
      e.target[4].value &&
      e.target[5].value
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
          setImageData(res.data.image);
        });
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    if (!ImageData) {
      setFileURL(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(ImageData);
    setFileURL(objectUrl);

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [ImageData]);
  return (
    <div className="w-full">
      <div className="pt-10 py-6 text-center font-bold text-[32px] text-[#8157A1] text-to-[#D27AD3]">
        ??????????????????????????????????????????????????????
      </div>
      <div className="flex place-content-center">
        <div className="border-2 border-[#8157A1] w-[80%] rounded-3xl">
          <form className="flex flex-col space-y-2" onSubmit={handleSubmit}>
            <div className="space-y-4 pt-10">
              <div className="sm:w-[50%]">
                <div className="p-2 py-6 place-content-center flex w-[full]">
                  <div className="w-full sm:w-[80%]  place-content-between flex ">
                    <div className="p-2 px-6">???????????????</div>
                    <div>
                      <input
                        type={"text"}
                        className={`${
                          !EmailTextCSS
                            ? "border-[#8157A1]/50"
                            : "border-red-500"
                        } border-2 rounded-md w-[100%]`}
                        name=""
                        value={EmailData}
                        id=""
                        onChange={handleEmailChange}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="sm:flex place-content-between">
                <div className="sm:w-[50%]">
                  <TextFormRegister
                    sidetext="????????????????????????"
                    type="password"
                    sidetextback=""
                    color=""
                  />
                </div>
                <div className="sm:w-[50%]">
                  <TextFormRegister
                    sidetext="??????????????????????????????????????????"
                    type="password"
                    sidetextback=""
                    color={PasswordCSS}
                  />
                </div>
              </div>
              <div className="sm:flex place-content-between">
                <div className="sm:w-[50%]">
                  <div className="p-2 py-6 place-content-center flex w-[full]">
                    <div className="w-full sm:w-[80%]  place-content-between flex ">
                      <div className="p-2 px-6">????????????????????????</div>
                      <div>
                        <input
                          type={"text"}
                          className={`${
                            !NameCSS ? "border-[#8157A1]/50" : "border-red-500"
                          }  border-2 rounded-md w-[100%]`}
                          name=""
                          value={NameData}
                          id=""
                          onChange={handleNameChange}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="sm:w-[50%]">
                  <div className="p-2 py-6 place-content-center flex w-[full]">
                    <div className="w-full sm:w-[80%]  place-content-between flex flex-col">
                      <div className="p-2 px-6">"??????????????????"</div>
                      <div className="flex-col px-6 flex">
                        <input
                          type="file"
                          className={`${
                            !ImageCSS ? "border-[#8157A1]/50" : "border-red-500"
                          } border-2 rounded-md w-[100%]`}
                          name=""
                          id=""
                          onChange={handleSetFile}
                        />
                        {/* <button className="w-[100%]">
                          <a href={FileURL} target="_blank">
                            Preview
                          </a>
                        </button> */}
                        <img src={FileURL} width={"100%"} />
                      </div>
                    </div>
                  </div>
                  {/* <div className="flex place-content-center"></div> */}
                </div>
              </div>
              <div className="sm:w-[50%]">
                <div className="p-2 py-6 place-content-center flex w-[full]">
                  <div className="w-full sm:w-[80%]  place-content-between flex ">
                    <div className="p-2 px-6">?????????????????????</div>
                    <div>
                      <input
                        type={"text"}
                        className={`${
                          !SurnameCSS ? "border-[#8157A1]/50" : "border-red-500"
                        } border-2 rounded-md w-[100%]`}
                        name=""
                        value={SurnameData}
                        id=""
                        onChange={handleSurnameChange}
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
                  ??????????????????
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
