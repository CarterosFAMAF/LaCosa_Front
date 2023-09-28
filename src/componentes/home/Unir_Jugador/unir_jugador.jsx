import React, { useState } from 'react';
import './unir_jugador.css';

import{
    Container,
    TextField,
    Button
} from '@mui/material';

const Unir_Jugador = () => {

  const [name, setName] = useState("");

  const [partida, setPartida] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    
    if (partida && name){
      alert(`Te uniste a la partida ${partida}`);
    } else{
      alert('Es necesario que ingrese nombre de partida y jugador');
    }
  };

  return (
    <Container>
      <h2>Unir Jugador</h2>
      <TextField className="nombrepartida"
      label= "Nombre de partida"
      name = 'nombre_partida'
      value = {partida}
      required
      fullWidth
      variant="outlined"
      type = "Text"
      onChange={(e) => setPartida(e.target.value)}/>
      <TextField
      label= "Nombre de jugador"
      name = 'nombre_jugador'
      value = {name}
      required
      fullWidth
      type = "Text"
      onChange = {(e) => setName(e.target.value)} />
      <Button 
      variant="contained" 
      onClick={handleSubmit} 
      className="boton_unir"> 
      Unirse a Partida 
      </Button>
    </Container>
  );
}

export default Unir_Jugador;