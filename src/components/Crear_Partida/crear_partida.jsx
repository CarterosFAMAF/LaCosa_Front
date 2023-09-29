import { useState } from 'react';
import axios from "axios";
import {
  TextField,
  Button,
  Container,
  Select,
  MenuItem
} from "@mui/material";
import "./crear_partida.css";

// import
const Crear_partida = () => {

    const [name, setName] = useState("");

    const [partida, setPartida] = useState({
      nombre_jugador : '',
      nombre_partida : '',
      nro_min_jug : 4,
      nro_max_jug : 12,
      //contra : ''
    });

    const handleChange = (event) => {
      setPartida({ ...partida, [event.target.name]: event.target.value });
    };

    const handleSubmit = (event) => {
      var bodyFormData = new FormData();

      if (partida.nombre_jugador === '' || partida.nombre_partida === '' || partida.nro_min_jug === '' || partida.nro_max_jug === '') {
        alert("All fields are required");
      }

      bodyFormData.append('player_name', partida.nombre_jugador);
      bodyFormData.append('match_name', partida.nombre_partida);
      bodyFormData.append('min_players', partida.nro_min_jug);
      bodyFormData.append('max_players', partida.nro_max_jug);
      
      /*
      if(partida.contra != ''){
        bodyFormData.append('contra', 'contra');
      }
      */

      axios({
        method: 'post',
        url:  'http://127.0.0.1:8000/matchs',
        data: bodyFormData,
        headers: { "Content-Type": "multipart/form-data" },

      })
      .then(function (response) {
        //handle success
        console.log(response);
        alert(`Se creo la partida con exito. Su ID de usuario es, ${response.data.player_id} y su ID de partida ${response.data.match_id}` );
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
            name = 'nombre_partida'
            value = {partida.nombre_partida}
            //className={styles.TextField}
            required
            fullWidth
            variant="outlined"
            type = "Text"
            onChange={handleChange}/>
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
            label= "nombre_jugador"
            name = 'nombre_jugador'
            value = {partida.nombre_jugador}
            required
            fullWidth
            type = "Text"
            onChange={handleChange}/>
        <Select
            label="Minimo de jugadores"
            name="nro_min_jug"
            value={partida.nro_min_jug}
            fullWidth
            required
            onChange={handleChange}
          >
          {(Array.from({ length: (partida.nro_max_jug - 3) }, (_, i) => i + 4)).map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
          </Select>
          <Select
            className="maxjugadores"
            label="maximo de jugadores"
            name="nro_max_jug"
            value={partida.nro_max_jug}
            fullWidth
            required
            onChange={handleChange}
          >
          {(Array.from({ length: (12 - partida.nro_min_jug + 1) }, (_, i) => i + partida.nro_min_jug)).map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
          </Select>        
        <Button variant="contained" onClick={handleSubmit} className="miboton"> Crear Partida </Button>
    </Container>
    );
  }

export default Crear_partida;
          