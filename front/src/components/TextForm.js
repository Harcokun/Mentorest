const TextForm = ({ sidetext, sidetextback, type }) => {
  let back = false;
  if (sidetextback) {
    back = true;
  }
  return (
    <div className="p-2 py-6 place-content-center flex w-[full]">
      <div className="w-[80%]  place-content-center flex ">
        <div className="p-2 px-6">{sidetext}</div>
        <input
          type={type}
          className="border-[#8157A1]/50 border-2 rounded-md w-[60%]"
          name=""
          id=""
        />
        {back && <div className="p-2 px-6 opacity-0">{sidetextback}</div>}
      </div>
    </div>
  );
};

export default TextForm;
