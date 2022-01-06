import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import React from "react";

function MinProfile() {
  const { data: session } = useSession();

  return (
    <div className="hidden sticky top-[80px] md:flex my-5  ml-5 items-center justify-between space-x-2">
      <img
        src={
          session.user.image ||
          `https://ui-avatars.com/api/?name=${session.user.email}`
        }
        className="rounded-full h-16 w-16"
      />
      <div className="flex flex-col flex-1 ">
        <h1 className="font-semibold uppercase">{session?.user.name}</h1>
        <p className="text-sm text-gray-400">
          {session?.user.email.split("@")[0]}
        </p>
      </div>
      <button onClick={signOut} className="p-2 text-blue-400">
        Sign Out
      </button>
    </div>
  );
}

export default MinProfile;
