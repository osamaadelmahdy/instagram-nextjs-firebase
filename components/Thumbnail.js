import React from "react";
import Image from "next/image";
import { ThumbUpIcon } from "@heroicons/react/outline";

function Thumbnail({ result }) {
  const BASE_URL = "https://image.tmdb.org/t/p/original/";
  return (
    <div className=" transition rounded-3xl mx-5 my-5 w-60 sm:w-56 inline-block relative group overflow-hidden cursor-pointer hover:scale-110">
      <Image
        layout="responsive"
        className="object-cover group-hover:scale-110 transition  "
        src={`${BASE_URL}${result.poster_path}`}
        width="700"
        height="1000"
      />
      <div className="translate-y-40 transition w-full h-1/2 flex flex-col items-center p-3 absolute bottom-0 bg-black bg-opacity-100 group-hover:translate-y-0  ">
        <h2 className="font-bold text-white pb-3">
          {result.title || result.name}
        </h2>
        <div className="flex justify-around w-full">
          <h3>{result.release_date || result.first_air_date}</h3>
          <div className="flex w-1/2 justify-center">
            <h3 className="mx-1">{result.vote_average}</h3>
            <ThumbUpIcon className="h-5 w-5" />
          </div>
        </div>

        <p className="overflow-hidden text-ellipsis spa ">{result.overview}</p>
      </div>
    </div>
  );
}

export default Thumbnail;
