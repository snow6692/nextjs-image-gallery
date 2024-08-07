"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { IUspalshImage } from "@/models/unspalsh-image";
import Image from "next/image";
import { FormEvent, useState } from "react";

function SearchPage() {
  const [searchResults, setSearchResults] = useState<IUspalshImage[] | null>(
    null
  );
  const [searchResultsLoading, setSearchReslutsLoading] = useState(false);
  const [searchResultsLoadingIsError, setSearchReslutsLoadingIsError] =
    useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const search = formData.get("search")?.toString().trim();

    if (search) {
      try {
        setSearchResults(null);
        setSearchReslutsLoading(true);
        setSearchReslutsLoadingIsError(false);
        const response = await fetch("/api/search/?query=" + search);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const images: IUspalshImage[] = await response.json();
        setSearchResults(images);
      } catch (err) {
        console.error(err);
        setSearchReslutsLoadingIsError(true);
      } finally {
        setSearchReslutsLoading(false);
      }
    }
  }

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        action=""
        className="text-center mt-20 flex"
      >
        <Input
          name="search"
          type="search"
          placeholder="Dogs, Squirrels, Cats..."
          className="flex-[5]"
        />
        <Button
          type="submit"
          className="flex-1 disabled:bg-gray-600"
          disabled={searchResultsLoading}
        >
          Search
        </Button>
      </form>
      <div className="flex flex-col items-center">
        {searchResultsLoading && (
          <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 space-y-5 lg:space-x-10">
            <Skeleton className="h-80 w-[300px]" />
            <Skeleton className="h-80 w-[300px]" />
            <Skeleton className="h-80 w-[300px]" />
          </div>
        )}
        {searchResultsLoadingIsError && <div>Something went wrong.</div>}
        {searchResults?.length === 0 && (
          <div>Nothing found, try another keyword.</div>
        )}
      </div>
      {searchResults && (
        <div className="mt-10 grid grid-cols-1 md:mx-auto  lg:grid-cols-2 xl:grid-cols-3 gap-5">
          {searchResults.map((image) => (
            <Image
              className=" rounded-md m-4   min-w-[400px] border bg-slate-900 object-cover  md:translate-x-1/2 lg:translate-x-0  "
              key={image.description} // Use a unique key here, `image.id` instead of `image.urls.raw`
              src={image.urls.raw}
              width={250}
              height={250}
              alt={image.description || "Unsplash Image"}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchPage;
