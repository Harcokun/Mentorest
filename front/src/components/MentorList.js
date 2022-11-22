import logo from "../icon-human.png";
const MentorList = ({ id, name, description, image, role }) => {
  const url = role === "user"? "/user/info/reserve/"+id : "admin"? "/user/mentor/verify/" + id : "";
  return (
    <div>
      <img src={image? image : logo} className="w-60 h-60 py-4 rounded-full overflow-hidden"  />
      <div className="border-b-2 border-black text-xl flex">{name}</div>
      <div className="text-lg flex">{description}</div>
    </div>
  );
};

export default MentorList;
