import "./unir_jugador.css";
import React, { useState } from "react";
import axios from "axios";
import { Container, TextField, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { unirPartida } from "../../../store/jugadorSlice";
import { useSnackbar } from "notistack";

function UnirJugador() {
  const jugador = useSelector((state) => state.jugador);
  const dispatch = useDispatch();

  const { enqueueSnackbar } = useSnackbar();

  const [partidaInput, setPartidaInput] = useState({
    player_name: "",
    match_id: jugador.partidaId
  });
  

  const [hasPressedButton, setHasPressedButton] = useState(false);

  const handleChange = (event) => {
    setPartidaInput({
      ...partidaInput,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    if (partidaInput.player_name === "") {
      enqueueSnackbar("Es necesario especificar un nombre de usuario!", {
        variant: "error"
      });
      setHasPressedButton(true)
      return;
    }

    const url = `http://127.0.0.1:8000/matches/${partidaInput.match_id}/join`;

    axios
      .post(url, partidaInput)
      .then(function (response) {
        enqueueSnackbar(
          `Te uniste a la partida con Nombre: ${response.data.match_name}, tu ID de Jugador es: ${response.data.player_id}`
          , {
            variant: "success"
          });

        const formatoJugador = {
          id: response.data.player_id,
          nombre: partidaInput.player_name,
          partidaId: partidaInput.match_id,
          partidaNombre: response.data.match_name,
          unido: true,
          creador: false,
        };

        dispatch(unirPartida(formatoJugador));
      })
      .catch(function (response) {
        if (response.response.status === 400){
          enqueueSnackbar("La partida ya está llena.", {
            variant: "error",
          });
        }
        if ((response.response.status === 404)){
          enqueueSnackbar("La Partida ya no existe.", {
          variant: "error",
          });
        }
      });
  }

  return (
    <Container className="unir_jugador">
      <h2>Unirse a {jugador.partidaNombre} ( ID: {jugador.partidaId} )</h2>
      <TextField
         label={<span style={{ color: "white" }}>Nombre de jugador</span>}
        name="player_name"
        value={partidaInput.player_name}
        required
        variant = "filled"
        type="Text"
        error={partidaInput.player_name == "" && hasPressedButton}
        helperText={(partidaInput.player_name == "" && hasPressedButton) ? "El campo es Requerido" : ""}
        onChange={(event) => handleChange(event)}
        className="textfield_unir"
      />
      <br />
      <br />
      <Button variant="contained" onClick={handleSubmit} className="boton_unir">
        Unirse
      </Button>
    </Container>
  );
}

export default UnirJugador;
