import React, { useState, useCallback, useEffect } from "react";
import { useDrop } from "react-dnd";
import { Vertice } from "../Vertice/vertice.component";
import { Connection } from "../Connection/connection.component";
import update from "immutability-helper";

export const Editor = ({ grafo, modifyVertice, deleteVertice }) => {
  const didmount = React.useRef(false);
  const [vertices, setVertices] = useState(
    grafo.vertices.map((vertice, i) => {
      return { name: vertice, top: 0 + i * 5, left: 0 + i * 5, h: grafo.h[i] };
    })
  );
  const [edges, setEdges] = useState(grafo.edges);

  useEffect(() => {
    if (didmount.current) {
      setVertices((prevState) => {
        if (prevState.length !== grafo.vertices.length) {
          return [
            ...prevState,
            {
              name: grafo.vertices[grafo.vertices.length - 1],
              top: 0,
              left: 0,
              h: grafo.h[grafo.h.length - 1],
            },
          ];
        } else {
          return [...prevState];
        }
      });
      setEdges((prevState) => {
        return grafo.edges;
      });
    } else {
      didmount.current = true;
    }
  }, [grafo]);

  const moveVertice = useCallback(
    (id, left, top) => {
      setVertices(
        update(vertices, {
          [id]: {
            $merge: { left, top },
          },
        })
      );
    },
    [vertices, setVertices]
  );
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
      {Object.keys(vertices).map((key, i) => {
        const { left, top, name, h } = vertices[key];
        const start = grafo.start;
        const end = grafo.end;
        return (
          <Vertice
            key={key}
            id={key}
            left={left}
            top={top}
            name={name}
            h={h}
            type={name === start ? "start" : name === end ? "end" : "vertice"}
            modifyVertice={modifyVertice}
            deleteVertice={deleteVertice}
          />
        );
      })}
      {edges.map((edge, i) => {
        var i1 = grafo.vertices.indexOf(edge[0]);
        var i2 = grafo.vertices.indexOf(edge[1]);
        var p1 = [vertices[i1].left, vertices[i1].top];
        var p2 = [vertices[i2].left, vertices[i2].top];
        return (
          <Connection p1={p1} p2={p2} key={i} gx={grafo.g[i]}></Connection>
        );
      })}
    </div>
  );
};
