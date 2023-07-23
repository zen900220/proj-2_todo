"use client";

import { createContext, useEffect, useMemo, useState } from "react";

// context of entire app
export const AppContext = createContext({});

// we are doin load user in this component as its rendered in layout.js meaning its going to be executed for every possible url.
async function loadUser(setState) {
  const res = await fetch("/api/A_CR9TtyGeX6tC/user/load");
  const data = await res.json();

  if (!data.success) return;

  setState((prev) => ({
    ...prev,
    user: data.user,
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
