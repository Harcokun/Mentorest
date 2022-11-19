import MentorList from "./MentorList";

const MentorLists = ({ Mentorlists }) => {
  return (
    <div className="w-full">
      <div className="grid sm:grid-cols-3">
        {Mentorlists.map((Mentor) => {
          console.log(Mentor.name, "aaaaaaaaaa");
          return (
            <div className=" place-content-center flex p-4">
              <div className="w-[70%]">
                <MentorList
                  name={Mentor.name}
                  description={Mentor.description}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MentorLists;
