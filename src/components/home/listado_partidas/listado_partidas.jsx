//import "./unir_jugador.css";
import React, { useState } from "react";
import axios from "axios";
import { Container, TextField, Button, Modal, Typography, Box } from "@mui/material";
import { useDispatch } from "react-redux";
import { unirPartida } from "../../../store/jugadorSlice";
import { useSnackbar } from "notistack";
import UnirJugador from "../unir_jugador/unir_jugador";


function ListadoPartidas() {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const [open, setOpen] = useState(false)

  const [partidaInput, setPartidaInput] = useState({
    player_name: "",
    match_id: "",
    match_name: ""
  });

  const response_fake = {
    partida: [{id: 1, nombre: "Partidasa"}, {id: 2, nombre: "pochoclo"}, {id: 3, nombre: "Fiesta de ernesto"}]
  };


  const handleRefresh = async (event) => {
    console.log("eeeee dame partidulis")
  }

  const output = [];
  response_fake.partida.forEach((partidaElem) => {
    output.push(
      <li key={partidaElem.id} className="listajugadores">
        <Typography> {partidaElem.nombre} </Typography>
        <Button variant="contained" onClick={() => setOpen(true)} className="boton_unir">
        Unirse
        </Button>
      </li>
    );
  });

  return (
    <Container className="unir_jugador">
      <h2>Listado de Partidas</h2>
      <Button variant="contained" onClick={handleRefresh} className="boton_unir">
        Actualizar Listado
      </Button>
      {output}
      <Modal 
       open={open}>
        <Box className="modal">
            <UnirJugador/>
            <Button variant="contained" onClick={() => setOpen(false)} className="boton_unir"> cancelar </Button>
        </Box>
      </Modal>
    </Container>
  );
}

export default ListadoPartidas;

// pasar paremtros para saber el id y el nombre 
// puedo hacerlo en un modal o directamente ahi dentro