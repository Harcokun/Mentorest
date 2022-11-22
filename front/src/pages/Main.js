import axios from "axios";
import { useContext, useEffect } from "react";
import MentorLists from "../components/MentorLists";
import TextForm from "../components/TextForm";
import { NavbarContext } from "../hooks/NavbarContext";
import { UserContext } from "../hooks/UserContext";
import { useNavigate } from "react-router-dom";

const Main = () => {
  // const { Username, Password, Token, isLogin } = useContext(UserContext);
  // const { setState } = useContext(NavbarContext);

  const Mentors = [
    {
      name: "Antorino Ropadine",
      description:
        "human being, a culture-bearing primate classified in the genus Homo, especially the species H. sapiens. Human beings are anatomically similar and related to the great apes but are distinguished by a more highly developed brain and a resultant capacity for articulate speech and abstract reasoning",
    },
    {
      name: "Barlowe Whitlock",
      description:
        "human being, a culture-bearing primate classified in the genus Homo, especially the species H. sapiens. Human beings are anatomically similar and related to the great apes but are distinguished by a more highly developed brain and a resultant capacity for articulate speech and abstract reasoning",
    },
    {
      name: "Caddel Hart",
      description:
        "human being, a culture-bearing primate classified in the genus Homo, especially the species H. sapiens. Human beings are anatomically similar and related to the great apes but are distinguished by a more highly developed brain and a resultant capacity for articulate speech and abstract reasoning",
    },
    {
      name: "Katz Laurier",
      description:
        "human being, a culture-bearing primate classified in the genus Homo, especially the species H. sapiens. Human beings are anatomically similar and related to the great apes but are distinguished by a more highly developed brain and a resultant capacity for articulate speech and abstract reasoning",
    },
    {
      name: "Madden Elrod",
      description:
        "human being, a culture-bearing primate classified in the genus Homo, especially the species H. sapiens. Human beings are anatomically similar and related to the great apes but are distinguished by a more highly developed brain and a resultant capacity for articulate speech and abstract reasoning",
    },
  ];
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
  }, []);
  return (
    <div className="w-full h-full">
      {/* <div className="pt-10 py-6 font-bold text-[32px] text-[#8157A1] text-to-[#D27AD3] flex place-items-center place-content-center">
        Mentorest
      </div> */}
      <div>
        <MentorLists Mentorlists={Mentors} />
      </div>
    </div>
  );
};

export default Main;
