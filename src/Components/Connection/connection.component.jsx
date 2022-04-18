import React from "react";

export const Connection = ({ p1, p2, gx }) => {
  let left = Math.floor((p1[0] + p2[0]) / 2);
  let top = Math.floor((p1[1] + p2[1]) / 2);

  return (
    <>
      <p
        style={{
          zIndex: -1,
          position: "absolute",
          top,
          left,
        }}
        className="connection"
      >
        {gx}
      </p>
      <svg
        style={{ zIndex: -1, position: "absolute" }}
        width="1000px"
        height="1000px"
      >
        <line
          style={{ position: "absolute" }}
          x1={p1[0]}
          y1={p1[1]}
          x2={p2[0]}
          y2={p2[1]}
          stroke="black"
        />
      </svg>
    </>
  );
};
