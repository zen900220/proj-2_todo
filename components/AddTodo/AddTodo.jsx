"use client";

import React, { useContext, useEffect, useRef, useState } from "react";
import "./AddTodo.scss";
import { AppContext } from "@/context/AppContext";
import { createTodoHandler } from "@/context/handlers/todoHandlers";

const AddTodo = () => {
  const context = useContext(AppContext);

  const dialogRef = useRef();

  const [title, setTitle] = useState("");
  const [tasks, setTasks] = useState([]);

  const [loggedIn, setLoggedIn] = useState(false);

  function addBtnClick(e) {
    dialogRef.current.showModal();
  }

  function dialogClose(e) {
    setTitle("");
    setTasks([]);
  }

  async function todoSubmit(e) {
    e.preventDefault();

    context.setAppState((prev) => ({
      ...prev,
      loading: true,
    }));

    const addTodoData = await createTodoHandler(title, tasks);

    if (!addTodoData.success) {
      context.setAppState((prev) => ({
        ...prev,
        loading: false,
      }));

      return alert(addTodoData.message);
    }

    context.setAppState((prev) => ({
      ...prev,
      loading: false,
      todos: [...prev.todos, addTodoData.todo],
    }));

    dialogRef.current.close();
  }

  function closeBtnClick(e) {
    dialogRef.current.close();
  }

  function addTask(e) {
    let val = e.target.value;
    setTasks((prev) => [...prev, val]);
    e.target.value = "";
  }

  function editTask(e) {
    const idx = Number(e.target.name);
    const val = e.target.value;

    setTasks((prev) => {
      if (!val) {
        prev.splice(idx, 1);
      } else {
        prev[idx] = val;
      }
      return [...prev];
    });
  }

  useEffect(() => {
    context.appState.user.email ? setLoggedIn(true) : setLoggedIn(false);
  }, [context.appState]);

  return (
    <>
      {!loggedIn ? undefined : (
        <div className="add-todo">
          <button onClick={addBtnClick}>+</button>
          <dialog ref={dialogRef} onClose={dialogClose}>
            <form onSubmit={todoSubmit} id="todo">
              <p>
                <input
                  required
                  type="text"
                  name="title"
                  placeholder="Enter Todo Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </p>
              {tasks?.map((task, i) => (
                <p>
                  <input
                    type="text"
                    key={i}
                    value={task}
                    name={i}
                    autoFocus
                    onChange={editTask}
                  />
                </p>
              ))}
              <p>
                <input
                  type="text"
                  onChange={addTask}
                  placeholder="Add New Task"
                />
              </p>
            </form>
            <button onClick={closeBtnClick}>Cancel</button>
            <button form="todo">Submit</button>
          </dialog>
        </div>
      )}
    </>
  );
};

export default AddTodo;
