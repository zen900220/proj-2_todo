"use client";

import React, { useContext } from "react";
import "./Loader.scss";
import { AppContext } from "@/context/AppContext";

const Loader = () => {
  const {
    appState: { loading },
  } = useContext(AppContext);

  return (
    <>
      {loading ? (
        <div className="loader">
          <div></div>
        </div>
      ) : undefined}
    </>
  );
};

export default Loader;
