"use client";

import React, { useEffect, useRef, useState } from "react";
import "./GlowGrid.scss";

const GlowGrid = ({ tag }) => {
  const gridRef = useRef();

  const [tiles, setTiles] = useState([]);

  function tiling() {
    // height of container
    let height = gridRef.current.offsetHeight;
    // 1vw
    let vw = window.innerWidth / 100;
    // 1 tile is 10vw so num. of tiles is h/10vw
    let n = height / (10 * vw);
    // add n*10 1's to the array
    let arr = [];
    for (let i = 0; i < Math.ceil(n) * 10; i++) {
      arr.push(1);
    }
    setTiles(arr);
  }

  useEffect(() => {
    tiling();
  }, []);

  return (
    <div className="glowgrid" ref={gridRef}>
      <div ref={tag}></div>
      <div>
        {tiles.map((tile, i) => (
          <div key={i}></div>
        ))}
      </div>
    </div>
  );
};

export default GlowGrid;
