import mongoose from "mongoose";

const task = {
  completed: {
    type: Boolean,
    required: true,
    default: false,
  },
  description: {
    type: String,
    required: true,
  },
};

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

// Find all todos of a particular user id.
schema.query.findTodoByUserId = async function (id) {
  return await this.find({ user: id });
};

// Add a task to a todo
schema.methods.addTask = async function (description) {
  await this.tasks.push({ completed: false, description });
  await this.save();
};

// Delete a task from a todo.
schema.methods.deleteTask = async function (index) {
  if (!this.tasks[index]) return;
  await this.tasks.splice(index, 1);
  await this.save();
};

export const Todo = mongoose.models.Todo || mongoose.model("Todo", schema);
