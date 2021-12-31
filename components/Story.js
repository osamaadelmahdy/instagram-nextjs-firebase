import React from "react";

function Story({ avatar }) {
  return (
    <div className="group cursor-pointer flex flex-col w-12 items-center mx-4 ">
      <div className=" p-[4px] rounded-full flex justify-center items-center h-16 w-16 bg-gradient-to-tr from-[#d62976] to-[#fa7e1e] group-hover:scale-125 transition-all ease-in-out">
        <img
          className=" border-4 border-white rounded-full  object-cover "
          src={avatar?.avatar}
        />
      </div>
      <p className="text-black truncate w-16 text-center animate-pulse">
        {avatar?.id == 19 ? null : avatar?.username}
      </p>
    </div>
  );
}

export default Story;
