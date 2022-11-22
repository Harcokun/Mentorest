import axios from "axios";
import { useContext, useEffect, useState } from "react";
import MentorLists from "../components/MentorLists";
import TextForm from "../components/TextForm";
import { NavbarContext } from "../hooks/NavbarContext";
import { UserContext } from "../hooks/UserContext";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";

const Main = () => {
  // const { Username, Password, Token, isLogin } = useContext(UserContext);
  // const { setState } = useContext(NavbarContext);
  const token = localStorage.getItem("token");
  const userData = JSON.parse(localStorage.getItem("userData"));
  const [mentorLists, setMentorLists] = useState({});
  const [isLoading, setLoading] = useState(true);
  
  const handleSubmit = (e) => {
    // console.log(e.target[0].value, e.target[1].value);
    // console.log(process.env.REACT_APP_REST_API, "yoyo");
    try {
      axios.post(process.env.REACT_APP_REST_API + "/");
    } catch (err) {}
    e.preventDefault();
  };
  useEffect(() => {
    if (localStorage.getItem("loginState") === "login") {
      localStorage.setItem("navBarState", "main");
      // setState("main");
      //getData
    } else {
      localStorage.setItem("navBarState", "main-not-login");
      // setState("main-not-login");
    }

    const fetchData = async () => {
      try {
        await axios({
          method: "get",
          url: process.env.REACT_APP_REST_API + "/view-all-mentor",
        }).then((res) => {
          console.log(res);
          setMentorLists(res.data);
          setLoading(false);
        });
      } catch (err) {
        console.log(err);
      }
    }

    fetchData();
  }, []);

  if(isLoading) return <Loading/>
  return (
    <div className="w-full h-full">
      {/* <div className="pt-10 py-6 font-bold text-[32px] text-[#8157A1] text-to-[#D27AD3] flex place-items-center place-content-center">
        Mentorest
      </div> */}
      <div>
        <MentorLists Mentorlists={mentorLists} role={userData.position} />
      </div>
    </div>
  );
};

export default Main;
