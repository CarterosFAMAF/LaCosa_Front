import React, { useState } from "react";
import useWebSocket from "react-use-websocket";
import { useNavigate } from "react-router-dom";
import { Container, Button, Typography, Modal, Box } from "@mui/material";
import "./lobby.css";

function Lobby({
  partidaID,
  partidaNombre,
  jugadorID,
  creador,
  open,
  setOpen,
}) {
  const [jugadores, setJugadores] = useState([]);
  const [connected, setConnected] = useState(true);

  const socketUrl = `ws://localhost:8000/ws/matches/${partidaID}/${jugadorID}`;
  const urlIniciar = `http://127.0.0.1:8000/partidas/${partidaID}/iniciar`;

  const navigate = useNavigate();

  const endpoint_params_iniciar = {
    match_id: partidaID,
    player_id: jugadorID,
  };

  useWebSocket(
    socketUrl,
    {
      onOpen: () => {
        console.log("Connected");
      },
      onMessage: () => {
        const parsedData = JSON.parse(JSON.parse(event.data));
        setJugadores(parsedData.players);
      },
      onClose: () => {
        setOpen(false);
        console.log("Closed");
      },
    },
    connected
  );

  const handleSubmit = async (event) => {
    /*
    event.preventDefault();
    alert("Iniciar Partida");
    axios
      .put(urlIniciar, endpoint_params_iniciar)
      .then(function (response) {
        console.log(response);
        navigate("/jugador", { state: websocketref });
      })
      .catch(function (response) {
        alert(`error: ${response.message}`);
      });
    */
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
      onClose={() => setOpen(true)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box className="modal">
        <Container>
          <Typography className="tituloLobby">{partidaNombre}</Typography>
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
            onClick={() => setConnected(false)}
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
