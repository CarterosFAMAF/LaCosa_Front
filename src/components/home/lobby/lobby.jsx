import "./lobby.css";
import React from "react";
import { Container, Button, Typography, Modal, Box } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { salirPartida } from "../../../store/jugadorSlice";

function Lobby() {
  const jugador = useSelector((state) => state.jugador);
  const lobbyData = useSelector((state) => state.lobby);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const urlIniciar = `http://127.0.0.1:8000/partidas/${jugador.partidaId}/iniciar`;

  const endpoint_params_iniciar = {
    match_id: jugador.partidaId,
    player_id: jugador.id,
  };

  const handleSubmit = async (event) => {
    /*
    event.preventDefault();
    alert("Iniciar Partida");
    axios
      .put(urlIniciar, endpoint_params_iniciar)
      .then(function (response) {
        console.log(response);
        navigate("/partida", { state: websocketref });
      })
      .catch(function (response) {
        alert(`error: ${response.message}`);
      });
    */
    navigate("/partida");
  };

  const output = [];

  lobbyData.jugadores.forEach((jugadorElem) => {
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
          <Typography> Jugadores ({lobbyData.jugadores.length}): </Typography>
          {output}
          <br />
          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={
              !jugador.creador ||
              lobbyData.jugadores.length < lobbyData.minJugadores
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
