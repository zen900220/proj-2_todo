import { Todo } from "@/database/models/todo";
import { connectDb } from "@/database/utils";
import { CustomError } from "@/utils/CustomError";
import { authenticate } from "@/utils/authenticate";
import { errorHandler } from "@/utils/errorHandler";
import { NextResponse } from "next/server";

export const PUT = async (req) => {
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

    const { todoId, taskId } = await req.json();

    const todo = await Todo.findById(todoId);

    if (!todo) {
      throw new CustomError(
        "Validation Error",
        404,
        "The todo you are trying to edit doesn't exist"
      );
    }

    const task = await todo.tasks.id(taskId);

    if (!task) {
      throw new CustomError(
        "Validation Error",
        404,
        "The task you are trying to toggle doesn't exist"
      );
    }

    task.completed = !task.completed;

    await todo.save();

    // when this returns success: true the frontend should know that it was successful
    // and manually modify the state of that task to be completed instd of overwriting the todo with this todo.
    return NextResponse.json({
      success: true,
      todo,
    });
  } catch (error) {
    return errorHandler(error);
  }
};
