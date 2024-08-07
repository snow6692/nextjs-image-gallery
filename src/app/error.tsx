"use client";
import { Button } from "@/components/ui/button";
import React from "react";

interface IProps {
  error: Error;
  reset: () => void;
}
function Error({ error, reset }: IProps) {
  return (
    <div className=" text-center mt-20 space-y-5">
      <h1 className=" text-4xl font-bold font-serif">Error 😵‍💫</h1>
      <p>Something went wrong</p>
      <Button onClick={reset}>Try Again</Button>
    </div>
  );
}

export default Error;
