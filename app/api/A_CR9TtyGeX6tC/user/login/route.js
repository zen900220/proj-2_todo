import { User } from "@/database/models/user";
import { connectDb } from "@/database/utils";
import { CustomError } from "@/utils/CustomError";
import { errorHandler } from "@/utils/errorHandler";
import { sendLoginToken } from "@/utils/sendLoginToken";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    await connectDb();
    const data = await request.json();
    const { email, password } = data;

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      throw new CustomError(
        "Validation Error",
        404,
        "User with given email doesn't exist!"
      );
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      throw new CustomError("Authentication Error", 404, "Incorrect Password!");
    }

    return sendLoginToken(user);
  } catch (error) {
    return errorHandler(error);
  }
}
