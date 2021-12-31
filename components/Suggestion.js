import React, { useEffect, useState } from "react";

function Suggestion() {
  const [user, setUser] = useState();
  useEffect(() => {
    fetch("https://randomuser.me/api/")
      .then((data) => data.json())
      .then((data) => {
        setUser(data);
      });
  }, []);
  return (
    <>
      {user ? (
        <div className=" mt-3 px-3 flex items-center justify-between">
          <img
            src={user.results[0].picture.medium}
            className="mr-3 h-10 w-10 rounded-full border"
          />
          <div className="flex flex-col flex-1 ">
            <h1 className="font-semibold">
              {user.results[0].name.first + " " + user.results[0].name.last}
            </h1>
            <p className="text-gray-400">{user.results[0].location.country}</p>
          </div>
          <button className="text-blue-400">Follow</button>
        </div>
      ) : (
        <div className="flex items-center justify-center ">
          <div className="w-5 h-5 border-t-transparent border-4 border-black border-solid rounded-full animate-spin"></div>
        </div>
      )}
    </>
  );
}

export default Suggestion;
