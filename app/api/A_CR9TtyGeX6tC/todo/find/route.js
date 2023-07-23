import { Todo } from "@/database/models/todo";
import { connectDb } from "@/database/utils";
import { CustomError } from "@/utils/CustomError";
import { authenticate } from "@/utils/authenticate";
import { errorHandler } from "@/utils/errorHandler";
import { NextResponse } from "next/server";

// we only need to find all the todos of the logged in user
export const GET = async (req) => {
  try {
    await connectDb();

    const { success, user } = await authenticate();

    if (!success) {
      throw new CustomError(
        "Authentication Error",
        401,
        "Login to access this resource!"
      );
    }

    const todos = await Todo.find({ user: user._id });

    return NextResponse.json({ success: true, todos });
  } catch (error) {
    return errorHandler(error);
  }
};
