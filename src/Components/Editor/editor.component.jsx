import React, { useCallback } from "react";
import { useDrop } from "react-dnd";
import { Vertice } from "../Vertice/vertice.component";
import { Connection } from "../Connection/connection.component";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../../Actions/index";

export const Editor = () => {
  const dispatch = useDispatch();
  const adjList = useSelector((state) => state.adjList);
  const vProps = useSelector((state) => state.vProps);
  const start = useSelector((state) => state.start);
  const end = useSelector((state) => state.end);
  const solution = useSelector((state) => state.solution);

  const moveVertice = useCallback((id, left, top) => {
    dispatch(actions.updateCoords(id, left, top));
  }, []);
  const [, drop] = useDrop(
    () => ({
      accept: "vertice",
      drop(item, monitor) {
        const delta = monitor.getDifferenceFromInitialOffset();
        const left = Math.round(item.left + delta.x);
        const top = Math.round(item.top + delta.y);
        moveVertice(item.id, left, top);
        return undefined;
      },
    }),
    [moveVertice]
  );
  return (
    <div
      ref={drop}
      style={{
        height: "89vh",
        position: "relative",
        border: "2px dashed grey",
        margin: "1rem",
      }}
    >
      {Object.keys(adjList).map((key, i) => {
        const { x, y, h } = vProps[key];
        return (
          <Vertice
            key={key}
            id={key}
            left={x}
            top={y}
            name={key}
            h={h}
            type={key === start ? "start" : key === end ? "end" : "vertice"}
            isSolution={solution.indexOf(key) === -1 ? false : true}
          />
        );
      })}

      {Object.entries(adjList).map(([key, value]) => {
        var p1 = [vProps[key].x + 40, vProps[key].y + 40];
        return value.map((edge) => {
          var p2 = [vProps[edge[0]].x + 40, vProps[edge[0]].y + 40];
          return <Connection p1={p1} p2={p2} gx={edge[1]}></Connection>;
        });
      })}
    </div>
  );
};
