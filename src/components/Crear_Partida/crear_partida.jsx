import { useState } from 'react';
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
      contra : ''
    });

    const handleChange = (event) => {
      setPartida({ ...partida, [event.target.name]: event.target.value });
    };

    const handleSubmit = (event) => {
      alert("creaste una partida");
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
        <TextField
            label= "Contraseña"
            name = 'contra'
            value = {partida.contra}
            fullWidth
            type = "Text"
            onChange={handleChange}/>
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
          