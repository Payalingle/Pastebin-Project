import { NextResponse } from "next/server";

export async function POST(req) {
  const { content, ttl, views } = await req.json();

  if (!content || content.trim() === "") {
    return NextResponse.json(
      { error: "Content is required" },
      { status: 400 }
    );
  }

  if (!ttl || ttl <= 0) {
    return NextResponse.json(
      { error: "TTL must be greater than 0" },
      { status: 400 }
    );
  }

  if (!views || views <= 0) {
    return NextResponse.json(
      { error: "Views must be greater than 0" },
      { status: 400 }
    );
  }

  // ✅ save to DB here

  return NextResponse.json({ success: true });
}
