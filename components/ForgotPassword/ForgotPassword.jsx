"use client";

import React, { useContext, useRef } from "react";
import "./ForgotPassword.scss";
import BlueFilter from "../UtilityComponents/BlueFilter";
import { AppContext } from "@/context/AppContext";
import { forgotPswdHandler } from "@/context/handlers/userHandlers";

const ForgotPassword = () => {
  const email = useRef("");

  const context = useContext(AppContext);

  async function sendResetLink(e) {
    e.preventDefault();

    context.setAppState((prev) => ({
      ...prev,
      loading: true,
    }));

    const data = await forgotPswdHandler(email.current);

    context.setAppState((prev) => ({
      ...prev,
      loading: false,
    }));

    return alert(data.message);
  }

  return (
    <>
      <BlueFilter />
      <div className="forgot-password">
        <div>
          <div>
            <form onSubmit={sendResetLink}>
              <p>
                <img src="/curved-email.svg" alt="icon" />
                <input
                  required
                  type="text"
                  name="email"
                  placeholder="Enter Email"
                  onChange={(e) => (email.current = e.target.value)}
                />
              </p>
              <button type="submit">Send Reset Link</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
