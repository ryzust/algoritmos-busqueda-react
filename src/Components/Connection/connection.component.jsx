import React from "react";
import * as actions from "../../Actions";
import { useDispatch } from "react-redux";
import "./connection.styles.css";

export const Connection = ({ p1, p2, gx, v1, v2 }) => {
  const dispatch = useDispatch();
  let left = Math.floor((p1[0] + p2[0]) / 2);
  let top = Math.floor((p1[1] + p2[1]) / 2);

  const handleDelete = () => {
    dispatch(actions.deleteEdge(v1, v2));
  };
  return (
    <>
      <p
        style={{
          zIndex: 1,
          position: "absolute",
          top,
          left,
        }}
        className="connection"
        onClick={handleDelete}
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
