import React from "react";
import MinProfile from "./MinProfile";
import Posts from "./Posts";
import Strories from "./Strories";
import Suggestions from "./Suggestions";

function Feed() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 mx-auto max-w-4xl">
      <div className="col-span-2 w-full">
        <Strories />
        <Posts className="" />
      </div>
      <div className="col-span-1 w-full">
        <MinProfile />
        <Suggestions />
      </div>
    </div>
  );
}

export default Feed;
