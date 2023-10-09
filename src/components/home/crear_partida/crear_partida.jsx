import "./crear_partida.css";
import { useState } from "react";
import axios from "axios";
import {
  TextField,
  Button,
  Container,
  Select,
  MenuItem,
  Typography,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { unirPartida } from "../../../store/jugadorSlice";
import { lobbyDef } from "../../../store/lobbySlice";
import { useSnackbar } from "notistack";

function CrearPartida() {
  const url = "http://127.0.0.1:8000/matches";
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const [partidaInput, setPartidaInput] = useState({
    player_name: "",
    match_name: "",
    max_players: 12,
    min_players: 4,
  });

  const [hasPressedButton, setHasPressedButton] = useState(false);

  const handleChange = (event) => {
    setPartidaInput({
      ...partidaInput,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    if (partidaInput.player_name === "" || partidaInput.match_name === "") {
      enqueueSnackbar("Todos los campos son necesarios!", {
        variant: "error",
      });
      setHasPressedButton(true)
      return;
    }

    axios
      .post(url, partidaInput)
      .then(function (response) {
        enqueueSnackbar(
          `Se creo la partida con exito. Su ID de usuario es: ${response.data.owner_id}. 
          Su ID de partida: ${response.data.match_id}`
        ,{ 
          variant: "success",
          
        });

        const formatoJugador = {
          id: response.data.owner_id,
          nombre: partidaInput.player_name,
          partidaId: response.data.match_id,
          partidaNombre: partidaInput.match_name,
          unido: true,
          creador: true,
        };

        const formatoLobby = {
          maxJugadores: partidaInput.max_players,
          minJugadores: partidaInput.min_players,
        };

        dispatch(unirPartida(formatoJugador));
        dispatch(lobbyDef(formatoLobby));
      })
      .catch(function (response) {
        alert(`error: ${response.message}`);
      });
  };

  return (
    <Container className="crear_partida">
      <h2>Crear Partida</h2>
      <TextField
        label="Nombre de partida"
        name="match_name"
        value={partidaInput.match_name}
        required
        fullWidth
        type="Text"
        error={partidaInput.match_name == "" && hasPressedButton}
        helperText={(partidaInput.match_name == "" && hasPressedButton)? "El campo es Requerido" : ""}
        onChange={handleChange}
      />
      <TextField
        label="Nombre de jugador"
        name="player_name"
        value={partidaInput.player_name}
        required
        fullWidth
        type="Text"
        error={partidaInput.player_name == "" && hasPressedButton}
        helperText={(partidaInput.player_name == "" && hasPressedButton) ? "El campo es Requerido" : ""}
        onChange={handleChange}
      />
      <Typography> Minimo de jugadores </Typography>
      <Select
        name="min_players"
        value={partidaInput.min_players}
        fullWidth
        required
        onChange={handleChange}
      >
        {Array.from(
          { length: partidaInput.max_players - 3 },
          (_, i) => i + 4
        ).map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
      <Typography> Maximo de jugadores </Typography>
      <Select
        name="max_players"
        value={partidaInput.max_players}
        fullWidth
        onChange={handleChange}
      >
        {Array.from(
          { length: 12 - partidaInput.min_players + 1 },
          (_, i) => i + partidaInput.min_players
        ).map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
      <Button variant="contained" onClick={handleSubmit} className="miboton">
        Crear Partida
      </Button>
    </Container>
  );
}

export default CrearPartida;
