import React, { useState } from "react";
import useWebSocket from "react-use-websocket";
import { Container, Button, Typography } from "@mui/material";
import "./lobby.css";

function Lobby({ partida, id_jugador, creador }) {
  const [jugadores, setJugadores] = useState([
    "Juan",
    "ignacio",
    "adolfo",
    "ernesto",
  ]);
  const [cantJugadores, setCantJugadores] = useState(4);
  const handleSubmit = async (event) => {
    event.preventDefault();

    alert("buenas");
  };

  const ws = useWebSocket(`127.0.0.1:8000/ws/matchs/${partida}/${id_jugador}`);
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
        Lobby: {partida}
      </Typography>
      <br />
      <br />
      <Typography> Jugadores ({cantJugadores}): </Typography>
      {output}
      <Button
        variant="contained"
        onClick={handleSubmit}
        disabled={!creador || cantJugadores < 4}
        className="boton_iniciar"
      >
        Iniciar Partida
      </Button>
    </Container>
  );
}

export default Lobby;
