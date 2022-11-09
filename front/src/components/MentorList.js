import logo from "../icon-human.png";
const MentorList = ({ name, description }) => {
  console.log(name, "name");
  return (
    <div>
      <img src={logo} className="w-full py-4" />
      <div className="border-b-2 border-black text-xl flex">{name}</div>
      <div className="text-lg flex">{description}</div>
    </div>
  );
};

export default MentorList;
