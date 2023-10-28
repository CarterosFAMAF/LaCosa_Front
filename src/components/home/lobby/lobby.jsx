import "./lobby.css";
import React from "react";
import axios from "axios";
import { Container, Button, Typography, Modal, Box } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { salirPartida, setJugadores } from "../../../store/jugadorSlice";
import { useSnackbar } from "notistack";

function Lobby() {
  const jugador = useSelector((state) => state.jugador);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const urlIniciar = `http://127.0.0.1:8000/matches/${jugador.partidaId}/start_game`;

  const endpoint_params_iniciar = {
    player_id: jugador.id,
    match_id: jugador.partidaId,
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    axios
      .put(urlIniciar, endpoint_params_iniciar)
      .then(function (response) {
        navigate("/partida"); // Borrar cuando ande Iniciar Partida.
      })
      .catch(function (response) {
        enqueueSnackbar(`error: ${response.message}`, {
          variant: "error",
        });
      });
  };

  const abandonar_lobby = () => {
    dispatch(salirPartida())
    dispatch(setJugadores([]))
  }

  const output = [];

  jugador.jugadores.forEach((jugadorElem) => {
    output.push(
      <li key={jugadorElem.id} className="listajugadores">
        <Typography> {jugadorElem.name} </Typography>
      </li>
    );
  });

  return (
    <Modal
      open={jugador.jugadores != 0}
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
          <Typography> Jugadores ({jugador.jugadores.length}): </Typography>
          {output}
          <br />
          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={
              !jugador.creador ||
              jugador.jugadores.length < jugador.minJugadores
            }
            className="boton_iniciar"
          >
            Iniciar Partida
          </Button>
          <br />
          <br />
          <Button
            variant="contained"
            onClick={() => abandonar_lobby()}
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
