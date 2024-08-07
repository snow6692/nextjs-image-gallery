import { IUspalshImage } from "@/models/unspalsh-image";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Terminal } from "lucide-react";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Waiting for Image",
};

async function Wait() {
  let image: IUspalshImage | null = null;
  let error = null;

  try {
    const response = await fetch(
      "https://api.unsplash.com/photos/random?client_id=" +
        process.env.UNPSLASH_ACCESS_KEY,
      {
        next: { revalidate: 15 },
      }
    );

    if (!response.ok) {
      if (response.status === 403 || response.status === 429) {
        error = "Rate Limit Exceeded. Please try again later.";
      } else {
        error = "An error occurred while fetching the image.";
      }
      throw new Error(error);
    }

    const data = await response.text();
    image = JSON.parse(data);
  } catch (err) {
    console.error("Fetch error:", err);
  }

  const width = image ? Math.min(500, image.width) : 500;
  const height = image ? (width / image.width) * image.height : 500;

  return (
    <div className={`flex flex-col items-center mt-10`}>
      <Alert>
        <Terminal className="h-4 w-4" />
        <AlertDescription>
          A new image is fetched every 15 seconds after Clicking the below
          button
        </AlertDescription>
      </Alert>
      {image ? (
        <Image
          src={image.urls.raw}
          alt={image.description}
          width={width}
          height={height}
          className="rounded-md mt-5 min-w-[400px] max-h-[82vh] border bg-slate-900"
        />
      ) : (
        <div className="rounded-md mt-5 min-w-[400px] max-h-[82vh] border bg-slate-900 flex items-center justify-center text-red-500">
          {error || "Failed to load image"}
        </div>
      )}
      <span className="my-4 space-x-4">
        {image && (
          <>
            by
            <Link
              className="font-semibold font-serif ml-4"
              href={"/users/" + image.user.username}
            >
              {image.user.username}
            </Link>
            <a href={`/dynamic`} className="ml-4 font-semibold">
              <Button variant={"secondary"}>New Image</Button>
            </a>
          </>
        )}
      </span>
    </div>
  );
}

export default Wait;
