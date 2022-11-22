import logo from "../icon-human.png";
import { Link } from "react-router-dom";
const MentorList = ({ mentorData, role }) => {
  const url =
    role === "user"
      ? "/user/info/reserve/" + mentorData.id
      : role === "mentor"
      ? ""
      : role === "admin"
      ? "/user/mentor/verify/" + mentorData.id
      : "";
  return (
    <div>
      <Link to={url}>
        <img
          src={mentorData.profile_image ? mentorData.profile_image : logo}
          className="w-60 h-60 py-4 rounded-full overflow-hidden"
        />
      </Link>

      <div className="border-b-2 border-black text-xl flex">
        {mentorData.name} {mentorData.surname}
      </div>
      <div className="text-lg flex">{mentorData.profile_description}</div>
    </div>
  );
};

export default MentorList;
