import React from 'react';
import './FinalizarPartida.css';
import { Modal, Button, Box, Container, Typography } from '@mui/material';
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

function FinalizarPartida() {
  const jugador = useSelector((state) => state.jugador);
  const navigate = useNavigate();

  const ganadores = jugador.jugadores.filter(player => (player.winner === true))
  .map(player => (player.name)).join(", ");
  
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
            {ganadores.length > 0 && 
              <Typography className='body3'>
                Ganadores: {ganadores}
              </Typography>
            }
            <hr />
            <Button 
              className="miboton"
              variant="contained" 
              style={{ marginTop: "45px" }}
              onClick={() => navigate("/")}>
              Volver al inicio
            </Button>
          </Container>
        </Box>
    </Modal>
    );
}

export default FinalizarPartida;
