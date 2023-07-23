import mongoose from "mongoose";

const task = new mongoose.Schema({
  completed: {
    type: Boolean,
    required: true,
    default: false,
  },
  description: {
    type: String,
    required: true,
  },
});

const schema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Enter todo title!"],
  },
  tasks: [task],
  user: {
    type: mongoose.ObjectId,
    ref: "User",
    required: true,
  },
});

export const Todo = mongoose.models.Todo || mongoose.model("Todo", schema);
