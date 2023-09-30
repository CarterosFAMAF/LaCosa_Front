import React, { useState, useWebSocket  } from 'react';
import './unir_jugador.css';
import Lobby from "../Lobby/lobby"
import{
    Container,
    TextField,
    Button,
    Modal,
    Box,
    Typography
} from '@mui/material';

function UnirJugador () {

  const [name, setName] = useState("");
  const [partida, setPartida] = useState("");
  const [open, setOpen] = React.useState(false);

  const handleClose = () => setOpen(false);

  const handleSubmit = async event => {
    event.preventDefault();
    
    if (partida && name){
      alert(`Te uniste a la partida ${partida}`);
      setOpen(true)
      console.log(partida, name);
    } else{
      alert('Es necesario que ingrese nombre de partida y jugador');
      return
    }
  };

  return (
    <Container className="unir_jugador">
      <h2>Unirse a Partida</h2>
      <TextField className="nombrepartida"
      label= "ID de partida"
      name = 'ID_partida'
      value = {partida}
      required
      fullWidth
      variant="outlined"
      type = "Number"
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
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="modal">
          <Lobby partida={partida} id_jugador={0} creador={false} />
        </Box>
      </Modal>
    </Container>
  );
}
// partida es el id
export default UnirJugador;