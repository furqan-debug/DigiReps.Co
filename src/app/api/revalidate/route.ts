// src/app/api/revalidate/route.ts
import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export const revalidate = 0;

export async function POST(req: NextRequest) {
  const hookSecret = req.headers.get("x-webhook-secret");
  if (hookSecret !== process.env.NEXT_PUBLIC_CONTENTFUL_WEBHOOK_SECRET) {
    return NextResponse.json({ message: "Invalid token" }, { status: 401 });
  }

  const paths = [
    "/",
    "/(solutions)",
    "/aboutus",
    "/contact",
  ];

  try {
    await Promise.all(paths.map((p) => revalidatePath(p)));
    return NextResponse.json({ revalidated: paths });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    return NextResponse.json(
      { message: "Error revalidating", error: errorMessage },
      { status: 500 }
    );
  }
}
