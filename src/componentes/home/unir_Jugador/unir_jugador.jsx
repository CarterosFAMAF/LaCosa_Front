import "./unir_jugador.css";

import React, { useState } from "react";
import axios from "axios";
import { Container, TextField, Button, Modal, Box } from "@mui/material";

import Lobby from "../lobby/lobby";

function UnirJugador() {
  const [jugadorID, setJugadorID] = useState("");
  const [jugadorNombre, setJugadorNombre] = useState("");

  const [partidaID, setPartidaID] = useState("");
  const [partidaNombre, setPartidaNombre] = useState("");

  const [open, setOpen] = React.useState(false);

  const endpoint_params_union = {
    player_name: jugadorNombre,
    match_id: partidaID,
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (partidaID && jugadorNombre) {
      const url = `http://127.0.0.1:8000/matches/${partidaID}/join`;

      axios
        .post(url, endpoint_params_union)
        .then(function (response) {
          console.log(response.data);
          setJugadorID(response.data.player_id);
          setPartidaNombre(response.data.match_name);
          alert(
            `Te uniste a la partida con Nombre: ${response.data.match_name}, tu ID de Jugador es: ${response.data.player_id}`
          );
          setOpen(true);
        })
        .catch(function (response) {
          alert(`error: ${response.message}`);
        });
    } else {
      alert("Es necesario que ingrese nombre de partida y jugador");
      return;
    }
  };

  return (
    <Container className="unir_jugador">
      <h2>Unirse a Partida</h2>
      <TextField
        className="nombrepartida"
        label="ID de partida"
        name="ID_partida"
        value={partidaID}
        required
        fullWidth
        variant="outlined"
        type="Number"
        onChange={(e) => setPartidaID(e.target.value)}
      />
      <TextField
        label="Nombre de jugador"
        name="nombre_jugador"
        value={jugadorNombre}
        required
        fullWidth
        type="Text"
        onChange={(e) => setJugadorNombre(e.target.value)}
      />
      <Button variant="contained" onClick={handleSubmit} className="boton_unir">
        Unirse a Partida
      </Button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="modal">
          <Lobby
            partidaID={partidaID}
            partidaNombre={partidaNombre}
            jugadorID={jugadorID}
            creador={false}
          />
        </Box>
      </Modal>
    </Container>
  );
}

export default UnirJugador;
