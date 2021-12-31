import React, { useEffect, useState } from "react";
import Post from "./Post";

function Posts() {
  const [user, setUser] = useState();
  useEffect(() => {
    fetch("https://dummyapi.io/data/v1/post?limit=10", {
      method: "GET",
      headers: {
        "app-id": "61ce1165f78de38b1d1c4e57",
      },
    })
      .then((data) => data.json())
      .then((data) => {
        setUser(data.data);
      });
  }, []);
  return (
    <div>
      {user ? (
        user.map((post) => <Post post={post} key={post.id} />)
      ) : (
        <div class="flex items-center justify-center ">
          <div className="w-10 h-10 border-t-transparent border-4 border-black border-solid rounded-full animate-spin"></div>
        </div>
      )}
    </div>
  );
}

export default Posts;
