import "./crear_partida.css";
import Lobby from "../lobby/lobby";
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

function CrearPartida() {
  const [open, setOpen] = useState(false);

  const [partida, setPartida] = useState({
    player_name: "",
    match_name: "",
    max_players: 12,
    min_players: 4,
  });

  const [paramlobby, setParamLobby] = useState({
    match_id: 0,
    id_jugador: 0,
  });

  const handleChange = (event) => {
    setPartida({ ...partida, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    if (partida.player_name === "" || partida.nombre_partida === "") {
      alert("All fields are required");
      return;
    }
    const url = "http://127.0.0.1:8000/matches";
    axios
      .post(url, partida)
      .then(function (response) {
        console.log(response);
        alert(
          `Se creo la partida con exito. Su ID de usuario es: ${response.data.owner_id}. 
          Su ID de partida: ${response.data.match_id}`
        );
        setParamLobby({
          match_id: response.data.match_id,
          id_jugador: response.data.owner_id,
        });
        setOpen(true);
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
        value={partida.match_name}
        required
        fullWidth
        type="Text"
        onChange={(event) => handleChange(event)}
      />
      <TextField
        label="Nombre de jugador"
        name="player_name"
        value={partida.player_name}
        required
        fullWidth
        type="Text"
        onChange={handleChange}
      />
      <Typography> Minimo de jugadores </Typography>
      <Select
        name="min_players"
        value={partida.min_players}
        fullWidth
        required
        onChange={handleChange}
      >
        {Array.from({ length: partida.max_players - 3 }, (_, i) => i + 4).map(
          (option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          )
        )}
      </Select>
      <Typography> Maximo de jugadores </Typography>
      <Select
        name="max_players"
        value={partida.max_players}
        fullWidth
        onChange={handleChange}
      >
        {Array.from(
          { length: 12 - partida.min_players + 1 },
          (_, i) => i + partida.min_players
        ).map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
      <Button variant="contained" onClick={handleSubmit} className="miboton">
        Crear Partida
      </Button>

      {open && (
        <Lobby
          partidaID={paramlobby.match_id}
          partidaNombre={partida.match_name}
          partidaMin={partida.min_players}
          jugadorID={paramlobby.id_jugador}
          creador={true}
          open={open}
          setOpen={setOpen}
        />
      )}
    </Container>
  );
}

export default CrearPartida;
