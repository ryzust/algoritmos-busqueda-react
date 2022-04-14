import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Select, FormControl, InputLabel, MenuItem, Fab } from "@mui/material";
import { PlayArrow } from "@mui/icons-material";

export const ActionsBar = ({
  algoritmos,
  sAlg,
  handleChange,
  grafo,
  handleChangeEnd,
  handleChangeStart,
}) => {
  let start = grafo.start;
  let end = grafo.end;
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="transparent">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Busqueda Informada
          </Typography>
          <FormControl>
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
              onChange={handleChangeStart}
              style={{ minWidth: 200 }}
            >
              {grafo.vertices.map((alg) => (
                <MenuItem key={alg} value={alg}>
                  {alg}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl sx={{ mx: 3 }}>
            <InputLabel id="s3">Fin</InputLabel>
            <Select
              labelId="s3"
              id="end"
              label="Fin"
              autoWidth
              margin="dense"
              value={end}
              onChange={handleChangeEnd}
              style={{ minWidth: 200 }}
            >
              {grafo.vertices.map((alg) => (
                <MenuItem key={alg} value={alg}>
                  {alg}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Fab sx={{ ml: 0 }} color="primary">
            <PlayArrow color="inherit"></PlayArrow>
          </Fab>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
