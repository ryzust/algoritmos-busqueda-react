import DFS from "../../Logic/DFS";
import BFS from "../../Logic/BFS";
import "../../Logic/aStar";

const INITIAL_STATE = {
  adjList: {},
  vProps: {}, // vertex properties v : x,y,h
  start: "",
  end: "",
  solution: [],
};

const graphReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "@graph/addVertex":
      var { name, h } = action.payload;
      if (h === undefined) h = 0;
      if (name in state.adjList) {
        return state;
      }
      return {
        ...state,
        adjList: {
          ...state.adjList,
          [name]: [],
        },
        vProps: {
          ...state.vProps,
          [name]: { x: 0, y: 0, h: h },
        },
      };
    case "@graph/deleteVertex":
      var { name } = action.payload;
      if (!(name in state.adjList)) {
        return state;
      }
      var copy = { ...state };
      if (name === state.start) copy.start = "";
      if (name === state.end) copy.end = "";
      delete copy.adjList[name];
      copy.adjList = Object.entries(copy.adjList).map((el) => {
        // el[1] -> lista de ejes
        // el[1][i] -> [nombreIesimoEje, d]
        // el[1][i][0] -> nombreIesimoEje
        for (let i = 0; i < el[1].length; i++) {
          const element = el[1][i][0];
          if (element === name) {
            el[1].splice(i, 1);
            return [el[0], el[1]];
          }
        }
        return el;
      });
      copy.adjList = Object.fromEntries(copy.adjList);
      copy.vProps = Object.entries(copy.vProps).filter((el) => el[0] !== name);
      copy.vProps = Object.fromEntries(copy.vProps);
      return copy;

    case "@graph/modifyVertex":
      var { name, newName, newH } = action.payload;
      if (newName in state.adjList) {
        newName += "1";
      }
      var copy = { ...state };
      if (name === state.start) copy.start = "";
      if (name === state.end) copy.end = "";
      Object.defineProperty(
        copy.adjList,
        newName,
        Object.getOwnPropertyDescriptor(copy.adjList, name)
      );
      delete copy.adjList[name];
      Object.defineProperty(
        copy.vProps,
        newName,
        Object.getOwnPropertyDescriptor(copy.vProps, name)
      );
      delete copy.vProps[name];
      copy.vProps[newName] = { ...copy.vProps[newName], h: newH };
      copy.adjList = Object.entries(copy.adjList).map((el) => {
        // el[1] -> lista de ejes
        // el[1][i] -> [nombreIesimoEje, d]
        // el[1][i][0] -> nombreIesimoEje
        for (let i = 0; i < el[1].length; i++) {
          const element = el[1][i][0];
          if (element === name) {
            el[1][i][0] = newName;
            return [el[0], el[1]];
          }
        }
        return el;
      });
      copy.adjList = Object.fromEntries(copy.adjList);
      copy.vProps = Object.entries(copy.vProps).filter((el) => el[0] !== name);
      copy.vProps = Object.fromEntries(copy.vProps);
      return copy;

    case "@graph/addEdge":
      var { v1, v2, d } = action.payload;
      if (d === undefined) d = 0;
      if (edgeExists(state.adjList[v1], v2)) return state;
      return {
        ...state,
        adjList: {
          ...state.adjList,
          // añadimos ambos elementos ya que el grafo es no dirigido
          [v1]: [...state.adjList[v1], [v2, d]],
          [v2]: [...state.adjList[v2], [v1, d]],
        },
      };

    case "@graph/deleteEdge":
      var { v1, v2 } = action.payload;
      var copy = { ...state };
      copy.adjList[v1] = copy.adjList[v1].filter((el) => el[0] !== v2);
      copy.adjList[v2] = copy.adjList[v2].filter((el) => el[0] !== v1);
      return copy;

    case "@graph/updateCoords":
      var { name, x, y } = action.payload;
      return {
        ...state,
        vProps: {
          ...state.vProps,
          [name]: { ...state.vProps[name], x: x, y: y },
        },
      };

    case "@graph/setStart":
      var { start } = action.payload;
      if (start === state.end) return { ...state, start: start, end: "" };
      return {
        ...state,
        start: start,
      };

    case "@graph/setEnd":
      var { end } = action.payload;
      if (end === state.start) return { ...state, end: end, start: "" };
      return {
        ...state,
        end: end,
      };
    case "@graph/getPath":
      var { a } = action.payload;
      if (a === "BFS") return { ...state, solution: BFS(state) };
      if (a === "DFS") return { ...state, solution: DFS(state) };
      return state;

    default:
      //throw new Error(`Action ${action.type} not found`);
      return state;
  }
};

// Method that gets an adjacency list of a vertex and another vertex name
// Returns a boolean value
function edgeExists(adjListOfEl, vName) {
  for (let i = 0; i < adjListOfEl.length; i++) {
    const element = adjListOfEl[i];
    if (element[0] === vName) return true;
  }
  return false;
}

export default graphReducer;
