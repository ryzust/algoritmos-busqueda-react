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
    this.state = {
      algoritmos: [
        "A*",
        "Primero el mejor",
        "Ascenso por la colina (MAX)",
        "Ascenso por la colina (MIN)",
        "Busqueda en profundidad",
        "Busqueda en anchura",
      ],
      algSelected: "A*",
    };
  }

  render() {
    return (
      <DndProvider backend={HTML5Backend}>
        <div className="App" style={{ overflow: "hidden" }}>
          <ActionsBar
            algoritmos={this.state.algoritmos}
            sAlg={this.state.algSelected}
            handleChange={(e) => {
              this.setState({ algSelected: e.target.value });
            }}
          />
          <Grid container>
            <Grid item xs={3} sx={{ height: "100%" }}>
              <Sidebar />
            </Grid>
            <Grid item xs={9} sx={{ height: "100%" }}>
              <Editor />
            </Grid>
          </Grid>
        </div>
      </DndProvider>
    );
  }
}

export default App;
