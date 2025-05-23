import React from "react";

const Header = () => {
  return (
    <div className="p-5 md:p-10">
      <div className="flex justify-between align-middle">
        <p className="text-3xl font-extrabold tracking-wide">
          DOCTOR<span className="font-extralight">ME</span>
        </p>
        <p
          onClick={() => alert("Gotcha!")}
          className="bg-white cursor-pointer text-black p-2 rounded-md text-sm tracking-widest mt-0 md:text-md md:mt-0 hover:scale-105"
        >
          Find a Doctor!
        </p>
      </div>
    </div>
  );
};

export default Header;
