import React from "react";
import Suggestion from "./Suggestion";

function Suggestions() {
  return (
    <div className="my-5 ml-5 sticky top-[160px] hidden md:block ">
      <div className="flex items-center justify-between  p-2 ">
        <h1 className="capitalize text-sm text-gray-500 font-semibold">
          suggestions for you
        </h1>
        <button className="text-blue-400 ">See All</button>
      </div>
      {[1, 2, 3, 4, 5].map((_, i) => (
        <Suggestion key={i} />
      ))}
    </div>
  );
}

export default Suggestions;
