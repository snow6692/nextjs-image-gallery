"use client";

import React, { useState } from "react";

import { ModeToggle } from "@/components/ui/ModeToggle";
import { Menu, XIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Topics from "./Topics";

const Navbar: React.FC = () => {
  const [isToggled, setIsToggled] = useState(false);

  const pathName = usePathname();

  const menuItems = [
    { label: "Static", href: "/static" },
    { label: "Dynamic", href: "/dynamic" },
    { label: "Auto", href: "/auto" },
    { label: "Search", href: "/search" },
  ];

  return (
    <nav className="w-full flex flex-col gap-4 border-primary border-b">
      <div className="flex justify-between mb-5 md:items-center">
        <div className="md:flex-1">
          <Link
            href="/"
            passHref
            className={`cursor-pointer ${
              pathName === "/" ? "text-red-500" : ""
            }`}
          >
            Gallery
          </Link>
        </div>

        <div className="relative">
          <div className="md:hidden absolute right-5">
            {isToggled ? (
              <XIcon
                className="h-6 w-6 text-primary cursor-pointer"
                onClick={() => setIsToggled(!isToggled)}
              />
            ) : (
              <Menu
                onClick={() => setIsToggled(!isToggled)}
                className="w-6 h-6 text-primary cursor-pointer"
              />
            )}
          </div>

          <ul
            className={`md:hidden animationNav flex flex-col gap-5 pl-10 mt-10 ${
              isToggled ? "block" : "hidden"
            }`}
          >
            {menuItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  passHref
                  className={pathName === item.href ? "text-red-500" : ""}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <Topics />
            <ModeToggle />
          </ul>
        </div>

        <ul className="hidden md:flex md:flex-[3]   items-center gap-6">
          {menuItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                passHref
                className={pathName === item.href ? "text-red-500" : ""}
              >
                {item.label}
              </Link>
            </li>
          ))}
          <Topics />
        </ul>

        <div className="hidden md:flex">
          <ModeToggle />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
