import "./listado_partidas.css";
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
    partida: [
      {match_id: 1, match_name: "Partidasa", max_players:7, joined_players: 1}, 
      {match_id: 2, match_name: "pochoclo", max_players:8, joined_players: 2}, 
      {match_id: 3, match_name: "Fiesta de ernesto", max_players:9, joined_players: 3}]
  };




  const handleRefresh = async (event) => {
    console.log("eeeee dame partidulis")
    const url = `http://127.0.0.1:8000/matches/list`;

    axios
      .post(url, partidaInput)
      .catch(function (response) {
        enqueueSnackbar(`error: ${response.message}`, {
          variant: "error",
        });
      });
  }

  const output = [];
  response_fake.partida.forEach((partidaElem) => {
    output.push(
      <li key={partidaElem.match_id} className="listajugadores">
        <Typography className="partidas"> 
          {partidaElem.match_name} 
        </Typography>
        <Typography className="jugadores"> 
          {"Jugadores: (" + partidaElem.joined_players + "/" + partidaElem.max_players + ")" }
        </Typography>
        <Button variant="contained" onClick={() => setOpen(true)} className="boton_unir">
          unirse
        </Button>
      </li>
    );
  });

  return (
    <Container className="unir_jugador">
      <Typography className="listado"> 
        Listado de Partidas
      </Typography>
      <Button variant="contained" onClick={handleRefresh} className="boton_actualizar">
        Actualizar Listado
      </Button>
      {output}
      <Modal open={open}>
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