import React, { useState } from 'react';
import{
    Container,
    TextField,
    Button,
    Modal,
    Box,
    Typography
} from '@mui/material';
import "./lobby.css";

function Lobby ({partida, jugador}) {
    const handleSubmit = async event => {
        event.preventDefault();
        
        alert(buenas);
      };
    // pedir al back el creador y el id de partida

    // no se que url usar todavia
    /*
    const ws = useWebSocket(`http://127.0.0.1:8000/ws/matchs/${partida}`);
    ws.onmessage = e => {
      if (isPaused) return;
      const message = JSON.parse(e.data);
      console.log('e', message);
    };
    */
    return(
        <Container>
          <Typography className="tituloLobby" component="h2">
            Lobby de: {partida}
          </Typography>
          <Button 
            variant="contained" 
            onClick={handleSubmit}
            disabled={false}
            className="boton_iniciar"> 
            Iniciar Partida
          </Button>
        </Container>
    );
}

export default Lobby