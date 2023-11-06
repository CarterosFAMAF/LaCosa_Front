import React from 'react';
import './finalizar_partida.css';
import { Modal, Button, Box, Container, Typography } from '@mui/material';
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { setJugadores } from '../../../store/jugadorSlice';

function FinalizarPartida() {
  const jugador = useSelector((state) => state.jugador);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const ganadores = jugador.jugadores.filter(player => (player.winner === true))
    .map(player => (player.name)).join(", ");
  const finalizar_partida = () => {
    dispatch(setJugadores([]));
    navigate("/")
  }
  
  return (
    <Modal 
      open={true}
      backdrop="static"
      keyboard="false"
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      >
        <Box className="modalFinalizar">
          <Container>
            <Typography className='body1'>
              La Partida ha terminado!
            </Typography>
            <Typography className='body2'>
              {jugador.mensaje_finalizar}
            </Typography>
            <Typography className='body3'>
              Ganadores: {ganadores}
            </Typography>
            <hr />
            <br />
            <Button 
              className="miboton"
              variant="contained" 
              onClick={() => finalizar_partida()}>
              Volver al inicio
            </Button>
          </Container>
        </Box>
    </Modal>
    );
}

export default FinalizarPartida;
