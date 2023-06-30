import { NextResponse } from "next/server";

export async function GET(req) {
  console.log(req.nextUrl.searchParams.get("id"));
  return new Response("Hello", {
    status: 200,
  });
}

export async function POST() {
  return NextResponse.json({ data: "Hello with post" });
}
