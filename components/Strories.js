import React, { useEffect, useState } from "react";
import faker from "faker";
import Story from "./Story";

function Strories() {
  const [avatar, setAvatar] = useState([]);
  useEffect(() => {
    const users = [...Array(20)].map((_, i) => ({
      avatar: `https://i.pravatar.cc/100?img=${i}`,
      id: i,
      username: faker.name.findName(),
    }));

    setAvatar(users);
    console.log(avatar[15]);
  }, []);
  return (
    <div className=" bg-gray-100 p-5 flex scrollbar-thin scrollbar-thumb-gray-300  ">
      {/* {avatar ? (
        <div className="animate-bounce">
          <Story avatar={avatar[19]} key={avatar[19]} />
        </div>
      ) : (
        <></>
      )} */}

      {avatar ? (
        avatar.map((ava) => <Story avatar={ava} key={ava.id} />)
      ) : (
        <div class="flex items-center justify-center ">
          <div className="w-5 h-5 border-t-transparent border-4 border-black border-solid rounded-full animate-spin"></div>
        </div>
      )}
    </div>
  );
}

export default Strories;
