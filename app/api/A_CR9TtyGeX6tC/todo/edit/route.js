import { Todo } from "@/database/models/todo";
import { connectDb } from "@/database/utils";
import { CustomError } from "@/utils/CustomError";
import { authenticate } from "@/utils/authenticate";
import { errorHandler } from "@/utils/errorHandler";
import { NextResponse } from "next/server";

// editing a todo means 3 things : adding a new task or deleting a task & changing todo title
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

    // id is the id of the todo to be edited
    // title contains changed title
    // newTasks contains the newly added tasks
    // delTasks contains the ids of the tasks to be deleted.
    const { id, title, newTasks, delTasks } = await req.json();

    let todo = await Todo.findById(id);

    if (!todo) {
      throw new CustomError(
        "Validation Error",
        404,
        "The todo you are trying to edit doesn't exist"
      );
    }

    // changing title
    if (title) todo.title = title;

    // adding new tasks
    newTasks?.forEach((task) => {
      todo.tasks.push({ description: task });
    });

    // deleting tasks
    delTasks?.forEach(async (taskId) => {
      await todo.tasks.id(taskId).deleteOne();
    });

    await todo.save();

    return NextResponse.json({ success: true, todo });
  } catch (error) {
    return errorHandler(error);
  }
};
