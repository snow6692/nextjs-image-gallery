"use client";

import * as React from "react";
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { ChevronsDown } from "lucide-react";

type Checked = DropdownMenuCheckboxItemProps["checked"];
const topics = [
  { label: "Health", href: "topics/health" },
  { label: "Games", href: "topics/games" },
  { label: "Snow", href: "topics/snow" },
  { label: "Coding", href: "topics/coding" },
];

export default function Topics() {
  const [showStatusBar, setShowStatusBar] = React.useState<Checked>(true);
  const [showActivityBar, setShowActivityBar] = React.useState<Checked>(false);
  const [showPanel, setShowPanel] = React.useState<Checked>(false);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          Topics <ChevronsDown />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Topics</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {topics.map((topic) => (
          <DropdownMenuItem asChild key={topic.label}>
            <Link href={topic.href} className=" border-b">
              {topic.label}
            </Link>
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
