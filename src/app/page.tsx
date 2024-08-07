import { Github, Linkedin } from "lucide-react";
import Image from "next/image";

export default async function Home() {
  return (
    <div className=" flex flex-col-reverse  md:flex-row md:justify-between mt-10">
      <div className=" space-y-5">
        <h1 className=" text-4xl lg:text-6xl  ">Gallery</h1>
        <p className=" font-thin lg:text-xl">
          The internet source for visuals.
        </p>

        <p className="font-thin lg:text-xl">
          Here is my Social media Accounts in links below 😀👇
        </p>

        <div className=" flex gap-5  ">
          <a
            className=" mt-2"
            target="_blank"
            href="https://www.linkedin.com/in/ahmed-hamada-a83309239/"
          >
            <Linkedin />
          </a>

          <a
            className=" mt-2"
            target="_blank"
            href="https://github.com/snow6692"
          >
            <Github />
          </a>
        </div>
      </div>

      <div className=" mb-5 md:mb-0">
        <Image src="/image.jpg" alt="homepage" width={400} height={500} />
      </div>
    </div>
  );
}
