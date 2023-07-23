"use client";

import { AppContext } from "@/context/AppContext";
import { logoutHandler } from "@/context/handlers/userHandlers";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";

function LoginBtn() {
  const [loggedIn, setLoggedIn] = useState(false);

  const context = useContext(AppContext);

  async function logout() {
    context.setAppState((prev) => ({
      ...prev,
      loading: true,
    }));

    const data = await logoutHandler();

    if (!data.success) {
      context.setAppState((prev) => ({
        ...prev,
        loading: false,
      }));
      return alert("Couldn't logout! Try Again");
    }

    context.setAppState({
      user: {},
      todos: [],
      loading: false,
    });
  }

  useEffect(() => {
    setLoggedIn(context.appState.user.email ? true : false);
  }, [context.appState]);

  return (
    <>
      {loggedIn ? (
        <button onClick={() => logout()}>Logout</button>
      ) : (
        <Link href="/login">Login</Link>
      )}
    </>
  );
}

export default LoginBtn;
