import { IUspalshImage } from "@/models/unspalsh-image";
import { Metadata } from "next";
import Image from "next/image";

// export const dynamicParams = false;
interface IProps {
  params: {
    topic: string;
  };
  // searchParams: {[key: string]: string | string[] | undefined;};
}

export function generateMetadata({ params: { topic } }: IProps): Metadata {
  return {
    title: `${topic.toUpperCase()} Images Gallery`,
    description: `Discover and share ${topic.toUpperCase()} images from Unsplash`,
  };
}
export async function generateStaticParams() {
  return ["health", "games", , "snow", "coding"].map((topic) => ({ topic }));
}
async function page({ params: { topic } }: IProps) {
  const response = await fetch(
    ` https://api.unsplash.com/photos/random?query=${topic}&count=30&client_id=${process.env.UNPSLASH_ACCESS_KEY}`
  );
  const images: IUspalshImage[] = await response.json();
  return (
    <div>
      <h1 className=" my-6  text-center cursor-pointer hover:underline  text-xl font-serif font-semibold">
        {topic.toUpperCase()}
      </h1>
      <div className="   mt-10 grid grid-cols-1 md:mx-auto  lg:grid-cols-2 xl:grid-cols-3 gap-5">
        {images.map((image) => (
          <Image
            key={image.urls.raw}
            alt={image.description}
            src={image.urls.raw}
            width={Math.min(500, image.width)}
            height={(Math.min(500, image.width) / image.width) * image.height}
            className=" rounded-md m-4   min-w-[400px] border bg-slate-900 object-cover  md:translate-x-1/4 lg:translate-x-0  "
          />
        ))}
      </div>
    </div>
  );
}

export default page;
