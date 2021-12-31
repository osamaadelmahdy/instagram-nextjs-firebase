import React from "react";
import {
  BookmarkIcon,
  ChatIcon,
  DotsHorizontalIcon,
  EmojiHappyIcon,
  HeartIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/outline";

function Post({ post }) {
  const d = new Date(post.publishDate);
  let y = d.getFullYear();
  let m = d.getMonth() + 1;
  let day = d.getDay() + 1;

  return (
    <div className="bg-white my-10 shadow-md  rounded-lg border">
      <div className="flex justify-between items-center p-3">
        <div className="flex justify-end items-center">
          <div className="h-10 w-10 rounded-full bg-black mr-3">
            <img src={post.owner.picture} className="rounded-full" />
          </div>
          <div>
            <h1 className="font-bold">
              {post.owner.firstName + " " + post.owner.lastName}
            </h1>
            <p>{day + "-" + m + "-" + y}</p>
          </div>
        </div>
        <DotsHorizontalIcon className="w-5 h-5" />
      </div>

      <div className="w-full object-cover overflow-hidden ">
        <img src={post.image} className="w-full" />
      </div>

      <div className=" p-3 text-black flex justify-between items-center w-full h-10 ">
        <div className="flex space-x-3 ">
          <HeartIcon className=" w-5 h-5 hover:scale-125 transition-all" />
          <ChatIcon className="w-5 h-5 hover:scale-125 transition-all" />
          <PaperAirplaneIcon className="w-5 h-5 hover:scale-125 transition-all rotate-45" />
        </div>
        <div>
          <BookmarkIcon className="w-5 h-5 hover:scale-125 transition-all" />
        </div>
      </div>

      <div className="p-3">
        <h1 className="font-bold"></h1>
        <span className="font-bold mr-2 ">{post.likes} Like</span>
        {post.text}
        <div className="flex space-x-2">
          {post.tags.map((tag, i) => (
            <p key={i} className=" py-1 before:content-['#']  text-blue-500">
              {tag}
            </p>
          ))}
        </div>
      </div>
      <form className="flex items-center p-4">
        <EmojiHappyIcon className="h-7 text- text-[#d62976] " />
        <input
          type="text"
          className="mx-5 flex-1 rounded-md border-gray-400 h-9"
          placeholder="Add a comment..."
        />
        <button className="bg-gradient-to-tr from-[#d62976] to-[#fa7e1e] text-white border-2 rounded-lg px-2 py-1 font-bold">
          Post
        </button>
      </form>
    </div>
  );
}

export default Post;
