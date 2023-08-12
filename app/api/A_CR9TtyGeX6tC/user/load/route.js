import { connectDb } from "@/database/utils";
import { authenticate } from "@/utils/authenticate";
import { errorHandler } from "@/utils/errorHandler";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDb();

    const data = await authenticate();

    return NextResponse.json(data);
  } catch (error) {
    return errorHandler(error);
  }
}
