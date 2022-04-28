import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Select, FormControl, InputLabel, MenuItem, Fab } from "@mui/material";
import { PlayArrow } from "@mui/icons-material";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../../Actions/index";
import React from "react";

export const ActionsBar = ({ algoritmos, sAlg, handleChange }) => {
  const start = useSelector((state) => state.start);
  const end = useSelector((state) => state.end);
  const vertices = useSelector((state) => Object.keys(state.adjList));

  const dispatch = useDispatch();

  const handleGetSolution = () => {
    switch (sAlg) {
      case "Busqueda en profundidad":
        dispatch(actions.getPath("DFS"));
        break;
      case "Busqueda en anchura":
        dispatch(actions.getPath("BFS"));
        break;
      case "Ascenso por la colina (MIN)":
        dispatch(actions.getPath("HC_Min"));
        break;
      case "Ascenso por la colina (MAX)":
        dispatch(actions.getPath("HC_Max"));
        break;
      case "Primero el mejor":
        dispatch(actions.getPath("GBFS"));
        break;
      case "A*":
        dispatch(actions.getPath("A*"));
        break;

      default:
        break;
    }
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="transparent">
        <Toolbar sx={{ pt: 0.5, pb: 0.5 }}>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Algoritmos de busqueda
          </Typography>
          <FormControl sx={{ mr: 3 }}>
            <InputLabel id="s1">Algoritmo</InputLabel>
            <Select
              labelId="s1"
              id="selectedAlgorithm"
              label="Algoritmo"
              autoWidth
              margin="dense"
              value={sAlg}
              onChange={handleChange}
              style={{ minWidth: 200 }}
            >
              {algoritmos.map((alg) => (
                <MenuItem key={alg} value={alg}>
                  {alg}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl>
            <InputLabel id="s2">Inicio</InputLabel>
            <Select
              labelId="s2"
              id="start"
              label="Inicio"
              autoWidth
              margin="dense"
              value={start}
              onChange={(e) => dispatch(actions.setStart(e.target.value))}
              style={{ minWidth: 200 }}
            >
              {vertices.map((alg) => (
                <MenuItem key={alg} value={alg}>
                  {alg}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl sx={{ mr: 3 }}>
            <InputLabel id="s3">Fin</InputLabel>
            <Select
              labelId="s3"
              id="end"
              label="Fin"
              autoWidth
              margin="dense"
              value={end}
              onChange={(e) => dispatch(actions.setEnd(e.target.value))}
              style={{ minWidth: 200 }}
            >
              {vertices.map((alg) => (
                <MenuItem key={alg} value={alg}>
                  {alg}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Fab sx={{ ml: 0 }} color="primary" onClick={handleGetSolution}>
            <PlayArrow color="inherit"></PlayArrow>
          </Fab>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
