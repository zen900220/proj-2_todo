"use client";

import React, { useRef } from "react";

import "./Home.scss";
import GlowGrid from "../GlowGrid/GlowGrid";
import TodoPanel from "../TodoPanel/TodoPanel";
import AddTodo from "../AddTodo/AddTodo";

const Home = () => {
  const glowRef = useRef();

  function tracker(e) {
    let { clientX, clientY } = e;

    glowRef.current.animate([{ top: `${clientY}px`, left: `${clientX}px` }], {
      duration: 1200,
      fill: "forwards",
    });
  }

  return (
    <div className="home" onPointerMove={tracker}>
      <GlowGrid tag={glowRef} />
      <TodoPanel />
      <AddTodo />
    </div>
  );
};

export default Home;
