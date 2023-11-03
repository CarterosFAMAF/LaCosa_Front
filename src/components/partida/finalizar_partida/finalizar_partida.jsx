import React from 'react';
import './finalizar_partida.css';
import '../../Estilos.css';
import { Modal, Button, Box, Container, Typography } from '@mui/material';
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { setJugadores } from '../../../store/jugadorSlice';

function FinalizarPartida() {
  const jugador = useSelector((state) => state.jugador);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const ganador = jugador.jugadores.filter(player => (player.alive === true))[0].name
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
            <Typography className="tituloLobby">
              La Partida ha terminado!
              Ganador: {ganador}
            </Typography>
            <hr />
            <Button 
              className="miboton"
              variant="contained" 
              style={{ marginTop: "45px" }}
              onClick={() => finalizar_partida()}>
              Volver al inicio
            </Button>
          </Container>
        </Box>
    </Modal>
    );
}

export default FinalizarPartida;
