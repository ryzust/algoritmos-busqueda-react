import "./vertice.styles.css";
import React from "react";
import { useDrag } from "react-dnd";
import { IconButton } from "@mui/material";
import EditButton from "@mui/icons-material/Edit";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export const Vertice = ({
  id,
  name,
  h,
  left,
  top,
  modifyVertice,
  deleteVertice,
  type,
}) => {
  var leftBtn = left;
  const [open, setOpen] = React.useState(false);
  const [newName, setNewName] = React.useState("");
  const [newH, setNewH] = React.useState(0);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleModify = () => {
    if (newName.trim() !== "" && !isNaN(newH)) {
      modifyVertice(name, newName, newH);
      handleClose();
    } else {
      alert("Datos invalidos");
    }
  };

  const handleDelete = () => {
    //deleteVertice(name);
    handleClose();
  };
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: "vertice",
      item: { id, left, top },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [id, left, top]
  );
  if (isDragging) {
    return <div ref={drag} />;
  }
  return (
    <>
      <div>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Modificar {name}</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="newName"
              label="Nombre"
              type="text"
              fullWidth
              variant="standard"
              onChange={(e) => {
                setNewName(e.target.value);
              }}
            />
            <TextField
              margin="dense"
              id="newHe"
              label="Heuristica"
              fullWidth
              variant="standard"
              onChange={(e) => {
                setNewH(parseInt(e.target.value));
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Modificar</Button>
            <Button onClick={handleDelete}>Borrar</Button>
            <Button onClick={handleClose}>Cancelar</Button>
          </DialogActions>
        </Dialog>
      </div>
      <div
        ref={drag}
        style={{ left, top }}
        className={
          type === "vertice"
            ? "circle"
            : type === "start"
            ? "circle start"
            : "circle end"
        }
        role="vertice"
      >
        <IconButton
          style={{
            left: { leftBtn },
            top: { top },
            position: "absolute",
          }}
          onClick={handleClickOpen}
        >
          <EditButton />
        </IconButton>
        <p className="center">{name}</p>
        <p className="center" style={{ fontWeight: "bold" }}>
          h: {h}
        </p>
      </div>
    </>
  );
};
