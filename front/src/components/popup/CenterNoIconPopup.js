import React from 'react';
import CustomPopup from './template/CustomPopup';

const CenterNoIconPopup = ({
  heading,
  description,
  description2,
  onClick,
}) => {
  return (
    <div className="text-center">
      <CustomPopup>
        <h1 className="text-[#000000] mt-0 mb-4 font-[kanit] font-medium text-2xl z-70">
          {heading}
        </h1>
        <h1 className="text-primary mt-0 mb-4 font-[kanit] font-medium text-2xl z-70">
          {description}
        </h1>
        <h1 className="text-[#000000] mt-0 font-[kanit] font-bold text-xl z-70">
          {description2}
        </h1>
        <div className="flex flex-col items-center py-2 z-70">
          <button
            className="
            bg-primary
            text-white
            w-5/6
            h-10
            rounded-full z-70"
            onClick={onClick}
          >ตกลง</button>
        </div>
      </CustomPopup>
    </div>
  );
};

export default CenterNoIconPopup;
