import { Button } from "@/components/ui/button";
import IUser from "@/models/unsplash-user";
import { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import React from "react";

interface IProps {
  params: {
    username: string;
  };
}

async function getUser(username: string): Promise<IUser> {
  const res = await fetch(
    `https://api.unsplash.com/users/${username}?client_id=${process.env.UNPSLASH_ACCESS_KEY}`
  );
  if (res.status === 404) notFound();
  return await res.json();
}

export async function generateMetadata({
  params: { username },
}: IProps): Promise<Metadata> {
  const user = await getUser(username);

  return {
    title: `  ${user.username}`,
    description: `Check out ${username}'s profile on Unsplash`,
  };
}

async function page({ params: { username } }: IProps) {
  const user = await getUser(username);
  return (
    <div className="  flex flex-col-reverse lg:flex-row  lg:justify-between lg:items-center lg:flex ">
      <div className=" flex flex-col gap-5 md:text-center  ">
        <h1 className=" lg:text-5xl font-bold font-sans">{user.username}</h1>
        <p className=" font-thin lg:text-xl">
          Hey I am {user.first_name + "" + user.last_name}, Hope you found my
          work well. 😀
        </p>
        <p className="font-thin lg:text-xl">
          Here is my Unplash portofolio You can find the rest of my work the in
          link below 😀👇
        </p>
        <a
          target="_blank"
          href={"https://unsplash.com/" + user.username}
          className=" text-center underline"
        >
          Click Me
        </a>
      </div>
      <div>
        <Image
          src={user.profile_image.large}
          alt={user.username}
          width={500}
          height={250}
          className=" my-5 rounded-lg  md:translate-x-1/2 lg:translate-x-0  flex-[4] "
        />
      </div>
    </div>
  );
}

export default page;
