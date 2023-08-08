"use client";

import { createContext, useEffect, useMemo, useState } from "react";
import { findTodosHandler } from "./handlers/todoHandlers";
import { loadHandler } from "./handlers/userHandlers";

// context of entire app
export const AppContext = createContext({});

// we are doin load user in this component as its rendered in layout.js meaning its going to be executed for every possible url.
async function loadUser(setState) {
  // set loading true
  setState((prev) => ({
    ...prev,
    loading: true,
  }));

  const userData = await loadHandler();

  if (!userData.success) {
    setState((prev) => ({
      ...prev,
      loading: false,
    }));
    return;
  }

  // if user loading success get all todo of loaded user
  const todoData = await findTodosHandler();

  if (!todoData.success) {
    setState((prev) => ({
      ...prev,
      loading: false,
    }));
    return alert("Couldn't load your Todos. Refresh page to try again!");
  }

  setState((prev) => ({
    loading: false,
    user: userData.user,
    todos: todoData.todos,
  }));
}

// a component that takes children and wraps them in context provider.
export const Provider = ({ children }) => {
  // this state is going to be the value of the app context.
  const [appState, setAppState] = useState({
    loading: false,
    user: {},
    todos: [],
  });

  // we are using useMemo so that even if for some reason this component re-renders the new value object has same memory
  // location as before if the deps are unchanged. This prevents false update alarms due to referential inequality
  const value = useMemo(
    () => ({ appState, setAppState }),
    [appState, setAppState]
  );

  useEffect(() => {
    loadUser(setAppState);
  }, []);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
