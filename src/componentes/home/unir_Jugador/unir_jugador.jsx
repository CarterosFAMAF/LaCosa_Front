import React, { useState } from "react";
import "./unir_jugador.css";
import Lobby from "../lobby/lobby";
import axios from "axios";
import { Container, TextField, Button, Modal, Box } from "@mui/material";

function UnirJugador() {
  const [nombreJugador, setNombreJugador] = useState("");
  const [partida_id, setPartida] = useState("");
  const [open, setOpen] = React.useState(false);

  const param_union = {
    player_name: nombreJugador,
    match_id: partida_id,
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (partida_id && nombreJugador) {
      const url = `http://127.0.0.1:8000/matches/${partida_id}/join`;

      axios
        .post(url, param_union)
        .then(function (response) {
          console.log(response);
          alert(`Te uniste a la partida ${partida_id}`);
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
        value={partida_id}
        required
        fullWidth
        variant="outlined"
        type="Number"
        onChange={(e) => setPartida(e.target.value)}
      />
      <TextField
        label="Nombre de jugador"
        name="nombre_jugador"
        value={nombreJugador}
        required
        fullWidth
        type="Text"
        onChange={(e) => setNombreJugador(e.target.value)}
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
          <Lobby partida_id={partida_id} id_jugador={0} creador={false} />
        </Box>
      </Modal>
    </Container>
  );
}

export default UnirJugador;
