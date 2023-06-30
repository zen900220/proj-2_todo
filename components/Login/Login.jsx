"use client";

import Link from "next/link";
import "./Login.scss";
import React, { useRef } from "react";
import BlueFilter from "../UtilityComponents/BlueFilter";

const Login = () => {
  const toggleBarRef = useRef();
  const slideTrackRef = useRef();

  function toggleHandler(type) {
    if (type === "register") {
      toggleBarRef.current.classList.add("slide-right");
      slideTrackRef.current.classList.add("slide-left");
    } else if (type === "login") {
      toggleBarRef.current.classList.remove("slide-right");
      slideTrackRef.current.classList.remove("slide-left");
    }
  }

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
                <p>
                  <img src="/curved-email.svg" alt="icon" />

                  <input type="email" placeholder="Email" />
                </p>
                <p>
                  <img src="/open-lock.svg" alt="icon" />
                  <input type="password" placeholder="Password" />
                </p>
                <Link href="/about">Forgot password ?</Link>
                <button>Login</button>
              </div>
              {/* register */}
              <div>
                <p>
                  <img src="/person.svg" alt="icon" />
                  <input type="text" placeholder="Username" />
                </p>
                <p>
                  <img src="/curved-email.svg" alt="icon" />
                  <input type="email" placeholder="Email" />
                </p>
                <p>
                  <img src="/open-lock.svg" alt="icon" />
                  <input type="password" placeholder="Password" />
                </p>
                <p>
                  <img src="/closed-lock.svg" alt="icon" />
                  <input type="password" placeholder="Confirm Password" />
                </p>
                <button>Register</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
