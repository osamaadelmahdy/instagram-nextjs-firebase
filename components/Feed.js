import { PlusIcon } from "@heroicons/react/solid";
import { useSession } from "next-auth/react";
import React from "react";
import MinProfile from "./MinProfile";
import Posts from "./Posts";
import Strories from "./Strories";
import Suggestions from "./Suggestions";

function Feed() {
  const { data: session } = useSession();
  return (
    <div
      className={`
    grid grid-cols-2 md:grid-cols-3 mx-auto max-w-4xl
   ${!session && "!grid-cols-1 !md:grid-cols-1 !max-w-xl"}`}
    >

      <div className="col-span-2 w-full">
        <Strories />
        <Posts className="" />
      </div>
      {session && (
        <div className="col-span-1 w-full">
          <MinProfile />
          <Suggestions />
        </div>
      )}
    </div>
  );
}

export default Feed;
