import { connectDb } from "@/database/utils";
import { authenticate } from "@/utils/authenticate";
import { errorHandler } from "@/utils/errorHandler";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDb();

    const { success, user } = await authenticate();

    return NextResponse.json({ success, user });
  } catch (error) {
    return errorHandler(error);
  }
}
