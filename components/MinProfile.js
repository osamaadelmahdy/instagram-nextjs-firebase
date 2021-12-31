import React from "react";

function MinProfile() {
  return (
    <div className="hidden sticky top-[80px] md:flex my-5  ml-5 items-center justify-between space-x-2">
      <img
        src="https://www.fillmurray.com/200/200"
        className="rounded-full h-16 w-16"
      />
      <div className="flex flex-col flex-1 ">
        <h1 className="font-semibold uppercase">osama adel</h1>
        <p className="text-sm text-gray-400">welcome osama to instagram</p>
      </div>
      <button className="p-2 text-blue-400">Log Out</button>
    </div>
  );
}

export default MinProfile;
