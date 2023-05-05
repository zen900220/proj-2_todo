"use client";

import "./Login.scss";
import React, { useRef } from "react";

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
                <input type="email" placeholder="Email" />
              </p>
              <p>
                <input type="password" placeholder="Password" />
              </p>
              <button>Login</button>
            </div>
            {/* register */}
            <div>
              <p>
                <input type="text" placeholder="Username" />
              </p>
              <p>
                <input type="email" placeholder="Email" />
              </p>
              <p>
                <input type="password" placeholder="Password" />
              </p>
              <p>
                <input type="password" placeholder="Confirm Password" />
              </p>
              <button>Register</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
