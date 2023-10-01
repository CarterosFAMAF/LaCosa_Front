import React, { useState } from "react";
import useWebSocket from "react-use-websocket";
import { Container, Button, Typography } from "@mui/material";
import "./lobby.css";

function Lobby({partida_id, id_jugador, creador }) {
  const [jugadores, setJugadores] = useState([])

  const handleSubmit = async (event) => {
    event.preventDefault();
    alert("buenas");
  };

  const ws = useWebSocket(`127.0.0.1:8000/ws/matchs/${partida_id}/${id_jugador}`);
  ws.onmessage = (event) => {
    //setJugadores(JSON.parse(event.data));
    //console.log(jugadores);
    //setCantJugadores(jugadores.length)
    console.log(JSON.parse(event));
  };

  const output = [];

  jugadores.forEach((jugador, index) => {
    output.push(
      <li key={index} className="listajugadores">
        <Typography> {jugador} </Typography>
      </li>
    );
  });
  return (
    <Container>
      <Typography className="tituloLobby" component="h2">
        Lobby: {partida_id}
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
  );
}

export default Lobby;
