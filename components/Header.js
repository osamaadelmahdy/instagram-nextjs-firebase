import Image from "next/image";
import React from "react";
import {
  SearchIcon,
  PlusCircleIcon,
  UserGroupIcon,
  HeartIcon,
  PaperAirplaneIcon,
  MenuIcon,
  HomeIcon,
} from "@heroicons/react/outline";
function Header() {
  return (
    <div className="bg-white bg-opacity-70 backdrop-blur-sm shadow-md z-50 sticky top-0 ">
      <div className="mx-auto max-w-4xl  flex items-center sticky top-0 justify-between py-2 pt-5 px-5 ">
        <div className="relative hidden lg:block w-28 h-8 cursor-pointer">
          <Image
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/1600px-Instagram_logo.svg.png"
            layout="fill"
            objectFit="contain"
          />
        </div>

        {/* flex-shrink-0 : size of the element never gets smaller as screen size gets smaller */}
        <div
          onClick={() => router.push("/")}
          className="relative lg:hidden w-8 h-8 flex-shrink-0 cursor-pointer"
        >
          <Image
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Instagram_simple_icon.svg/2560px-Instagram_simple_icon.svg.png"
            layout="fill"
            objectFit="contain"
          />
        </div>

        {/* <div className="relative  rounded-md w-1/3">
          <div className="absolute pl-3 pointer-none flex items-center top-0 bottom-0">
            <SearchIcon className="h-5 w-5 text-gray-300" />
          </div>
          <input
            className=" h-8 text-lg  bg-gray-50 pl-10 block w-full sm:text-sm border-gray-300 border-2 focus:ring-[#fa7e1e] focus:border-[#d62976] rounded-md"
            type="text"
            placeholder="Search"
          />
        </div> */}

        <div className="flex items-center justify-end space-x-4 ">
          <HomeIcon className="navBtn" />
          <MenuIcon className="w-10 h-10 md:hidden cursor-pointer" />
          <div className="relative navBtn">
            <PaperAirplaneIcon className="rotate-45" />
            <div className="-top-1 text-white animate-bounce -right-1 flex justify-center items-center text-xs absolute w-4 h-4 rounded-full bg-red-600">
              5
            </div>
          </div>

          <PlusCircleIcon className="navBtn" />

          <UserGroupIcon className="navBtn" />
          <HeartIcon className="navBtn" />
          <img
            src="https://www.fillmurray.com/200/200"
            className="rounded-lg w-8 cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
}

export default Header;
