import { graphReducer } from "./graph.reducer";

describe("graphReducer", () => {
  test("adds vertex to state with h", () => {
    const state = {
      adjList: {},
      vProps: {}, // vertex properties v : x,y,h
      start: "",
      end: "",
    };

    const action = {
      type: "@graph/addVertex",
      payload: {
        name: "Vertice",
        h: 5,
      },
    };
    const expectedState = {
      adjList: { Vertice: [] },
      vProps: { Vertice: { x: 0, y: 0, h: 5 } }, // vertex properties v : x,y,h
      start: "",
      end: "",
    };
    const newState = graphReducer(state, action);
    expect(newState).toEqual(expectedState);
  });

  test("adds vertex to state without h", () => {
    const state = {
      adjList: {},
      vProps: {}, // vertex properties v : x,y,h
      start: "",
      end: "",
    };

    const action = {
      type: "@graph/addVertex",
      payload: {
        name: "Vertice",
      },
    };
    const expectedState = {
      adjList: { Vertice: [] },
      vProps: { Vertice: { x: 0, y: 0, h: 0 } }, // vertex properties v : x,y,h
      start: "",
      end: "",
    };
    const newState = graphReducer(state, action);
    expect(newState).toEqual(expectedState);
  });

  test("add repeated vertex", () => {
    const action = {
      type: "@graph/addVertex",
      payload: {
        name: "Vertice",
      },
    };
    const state = {
      adjList: { Vertice: [] },
      vProps: { Vertice: { x: 0, y: 0, h: 5 } }, // vertex properties v : x,y,h
      start: "",
      end: "",
    };
    const expectedState = {
      adjList: { Vertice: [] },
      vProps: { Vertice: { x: 0, y: 0, h: 5 } }, // vertex properties v : x,y,h
      start: "",
      end: "",
    };
    const newState = graphReducer(state, action);
    expect(newState).toEqual(expectedState);
  });

  test("delete vertex", () => {
    const action = {
      type: "@graph/deleteVertex",
      payload: {
        name: "Vertice",
      },
    };
    const state = {
      adjList: { Vertice: [["Vertice2", 6]], Vertice2: [["Vertice", 6]] },
      vProps: { Vertice: { x: 0, y: 0, h: 5 }, Vertice2: { x: 0, y: 0, h: 3 } }, // vertex properties v : x,y,h
      start: "",
      end: "",
    };
    const expectedState = {
      adjList: { Vertice2: [] },
      vProps: { Vertice2: { x: 0, y: 0, h: 3 } }, // vertex properties v : x,y,h
      start: "",
      end: "",
    };
    const newState = graphReducer(state, action);
    expect(newState).toEqual(expectedState);
  });

  test("modify vertex", () => {
    const action = {
      type: "@graph/modifyVertex",
      payload: {
        name: "Vertice",
        newName: "mod",
        newH: 4,
      },
    };
    const state = {
      adjList: { Vertice: [["Vertice2", 6]], Vertice2: [["Vertice", 6]] },
      vProps: { Vertice: { x: 0, y: 0, h: 5 }, Vertice2: { x: 0, y: 0, h: 3 } }, // vertex properties v : x,y,h
      start: "",
      end: "",
    };
    const expectedState = {
      adjList: { mod: [["Vertice2", 6]], Vertice2: [["mod", 6]] },
      vProps: { mod: { x: 0, y: 0, h: 4 }, Vertice2: { x: 0, y: 0, h: 3 } }, // vertex properties v : x,y,h
      start: "",
      end: "",
    };

    const newState = graphReducer(state, action);
    expect(newState).toEqual(expectedState);
  });

  test("add edge with d", () => {
    const action = {
      type: "@graph/addEdge",
      payload: {
        v1: "Vertice",
        v2: "Vertice2",
        d: 6,
      },
    };
    const state = {
      adjList: { Vertice: [], Vertice2: [] },
      vProps: { Vertice: { x: 0, y: 0, h: 5 }, Vertice2: { x: 0, y: 0, h: 3 } }, // vertex properties v : x,y,h
      start: "",
      end: "",
    };
    const expectedState = {
      adjList: { Vertice: [["Vertice2", 6]], Vertice2: [["Vertice", 6]] },
      vProps: { Vertice: { x: 0, y: 0, h: 5 }, Vertice2: { x: 0, y: 0, h: 3 } }, // vertex properties v : x,y,h
      start: "",
      end: "",
    };
    const newState = graphReducer(state, action);
    expect(newState).toEqual(expectedState);
  });

  test("add edge without d", () => {
    const action = {
      type: "@graph/addEdge",
      payload: {
        v1: "Vertice",
        v2: "Vertice2",
      },
    };
    const state = {
      adjList: { Vertice: [], Vertice2: [] },
      vProps: { Vertice: { x: 0, y: 0, h: 5 }, Vertice2: { x: 0, y: 0, h: 3 } }, // vertex properties v : x,y,h
      start: "",
      end: "",
    };
    const expectedState = {
      adjList: { Vertice: [["Vertice2", 0]], Vertice2: [["Vertice", 0]] },
      vProps: { Vertice: { x: 0, y: 0, h: 5 }, Vertice2: { x: 0, y: 0, h: 3 } }, // vertex properties v : x,y,h
      start: "",
      end: "",
    };
    const newState = graphReducer(state, action);
    expect(newState).toEqual(expectedState);
  });

  test("attempt to add repeated edge", () => {
    const action = {
      type: "@graph/addEdge",
      payload: {
        v1: "Vertice",
        v2: "Vertice2",
      },
    };
    const state = {
      adjList: { Vertice: [["Vertice2", 0]], Vertice2: [["Vertice", 0]] },
      vProps: { Vertice: { x: 0, y: 0, h: 5 }, Vertice2: { x: 0, y: 0, h: 3 } }, // vertex properties v : x,y,h
      start: "",
      end: "",
    };

    const newState = graphReducer(state, action);
    expect(newState).toEqual(state);
  });

  test("delete edge", () => {
    const action = {
      type: "@graph/deleteEdge",
      payload: {
        v1: "Vertice",
        v2: "Vertice2",
      },
    };
    const state = {
      adjList: {
        Vertice: [
          ["Vertice2", 6],
          ["Vertice3", 7],
        ],
        Vertice2: [["Vertice", 6]],
        Vertice3: [["Vertice", 7]],
      },
      vProps: {
        Vertice: { x: 0, y: 0, h: 5 },
        Vertice2: { x: 0, y: 0, h: 3 },
        Vertice3: { x: 0, y: 0, h: 2 },
      }, // vertex properties v : x,y,h
      start: "",
      end: "",
    };
    const expectedState = {
      adjList: {
        Vertice: [["Vertice3", 7]],
        Vertice2: [],
        Vertice3: [["Vertice", 7]],
      },
      vProps: {
        Vertice: { x: 0, y: 0, h: 5 },
        Vertice2: { x: 0, y: 0, h: 3 },
        Vertice3: { x: 0, y: 0, h: 2 },
      }, // vertex properties v : x,y,h
      start: "",
      end: "",
    };

    const newState = graphReducer(state, action);
    expect(newState).toEqual(expectedState);
  });

  test("update coords", () => {
    const action = {
      type: "@graph/updateCoords",
      payload: {
        name: "Vertice",
        x: 5,
        y: 5,
      },
    };
    const state = {
      adjList: { Vertice: [] },
      vProps: { Vertice: { x: 0, y: 0, h: 5 } }, // vertex properties v : x,y,h
      start: "",
      end: "",
    };
    const expectedState = {
      adjList: { Vertice: [] },
      vProps: { Vertice: { x: 5, y: 5, h: 5 } }, // vertex properties v : x,y,h
      start: "",
      end: "",
    };
    const newState = graphReducer(state, action);
    expect(newState).toEqual(expectedState);
  });
});
