import "./lobby.css";
import React, { useState } from "react";
import useWebSocket from "react-use-websocket";
import { redirect } from "react-router-dom";
import { Container, Button, Typography, Modal, Box } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { salirPartida } from "../../../store/jugadorSlice";

function Lobby() {
  const jugador = useSelector((state) => state.jugador);
  const dispatch = useDispatch();

  const socketUrl = `ws://localhost:8000/ws/matches/${jugador.partidaId}/${jugador.id}`;
  const urlIniciar = `http://127.0.0.1:8000/partidas/${jugador.partidaId}/iniciar`;

  const [jugadores, setJugadores] = useState([]);

  const endpoint_params_iniciar = {
    match_id: jugador.partidaId,
    player_id: jugador.id,
  };

  useWebSocket(
    socketUrl,
    {
      onOpen: () => {
        console.log("Connected");
      },
      onMessage: (event) => {
        const parsedData = JSON.parse(JSON.parse(event.data));
        setJugadores(parsedData.players);
      },
      onClose: () => {
        console.log("Closed");
      },
    },
    jugador.unido
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
    redirect("/jugador");
  };

  const output = [];

  jugadores.forEach((jugadorElem) => {
    output.push(
      <li key={jugadorElem.id} className="listajugadores">
        <Typography> {jugadorElem.name} </Typography>
      </li>
    );
  });

  return (
    <Modal
      open={true}
      backdrop="static"
      keyboard="false"
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box className="modal">
        <Container>
          <Typography className="tituloLobby">
            {jugador.partidaNombre}
          </Typography>
          <hr />
          <Typography> Jugadores ({jugadores.length}): </Typography>
          {output}
          <br />
          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={
              !jugador.creador || jugadores.length < jugador.minJugadores
            }
            className="boton_iniciar"
          >
            Iniciar Partida
          </Button>
          <br />
          <Button
            variant="contained"
            onClick={() => dispatch(salirPartida())}
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
