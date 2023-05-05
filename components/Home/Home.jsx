"use client";

import React, { useRef } from "react";

import "./Home.scss";
import GlowGrid from "../GlowGrid/GlowGrid";

const Home = () => {
  const glowRef = useRef();
  const dialogRef = useRef();

  function tracker(e) {
    let { clientX, clientY } = e;

    glowRef.current.animate([{ top: `${clientY}px`, left: `${clientX}px` }], {
      duration: 1200,
      fill: "forwards",
    });
  }

  function addBtnClick(e) {
    dialogRef.current.showModal();
  }

  function dialogClose(e) {
    console.log(1);
  }

  return (
    <div className="home" onPointerMove={tracker}>
      <GlowGrid tag={glowRef} />
      <div></div>
      <button onClick={addBtnClick}>+</button>
      <dialog ref={dialogRef} onClose={dialogClose}>
        <p>Hello</p>
        <form action="">
          <button formMethod="dialog">Cancel</button>
        </form>
      </dialog>
    </div>
  );
};

export default Home;
