import { IUspalshImage } from "@/models/unspalsh-image";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Terminal } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export const metadata = {
  title: "Static Image",
};

async function Static() {
  const response = await fetch(
    "https://api.unsplash.com/photos/random?client_id=" +
      process.env.UNPSLASH_ACCESS_KEY
  );
  const image: IUspalshImage = await response.json();
  const width = Math.min(500, image.width);
  const height = (width / image.width) * image.height;

  return (
    <div className={` flex flex-col  items-center mt-10   `}>
      <Alert>
        <Terminal className="h-4 w-4" />

        <AlertDescription>
          This page <strong>fetches and caches data at build time</strong>. Even
          though the Unsplash API always returns a new image, we see the same
          image after refreshing the page until we compile the project again
        </AlertDescription>
      </Alert>
      {
        <Image
          src={image.urls.raw}
          alt={image.description}
          width={width}
          height={height}
          className=" rounded-md mt-5 min-w-[400px] max-h-[82vh] border  bg-slate-900   "
        />
      }
      <span className=" my-4">
        by
        <Link
          className=" font-semibold  text-red-200 font-serif  ml-4"
          href={"/users/" + image.user.username}
        >
          {image.user.username}
        </Link>
      </span>
    </div>
  );
}

export default Static;
