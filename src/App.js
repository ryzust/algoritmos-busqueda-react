import React, { Component } from "react";
import { ActionsBar } from "./Components/ActionsBar/actionsbar.component";
import { Sidebar } from "./Components/SideBar/side-bar.component";
import { Grid } from "@mui/material";
import { Editor } from "./Components/Editor/editor.component";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

class App extends Component {
  constructor() {
    super();
    this.addVertice.bind(this);
    this.deleteVertice.bind(this);
    this.modifyVertice.bind(this);
    this.addEdge.bind(this);
    this.state = {
      algoritmos: ["A*", "Primero el mejor", "Ascenso a la colina","Busqueda en profundidad","Busqueda en anchura"],
      grafo: {
        vertices: ["wea", "wea2", "xd"],
        h: [1, 2, 3],
        edges: [
          ["wea", "wea2"],
          ["wea", "xd"],
        ],
        g: [5, 6],
        start: "wea",
        end: "xd",
      },
      algSelected: "A*",
    };
  }
  addVertice = (name, hx) => {
    this.setState((prevState) => {
      let alreadyExists = prevState.grafo.vertices.indexOf(name);
      if (alreadyExists === -1) {
        return {
          ...prevState,
          grafo: {
            ...prevState.grafo,
            vertices: [...prevState.grafo.vertices, name],
            h: [...prevState.grafo.h, parseInt(hx)],
          },
        };
      } else {
        return { ...prevState };
      }
    });
    console.log("added ", name, hx);
  };

  modifyVertice = (pname, name, hx) => {
    this.setState((prevState) => {
      let idx = prevState.grafo.vertices.indexOf(pname);
      let copy = { ...prevState };
      console.log("Idx: ", idx);
      if (idx !== -1) {
        copy.grafo.vertices[idx] = name;
        copy.grafo.h[idx] = hx;
        for (let i = 0; i < copy.grafo.edges.length; i++) {
          let s = copy.grafo.edges[i].indexOf(pname);

          if (s !== -1) {
            copy.grafo.edges[i][s] = name;
          }
        }
      }
      return { copy };
    });
  };

  deleteVertice = (name) => {
    this.setState((prevState) => {
      let idx = prevState.grafo.vertices.indexOf(name);
      let copy = { ...prevState };
      console.log("Idx: ", idx);
      if (idx !== -1) {
        copy.grafo.vertices.splice(idx, 1);
        copy.grafo.h.splice(idx, 1);
        for (let i = 0; i < copy.grafo.edges.length; i++) {
          let s = copy.grafo.edges[i].indexOf(name);

          if (s !== -1) {
            copy.grafo.edges.splice(idx, 1);
          }
        }
      }
      return { copy };
    });
  };

  addEdge = (verticePair, gx) => {
    this.setState((prevState) => {
      let alreadyExists =
        prevState.grafo.edges.indexOf(verticePair) !== -1 ||
        prevState.grafo.edges.indexOf([verticePair[1], verticePair[0]]) !== -1;
      if (!alreadyExists) {
        return {
          ...prevState,
          grafo: {
            ...prevState.grafo,
            edges: [...prevState.grafo.edges, verticePair],
            g: [...prevState.grafo.g, parseInt(gx)],
          },
        };
      } else {
        return { ...prevState };
      }
    });
  };

  render() {
    return (
      <DndProvider backend={HTML5Backend}>
        {console.log(this.state.grafo)}
        <div className="App" style={{ overflow: "hidden" }}>
          <ActionsBar
            algoritmos={this.state.algoritmos}
            sAlg={this.state.algSelected}
            grafo={this.state.grafo}
            handleChange={(e) => {
              this.setState({ algSelected: e.target.value });
            }}
            handleChangeStart={(e) => {
              this.setState((prevState) => {
                return {
                  ...prevState,
                  grafo: {
                    ...prevState.grafo,
                    start: e.target.value,
                  },
                };
              });
            }}
            handleChangeEnd={(e) => {
              this.setState((prevState) => {
                return {
                  ...prevState,
                  grafo: {
                    ...prevState.grafo,
                    end: e.target.value,
                  },
                };
              });
            }}
          />
          <Grid container>
            <Grid item xs={3} sx={{ height: "100%" }}>
              <Sidebar
                addVertice={this.addVertice}
                addEdge={this.addEdge}
                vertices={this.state.grafo.vertices}
              />
            </Grid>
            <Grid item xs={9} sx={{ height: "100%" }}>
              <Editor
                grafo={this.state.grafo}
                modifyVertice={this.modifyVertice}
                deleteVertice={this.deleteVertice}
              />
            </Grid>
          </Grid>
        </div>
      </DndProvider>
    );
  }
}

export default App;
