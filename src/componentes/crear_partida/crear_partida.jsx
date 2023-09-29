import "./crear_partida.css";

import { useState } from 'react';
import axios from "axios";
import {
  TextField,
  Button,
  Container,
  Select,
  MenuItem
} from "@mui/material";

function CrearPartida (){

    const [partida, setPartida] = useState({
      player_name : '',
      match_name : '',
      min_players : 4,
      max_players : 12,
    });

    const handleChange = (event) => {
      setPartida({ ...partida, [event.target.name]: event.target.value });
    };

    const handleSubmit = (event) => {

      if (partida.nombre_jugador === '' || partida.nombre_partida === '' || partida.nro_min_jug > 3 || partida.nro_max_jug < 13) {
        alert("All fields are required");
        return
      }
      const url = 'http://127.0.0.1:8000/matchs'
      axios.post(url, partida)
      .then(function (response) {
        console.log(response);
        alert(`Se creo la partida con exito. Su ID de usuario es: ${response.data.owner_id}. Su ID de partida: ${response.data.match_id}, con nombre: ${response.data.match_name}` );
      })
      .catch(function (response) {
        //handle error
        alert(`error: ${response.message}`);
      });
    };

    return ( 
    <Container>
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
    </Container>
    );
  }

export default CrearPartida;
          