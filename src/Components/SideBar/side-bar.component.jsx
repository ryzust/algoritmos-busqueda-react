import {
  Paper,
  FormControl,
  TextField,
  Button,
  MenuItem,
  InputLabel,
  Select,
} from "@mui/material";
import { useState } from "react";

export const Sidebar = ({ addVertice, addEdge, vertices }) => {
  const [name, setName] = useState("");
  const [h, setH] = useState(0);
  const [costo, setCosto] = useState(0);
  const [e1, setE1] = useState(vertices[0]);
  const [e2, setE2] = useState(vertices[1]);
  const handleClick = () => {
    if (/^([0-9]+\.?[0-9]*|\.[0-9]+)$/.test(h)) {
      addVertice(name, h);
    } else {
      alert("Heuristica invalida");
    }
  };
  const handleAddEdge = () => {
    if (/^([0-9]+\.?[0-9]*|\.[0-9]+)$/.test(costo)) {
      if (e1 !== e2) {
        addEdge([e1, e2], costo);
      } else {
        alert("No se puede conectar un nodo consigo mismo");
      }
    } else {
      alert("Costo invalido");
    }
  };
  return (
    <Paper sx={{ ml: "1rem" }}>
      <center>
        <h1> Agregar Nodo</h1>
      </center>
      <FormControl fullWidth>
        <TextField
          label="Nombre"
          sx={{ my: 2 }}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          label="Heuristica"
          inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
          sx={{ my: 2 }}
          defaultValue={0}
          onChange={(e) => setH(e.target.value)}
        />
        <Button
          sx={{ my: 2 }}
          onClick={handleClick}
          color="primary"
          variant="contained"
        >
          Agregar
        </Button>
      </FormControl>
      <center>
        <h1> Agregar Conexion</h1>
      </center>
      <FormControl fullWidth>
        <InputLabel id="e1">Punto 1</InputLabel>
        <Select
          labelId="e1"
          value={e1}
          label="Punto 1"
          onChange={(e) => setE1(e.target.value)}
          sx={{ my: 2 }}
        >
          {vertices.map((e) => {
            return (
              <MenuItem value={e} key={e}>
                {e}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
      <FormControl fullWidth>
        <InputLabel id="e2">Punto 2</InputLabel>
        <Select
          labelId="e2"
          value={e2}
          label="Punto 2"
          onChange={(e) => setE2(e.target.value)}
          sx={{ my: 2 }}
        >
          {vertices.map((e) => {
            return (
              <MenuItem value={e} key={e}>
                {e}
              </MenuItem>
            );
          })}
        </Select>
        <TextField
          label="Costo"
          inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
          sx={{ my: 2 }}
          defaultValue={0}
          onChange={(e) => setCosto(e.target.value)}
        />
        <Button
          sx={{ my: 2 }}
          onClick={handleAddEdge}
          color="primary"
          variant="contained"
        >
          Agregar
        </Button>
      </FormControl>
    </Paper>
  );
};
