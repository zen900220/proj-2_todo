import { Todo } from "@/database/models/todo";
import { connectDb } from "@/database/utils";
import { CustomError } from "@/utils/CustomError";
import { authenticate } from "@/utils/authenticate";
import { errorHandler } from "@/utils/errorHandler";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  let todo;
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

    let { title, tasks = [] } = await req.json(); // tasks is an array of strings where is string is a task desc.

    tasks = tasks.map((task) => ({
      description: task,
    }));

    todo = await Todo.create({ title, tasks, user: user._id });

    return NextResponse.json({ success: true, todo });
  } catch (error) {
    if (todo) await Todo.findByIdAndDelete(todo._id);
    return errorHandler(error);
  }
};
