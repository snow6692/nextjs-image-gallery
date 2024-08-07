import { IUnsplashSearchResponse } from "@/models/unspalsh-image";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("query");

  if (!query) {
    return NextResponse.json({ error: "No query provided" }, { status: 400 });
  }

  try {
    const response = await fetch(
      `https://api.unsplash.com/search/photos?query=${query}&client_id=${process.env.UNPSLASH_ACCESS_KEY}`
    );

    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to fetch data" },
        { status: response.status }
      );
    }

    const { results }: IUnsplashSearchResponse = await response.json();
    return NextResponse.json(results);
  } catch (error) {
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
