const TextFormRegister = ({ sidetext, sidetextback, type, color, isRequired }) => {
  let back = false;
  if (sidetextback) {
    back = true;
  }
  return (
    <div className="p-2 py-6 place-content-center flex w-[full]">
      <div className="w-full sm:w-[80%]  place-content-between flex ">
        <div className="flex flex-row p-2 px-6">{sidetext}{isRequired? <p className="text-red-600">*</p> : ""}</div>
        <div>
          <input
            type={type}
            className={`${
              !color ? "border-[#8157A1]/50" : color
            } border-2 rounded-md w-[100%]`}
            name=""
            id=""
            onChange={() => {
              console.log(color);
            }}
          />
        </div>
        {back && <div className="p-2 px-6 opacity-0">{sidetextback}</div>}
      </div>
    </div>
  );
};

export default TextFormRegister;
