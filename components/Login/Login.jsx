"use client";

import Link from "next/link";
import "./Login.scss";
import React, { useContext, useEffect, useRef } from "react";
import BlueFilter from "../UtilityComponents/BlueFilter";
import { AppContext } from "@/context/AppContext";
import { redirect } from "next/navigation";
import { loginHandler, registerHandler } from "@/context/handlers/userHandlers";
import { findTodosHandler } from "@/context/handlers/todoHandlers";

const Login = () => {
  const toggleBarRef = useRef();
  const slideTrackRef = useRef();

  const registerInfo = useRef({});
  const loginInfo = useRef({});

  const context = useContext(AppContext);

  function updateInfo(type, fieldname, val) {
    if (type === "register") {
      registerInfo.current[fieldname] = val;
    } else if (type === "login") {
      loginInfo.current[fieldname] = val;
    }
  }

  async function register(e) {
    e.preventDefault();

    context.setAppState((prev) => ({
      ...prev,
      loading: true,
    }));

    const userData = await registerHandler(
      registerInfo.current.username,
      registerInfo.current.email,
      registerInfo.current.password,
      registerInfo.current.confirmPassword
    );

    if (!userData.success) {
      context.setAppState((prev) => ({
        ...prev,
        loading: false,
      }));

      return alert(userData.message);
    }

    context.setAppState({
      loading: false,
      user: userData.user,
      todos: [],
    });
  }

  async function login(e) {
    e.preventDefault();

    // set page in loading mode
    context.setAppState((prev) => ({
      ...prev,
      loading: true,
    }));

    // try to login with given details
    const userData = await loginHandler(
      loginInfo.current.email,
      loginInfo.current.password
    );

    if (!userData.success) {
      // if login fails stop loader and show err
      context.setAppState((prev) => ({
        ...prev,
        loading: false,
      }));
      return alert(userData.message);
    }

    // if login succeeded get todos of logged in user
    const todoData = await findTodosHandler();

    if (!todoData.success) {
      // if todo fetching fails stop loader n show err
      context.setAppState((prev) => ({
        ...prev,
        loading: false,
      }));
      return alert(todoData.message);
    }

    // if both succeeded update app state with user n his todos and stop loader
    context.setAppState({
      user: userData.user,
      todos: todoData.todos,
      loading: false,
    });
  }

  function toggleHandler(type) {
    if (type === "register") {
      toggleBarRef.current.classList.add("slide-right");
      slideTrackRef.current.classList.add("slide-left");
    } else if (type === "login") {
      toggleBarRef.current.classList.remove("slide-right");
      slideTrackRef.current.classList.remove("slide-left");
    }
  }

  useEffect(() => {
    if (context.appState.user.email) redirect("/");
  }, [context.appState]);

  return (
    <>
      <BlueFilter />
      <div className="login">
        {/* login window */}
        <div>
          {/* toggle box */}
          <div>
            {/* toggle controls */}
            <div>
              <span onClick={(e) => toggleHandler("login")}>Login</span>
              <span onClick={(e) => toggleHandler("register")}>Register</span>
            </div>
            {/* toggle slider */}
            <div ref={toggleBarRef}></div>
          </div>
          {/* box containing login/register sliding track */}
          <div>
            {/* sliding box containing the 2 forms */}
            <div ref={slideTrackRef}>
              {/* login */}
              <div>
                <form onSubmit={login}>
                  <p>
                    <img src="/curved-email.svg" alt="icon" />

                    <input
                      required
                      type="email"
                      name="email"
                      placeholder="Email"
                      onChange={(e) =>
                        updateInfo("login", e.target.name, e.target.value)
                      }
                    />
                  </p>
                  <p>
                    <img src="/open-lock.svg" alt="icon" />
                    <input
                      required
                      type="password"
                      name="password"
                      placeholder="Password"
                      onChange={(e) =>
                        updateInfo("login", e.target.name, e.target.value)
                      }
                    />
                  </p>
                  <Link href="/password/forgot">Forgot password ?</Link>
                  <button type="submit">Login</button>
                </form>
              </div>
              {/* register */}
              <div>
                <form onSubmit={register}>
                  <p>
                    <img src="/person.svg" alt="icon" />
                    <input
                      required
                      type="text"
                      name="username"
                      placeholder="Username"
                      onChange={(e) =>
                        updateInfo("register", e.target.name, e.target.value)
                      }
                    />
                  </p>
                  <p>
                    <img src="/curved-email.svg" alt="icon" />
                    <input
                      required
                      type="email"
                      name="email"
                      placeholder="Email"
                      onChange={(e) =>
                        updateInfo("register", e.target.name, e.target.value)
                      }
                    />
                  </p>
                  <p>
                    <img src="/open-lock.svg" alt="icon" />
                    <input
                      required
                      type="password"
                      name="password"
                      placeholder="Password"
                      onChange={(e) =>
                        updateInfo("register", e.target.name, e.target.value)
                      }
                    />
                  </p>
                  <p>
                    <img src="/closed-lock.svg" alt="icon" />
                    <input
                      required
                      type="password"
                      name="confirmPassword"
                      placeholder="Confirm Password"
                      onChange={(e) =>
                        updateInfo("register", e.target.name, e.target.value)
                      }
                    />
                  </p>
                  <button>Register</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
