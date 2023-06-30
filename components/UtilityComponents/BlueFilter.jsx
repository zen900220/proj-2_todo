import React from "react";

const BlueFilter = () => {
  return (
    <>
      <svg display="none">
        <filter id="makeMeBlue">
          <feColorMatrix
            in="SourceGraphic"
            type="matrix"
            values="0 0 0 0 0.078
                0 0 0 0 0.878
                0 0 0 0 1
                0 0 0 1 0"
          />
        </filter>
      </svg>
    </>
  );
};

export default BlueFilter;
