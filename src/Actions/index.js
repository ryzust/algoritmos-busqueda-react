export const addVertex = (name, h) => {
  return { type: "@graph/addVertex", payload: { name: name, h: h } };
};
export const modifyVertex = (name, newName, newH) => {
  return {
    type: "@graph/modifyVertex",
    payload: { name: name, newName: newName, newH: newH },
  };
};
export const deleteVertex = (name) => {
  return {
    type: "@graph/deleteVertex",
    payload: { name: name },
  };
};
export const updateCoords = (name, x, y) => {
  return {
    type: "@graph/updateCoords",
    payload: { name: name, x: x, y: y },
  };
};
export const addEdge = (v1, v2, d) => {
  return {
    type: "@graph/addEdge",
    payload: { v1: v1, v2: v2, d: d },
  };
};
export const deleteEdge = (v1, v2) => {
  return {
    type: "@graph/deleteEdge",
    payload: { v1: v1, v2: v2 },
  };
};
export const setStart = (start) => {
  return {
    type: "@graph/setStart",
    payload: { start: start },
  };
};
export const setEnd = (end) => {
  return {
    type: "@graph/setEnd",
    payload: { end: end },
  };
};
export const getPath = (algorithm) => {
  return {
    type: "@graph/getPath",
    payload: { a: algorithm },
  };
};
