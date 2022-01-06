import React, { useEffect, useState } from "react";
import {
  BookmarkIcon,
  ChatIcon,
  DotsHorizontalIcon,
  EmojiHappyIcon,
  HeartIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/outline";
import { HeartIcon as HeartIconFilled } from "@heroicons/react/solid";
import { useSession } from "next-auth/react";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { db } from "../firebase";

function Post({ post, id }) {
  const { data: session, status } = useSession();
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [likes, setLikes] = useState([]);
  const [hasLiked, setHasLiked] = useState(false);

  useEffect(
    () =>
      onSnapshot(query(collection(db, "posts", id, "comments")), (snapshot) => {
        setComments(snapshot.docs);
      }),
    [db]
  );

  const sendComment = async (e) => {
    e.preventDefault();
    let commenToSend = comment;
    setComment("");
    await addDoc(collection(db, "posts", id, "comments"), {
      comment: commenToSend,
      username: session.user.name,
      userImage: session.user.image,
      time: serverTimestamp(),
    });
  };

  const likePost = async (e) => {
    if (hasLiked) {
      await deleteDoc(doc(db, "posts", id, "likes", session.user.email));
    } else {
      await setDoc(doc(db, "posts", id, "likes", session.user.email), {
        username: session.user.name,
      });
    }
  };

  useEffect(() => {
    setHasLiked(
      likes.findIndex((like) => like.id === session?.user?.email) !== -1
    );
  }, [likes]);

  useEffect(
    () =>
      onSnapshot(query(collection(db, "posts", id, "likes")), (snapshot) => {
        setLikes(snapshot.docs);
      }),
    [db, id]
  );
  console.log(likes);
  return (
    <div className="bg-white my-10 shadow-md  rounded-lg border">
      <div className="flex justify-between items-center p-3">
        <div className="flex justify-end items-center">
          <div className="h-10 w-10 rounded-full bg-black mr-3">
            <img src={post.profileImg} className="rounded-full" />
          </div>
          <div>
            <h1 className="font-bold">{post.username}</h1>
          </div>
        </div>
        <DotsHorizontalIcon className="w-5 h-5" />
      </div>

      <div className="w-full object-cover overflow-hidden ">
        <img src={post.image} className="w-full" />
      </div>

      {session && (
        <div className=" p-3 text-black flex justify-between items-center w-full h-10 ">
          <div className="flex space-x-3 ">
            {hasLiked ? (
              <HeartIconFilled
                onClick={likePost}
                className=" w-5 h-5 hover:scale-125 transition-all text-red-500"
              />
            ) : (
              <HeartIcon
                className="w-5 h-5 hover:scale-125 transition-all "
                onClick={likePost}
              />
            )}
            <ChatIcon className="w-5 h-5 hover:scale-125 transition-all" />
            <PaperAirplaneIcon className="w-5 h-5 hover:scale-125 transition-all rotate-45" />
          </div>
          <div>
            <BookmarkIcon className="w-5 h-5 hover:scale-125 transition-all" />
          </div>
        </div>
      )}
      {likes.length > 0 && (
        <p className="pt-4 pl-5 font-bold inline-block">
          {likes.length + " Likes"}
        </p>
      )}
      {likes.length > 0 &&
        likes.map((l) => (
          <p className="pt-4 pl-2 inline-block "> {l.data().username}</p>
        ))}
      <div className="p-3">
        {/* <h1 className="font-bold">{post.username}</h1> */}
        <span className="font-bold mr-2 ">{post.username}</span>
        {post.caption}
        {/* <div className="flex space-x-2">
          {post.tags.map((tag, i) => (
            <p key={i} className=" py-1 before:content-['#']  text-blue-500">
              {tag}
            </p>
          ))}
        </div> */}
      </div>
      {session && (
        <>
          {comments.map((c) => (
            <div className="flex space-x-2 items-center px-8 py-2 border-t-2">
              <img className="h-7 rounded-full" src={c.data().userImage} />
              <h1 className=" h-7 font-bold ">{c.data().username}</h1>
              <p className="h-7  ">{c.data().comment}</p>
            </div>
          ))}

          <form className="flex items-center p-4 border-t-2">
            <EmojiHappyIcon className="h-7 text- text-[#d62976] " />
            <input
              type="text"
              className="mx-5 flex-1 rounded-md border-gray-400 h-9"
              placeholder="Add a comment..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <button
              onClick={sendComment}
              type="submit"
              disabled={!comment.trim()}
              className=" bg-gradient-to-tr from-[#d62976] to-[#fa7e1e] text-white border-2 rounded-lg px-2 py-1 font-bold"
            >
              Comment
            </button>
          </form>
        </>
      )}
    </div>
  );
}

export default Post;
