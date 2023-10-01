import React, { useState } from "react";
import useWebSocket from "react-use-websocket";
import { Container, Button, Typography, Modal, Box } from "@mui/material";
import "./lobby.css";

const import_partida_state = {
  started: false,
  turn_game: 0,
  players: [
    { id: 1, name: "Nay", turn: 0, alive: true },
    { id: 2, name: "Facu", turn: 0, alive: true },
    { id: 3, name: "Mateo", turn: 0, alive: true },
    { id: 4, name: "Mario", turn: 0, alive: true },
  ],
};

function Lobby({
  partidaID,
  partidaNombre,
  jugadorID,
  creador,
  open,
  setOpen,
}) {
  const [jugadores, setJugadores] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    alert("buenas");
  };

  const ws = useWebSocket(
    `127.0.0.1:8000/ws/matches/${partidaID}/${jugadorID}`
  );

  ws.onmessage = (event) => {
    setJugadores(event.data.players);
    console.log(JSON.parse(event));
  };

  const output = [];

  jugadores.forEach((jugador) => {
    output.push(
      <li key={jugador.id} className="listajugadores">
        <Typography> {jugador.name} </Typography>
      </li>
    );
  });
  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box className="modal">
        <Container>
          <Typography className="tituloLobby" component="h2">
            {partidaNombre}
          </Typography>
          <br />
          <br />
          <Typography> Jugadores ({jugadores.length}): </Typography>
          {output}
          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={!creador || jugadores.length < 4}
            className="boton_iniciar"
          >
            Iniciar Partida
          </Button>
        </Container>
      </Box>
    </Modal>
  );
}

export default Lobby;
