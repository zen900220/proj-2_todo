import { Todo } from "@/database/models/todo";
import { connectDb } from "@/database/utils";
import { CustomError } from "@/utils/CustomError";
import { authenticate } from "@/utils/authenticate";
import { errorHandler } from "@/utils/errorHandler";
import { NextResponse } from "next/server";

export const DELETE = async (req) => {
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

    const id = req.nextUrl.searchParams.get("id");

    const todo = await Todo.findByIdAndDelete(id);

    if (!todo) {
      throw new CustomError(
        "Validation Error",
        404,
        "No Todo exists with given ID."
      );
    }

    const todos = await Todo.find({ user: user._id });

    return NextResponse.json({ success: true, todos });
  } catch (error) {
    return errorHandler(error);
  }
};
