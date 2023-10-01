import "./crear_partida.css";
import Lobby from "../Lobby/lobby"
import { useState } from 'react';
import axios from "axios";
import {
  TextField,
  Button,
  Container,
  Select,
  MenuItem,
  Modal,
  Box
} from "@mui/material";

function CrearPartida (){

  const [open, setOpen] = useState(false);

  const [partida, setPartida] = useState({
    player_name : '',
    match_name : '',
    max_players : 12,
    min_players : 4
  });
  
  const [paramlobby, setParamLobby] = useState({
    match_name : 0,
    id_jugador : 0
  })

  const handleChange = (event) => {
    setPartida({ ...partida, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    if (partida.nombre_jugador === '' || partida.nombre_partida === '' || partida.nro_min_jug > 3 || partida.nro_max_jug < 13) {
      alert("All fields are required");
      return
    }
    const url = 'http://127.0.0.1:8000/matches'
    axios.post(url, partida)
    .then(function (response) {
      console.log(response);
      alert(`Se creo la partida con exito. Su ID de usuario es: ${response.data.owner_id}. Su ID de partida: ${response.data.match_id}` );
      setParamLobby({
        match_name: response.data.match_id, // en el futuro cambiar por el nombre
        id_jugador: response.data.owner_id
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
      <TextField className="nombrepartida"
          label= "Nombre de partida"
          name = 'match_name'
          value = {partida.match_name}
          required
          fullWidth
          variant="outlined"
          type = "Text"
          onChange={(event) => handleChange(event)}/>
      {/* Contraseña
      <TextField
          label= "Contraseña"
          name = 'contra'
          value = {partida.contra}
          fullWidth
          type = "Text"
          onChange={handleChange}/>
      */}
      <TextField
          label="Nombre de jugador"
          name="player_name"
          value={partida.player_name}
          required
          fullWidth
          type="Text"
          onChange={handleChange}/>
      <Select
          label="Minimo de jugadores"
          name="min_players"
          value={partida.min_players}
          fullWidth
          required
          onChange={handleChange}
        >
        {(Array.from({ length: (partida.max_players - 3) }, (_, i) => i + 4)).map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
        </Select>
        <Select
          className="maxjugadores"
          label="Maximo de jugadores"
          name="max_players"
          value={partida.max_players}
          fullWidth
          required
          onChange={handleChange}
        >
        {(Array.from({ length: (12 - partida.min_players + 1) }, (_, i) => i + partida.min_players)).map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
        </Select>        
      <Button variant="contained" onClick={handleSubmit} className="miboton"> Crear Partida </Button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
      <Box className="modal">
        <Lobby partida={paramlobby.match_name} id_jugador={paramlobby.id_jugador} creador={true}/>
      </Box>
    </Modal>
  </Container>
  );
  }

export default CrearPartida;
          