import React, { useState } from "react";
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
  const [jugadores, setJugadores] = useState(import_partida_state.players);
  const handleSubmit = async (event) => {
    event.preventDefault();
    alert("Iniciar Partida")
    //Hacer el Put al back para que inicie partida y si responde exitosamente usar:
    window.location.href = window.location.href + 'jugador';
  };

  const socketUrl = `ws://localhost:8000/ws/matches/${partidaID}/${jugadorID}`;

  // Create WebSocket connection.
  const socket = new WebSocket(socketUrl);

  // Connection opened
  socket.addEventListener("open", (event) => {
    console.log("me abrí")
  });

  // Listen for messages
  socket.addEventListener("message", (event) => {
    console.log("Message from server ", event.data);
  });

  const output = [];
  
  const close_connection = () => {
    setOpen(false)
    socket.close()
  }

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
      onClose={() => setOpen(true)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box className="modal">
        <Container>
          <Typography className="tituloLobby">
            <h2> {partidaNombre} </h2>
          </Typography>
          <hr />
          <Typography> Jugadores ({jugadores.length}): </Typography>
          {output}
          <br />
          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={!creador || jugadores.length < 4}
            className="boton_iniciar"
          >
            Iniciar Partida
          </Button>
          <br />
          <Button
            variant="contained"
            onClick={() => close_connection()}
            className="boton_abandonar"
          >
            Abandonar Partida
          </Button>
        </Container>
      </Box>
    </Modal>
  );
}

export default Lobby;
