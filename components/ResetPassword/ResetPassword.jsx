"use client";

import React, { useContext, useRef } from "react";
import "./ResetPassword.scss";
import BlueFilter from "../UtilityComponents/BlueFilter";
import { AppContext } from "@/context/AppContext";
import { resetPswdHandler } from "@/context/handlers/userHandlers";
import { useRouter } from "next/navigation";

const ResetPassword = ({ token }) => {
  const newPassword = useRef("");
  const confirmPassword = useRef("");

  const router = useRouter();

  const context = useContext(AppContext);

  async function resetPswd(e) {
    e.preventDefault();

    context.setAppState((prev) => ({
      ...prev,
      loading: true,
    }));

    const resetData = await resetPswdHandler(
      token,
      newPassword.current,
      confirmPassword.current
    );

    context.setAppState((prev) => ({
      ...prev,
      loading: false,
    }));

    alert(resetData.message);

    if (resetData.success) router.replace("/login");
  }

  return (
    <>
      <BlueFilter />
      <div className="reset-password">
        <div>
          <form onSubmit={resetPswd}>
            <p>
              <img src="/open-lock.svg" alt="icon" />
              <input
                required
                type="password"
                name="newPassword"
                placeholder="Enter New Password"
                onChange={(e) => (newPassword.current = e.target.value)}
              />
            </p>
            <p>
              <img src="/closed-lock.svg" alt="icon" />
              <input
                required
                type="password"
                name="confirmPassword"
                placeholder="Confirm New Password"
                onChange={(e) => (confirmPassword.current = e.target.value)}
              />
            </p>
            <button type="submit">Reset Password</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
