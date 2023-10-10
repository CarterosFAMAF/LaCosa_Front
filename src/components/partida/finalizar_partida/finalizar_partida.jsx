import React from 'react';
import './finalizar_partida.css';
import { Modal, Button, Box, Container, Typography } from '@mui/material';
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

function FinalizarPartida() {

  const jugador = useSelector((state) => state.jugador);
  const navigate = useNavigate();
  
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
              El jugador {jugador.nombre} ha ganado la partida!
            </Typography>
            <hr />
            <br />
            <Button 
              className="miboton"
              variant="contained" 
              onClick={() => navigate("/")}>
              Volver al inicio
            </Button>
          </Container>
        </Box>
    </Modal>
    );
}

export default FinalizarPartida;
