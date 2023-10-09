import "./unir_jugador.css";
import React, { useState } from "react";
import axios from "axios";
import { Container, TextField, Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { unirPartida } from "../../../store/jugadorSlice";
import { useSnackbar } from "notistack";

function UnirJugador() {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const [partidaInput, setPartidaInput] = useState({
    player_name: "",
    match_id: "",
  });

  const [hasPressedButton, setHasPressedButton] = useState(false);

  const handleChange = (event) => {
    setPartidaInput({
      ...partidaInput,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    if (partidaInput.player_name === "" || partidaInput.match_id === "") {
      enqueueSnackbar("Todos los campos son necesarios!", {
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
      .catch(function (error) {
        alert(`error: ${error}`);
      });
  };

  return (
    <Container className="unir_jugador">
      <h2>Unirse a Partida</h2>
      <TextField
        label="ID de partida"
        name="match_id"
        value={partidaInput.match_id}
        required
        fullWidth
        type="Number"
        error={partidaInput.match_id == 0 && hasPressedButton}
        helperText={(partidaInput.match_id == 0 && hasPressedButton)? "El campo es Requerido" : ""}
        onChange={(event) => handleChange(event)}
        inputProps= { { min: 0}}
      />
      <TextField
        label="Nombre de jugador"
        name="player_name"
        value={partidaInput.player_name}
        required
        fullWidth
        type="Text"
        error={partidaInput.player_name == "" && hasPressedButton}
        helperText={(partidaInput.player_name == ""&& hasPressedButton) ? "El campo es Requerido" : ""}
        onChange={(event) => handleChange(event)}
      />
      <Button variant="contained" onClick={handleSubmit} className="boton_unir">
        Unirse a Partida
      </Button>
    </Container>
  );
}

export default UnirJugador;
