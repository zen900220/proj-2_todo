import { authenticate } from "@/utils/authenticate";
import { NextResponse } from "next/server";

export async function GET() {
  const { success, user } = await authenticate();

  return NextResponse.json({ success, user });
}
