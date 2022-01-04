import { PlusIcon } from "@heroicons/react/solid";
import { PlusCircleIcon } from "@heroicons/react/outline";
import { useSession } from "next-auth/react";
import React from "react";

function Story({ avatar, owner }) {
  const { data: session } = useSession();
  return (
    <div className="group cursor-pointer flex flex-col w-12 items-center mx-4 ">
      <div className="relative p-[4px] rounded-full flex justify-center items-center h-16 w-16 bg-gradient-to-tr from-[#d62976] to-[#fa7e1e] group-hover:scale-125 transition-all ease-in-out">
        <img
          className=" border-4 border-white rounded-full  object-cover "
          src={avatar?.avatar || avatar.image}
        />
        {session && owner && (
          <PlusIcon className="absolute p-1 bg-[#d62976] rounded-full text-white h-7 w-7 bottom-0" />
        )}
      </div>
      <p className="text-black truncate w-16 text-center animate-pulse">
        {avatar?.username || avatar.name}
      </p>
    </div>
  );
}

export default Story;
