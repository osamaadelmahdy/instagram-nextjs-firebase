import React from "react";
import { getProviders, signIn as sign } from "next-auth/react";
import Image from "next/image";
import Header from "../../components/Header";

function signin({ providers }) {
  return (
    <div className="felx flex-col  items-center w-full h-full">
      <Header />
      <div className="h-52 py-20 relative mt-20">
        <Image
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/1600px-Instagram_logo.svg.png"
          layout="fill"
          objectFit="contain"
        />
      </div>

      {Object.values(providers).map((provider) => (
        <div className="flex w-full justify-center m-10" key={provider.name}>
          <button
            className="border-2 border-blue-500 font-semibold flex items-center bg-white text-blue-500 p-3 rounded-lg  "
            onClick={() => sign(provider.id, { callbackUrl: "/" })}
          >
            <img src="/google.svg" className="h-7 pr-2" />
            Sign In with {provider.name}
          </button>
        </div>
      ))}
    </div>
  );
}

export async function getServerSideProps() {
  const providers = await getProviders();

  return {
    props: {
      providers,
    },
  };
}
export default signin;
