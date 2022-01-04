import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import Post from "./Post";

function Posts() {
  const [posts, setPosts] = useState([]);
  console.log(posts);
  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(db, "posts"), orderBy("timestamp", "desc")),
      (snapshot) => {
        setPosts(snapshot.docs);
      }
    );
    return () => {
      unsubscribe();
    };
  }, [db]);

  // const [user, setUser] = useState();
  // useEffect(() => {
  //   fetch("https://dummyapi.io/data/v1/post?limit=10", {
  //     method: "GET",
  //     headers: {
  //       "app-id": "61ce1165f78de38b1d1c4e57",
  //     },
  //   })
  //     .then((data) => data.json())
  //     .then((data) => {
  //       setUser(data.data);
  //     });
  // }, []);

  return (
    <div>
      {posts ? (
        posts.map((post) => <Post post={post.data()} key={post.id} />)
      ) : (
        <div className="flex items-center justify-center ">
          <div className="w-10 h-10 border-t-transparent border-4 border-black border-solid rounded-full animate-spin"></div>
        </div>
      )}
    </div>
  );
}

export default Posts;
