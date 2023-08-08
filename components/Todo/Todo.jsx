"use client";

import React, { useState, useRef, useEffect, useContext } from "react";
import "./Todo.scss";
import { AppContext } from "@/context/AppContext";
import {
  deleteTodoHandler,
  editTodoHandler,
  toggleTaskHandler,
} from "@/context/handlers/todoHandlers";
import BlueFilter from "../UtilityComponents/BlueFilter";

const Todo = ({ todo }) => {
  const context = useContext(AppContext);

  const [edit, setEdit] = useState(false);
  const [delTasks, setDelTasks] = useState([]);
  const [newTasks, setNewTasks] = useState([]);

  const title = useRef(todo.title);

  async function deleteTodo(e) {
    context.setAppState((prev) => ({
      ...prev,
      loading: true,
    }));

    const deleteData = await deleteTodoHandler(todo._id);

    if (!deleteData.success) {
      context.setAppState((prev) => ({
        ...prev,
        loading: false,
      }));

      return alert(deleteData.message);
    }

    context.setAppState((prev) => ({
      ...prev,
      loading: false,
      todos: deleteData.todos,
    }));
  }

  async function updateTodo(e) {
    e.preventDefault();

    context.setAppState((prev) => ({
      ...prev,
      loading: true,
    }));

    const updateData = await editTodoHandler(
      todo._id,
      delTasks,
      newTasks,
      title.current
    );

    if (!updateData.success) {
      context.setAppState((prev) => ({
        ...prev,
        loading: false,
      }));
      return alert(updateData.message);
    }

    context.setAppState((prev) => {
      let todos = prev.todos.map((item) => {
        if (item._id === todo._id) return updateData.todo;
        return item;
      });
      return {
        ...prev,
        todos,
        loading: false,
      };
    });

    setDelTasks([]);
    setNewTasks([]);
    setEdit(false);
  }

  async function toggleTask(taskId) {
    context.setAppState((prev) => ({
      ...prev,
      loading: true,
    }));

    const toggleData = await toggleTaskHandler(taskId, todo._id);

    if (!toggleData.success) {
      context.setAppState((prev) => ({
        ...prev,
        loading: false,
      }));
      return alert(toggleData.message);
    }

    context.setAppState((prev) => {
      let todos = prev.todos.map((item) => {
        if (item._id === todo._id) return toggleData.todo;
        return item;
      });

      return {
        ...prev,
        todos,
        loading: false,
      };
    });
  }

  function delTaskHandler(e, taskId) {
    if (e.target.checked) {
      if (!delTasks.includes(taskId)) setDelTasks((prev) => [...prev, taskId]);
    } else {
      setDelTasks((prev) => {
        const idx = prev.findIndex((id) => id === taskId);
        prev.splice(idx, 1);
        return [...prev];
      });
    }
  }

  function addTask(e) {
    const val = e.target.value;
    setNewTasks((prev) => [...prev, val]);
    e.target.value = "";
  }

  function editTask(e) {
    const idx = Number(e.target.name);
    const val = e.target.value;
    setNewTasks((prev) => {
      if (val) {
        prev[idx] = val;
      } else {
        prev.splice(idx, 1);
      }
      return [...prev];
    });
  }

  return (
    <div className="todo">
      <BlueFilter />
      <form onSubmit={updateTodo}>
        <p>
          {edit ? (
            <input
              required
              type="text"
              name="title"
              defaultValue={todo.title}
              readOnly={!edit}
              onChange={(e) => (title.current = e.target.value)}
            />
          ) : (
            <span>{todo.title}</span>
          )}
        </p>
        {todo.tasks.map((task) => (
          <p key={task._id}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={(e) => toggleTask(task._id)}
            />
            <span>{task.description}</span>
            {edit && (
              <input
                type="checkbox"
                checked={delTasks.includes(task._id) ? true : false}
                onChange={(e) => delTaskHandler(e, task._id)}
              />
            )}
          </p>
        ))}

        {edit && (
          <>
            {newTasks.map((task, i) => (
              <p key={i}>
                <input
                  name={i}
                  type="text"
                  value={task}
                  onChange={editTask}
                  autoFocus
                />
              </p>
            ))}
            <p>
              <input
                type="text"
                placeholder="Add New Task"
                onChange={addTask}
              />
            </p>
          </>
        )}

        <div className="todo-controls">
          {edit ? (
            <button key="save" type="submit">
              Save
            </button>
          ) : (
            <button key="edit" type="button" onClick={(e) => setEdit(true)}>
              Edit
            </button>
          )}
          <button type="button" onClick={deleteTodo}>
            Delete
          </button>
        </div>
      </form>
    </div>
  );
};

export default Todo;
