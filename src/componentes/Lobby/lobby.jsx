import React, { useState, useWebSocket } from 'react';
import{
    Container,
    TextField,
    Button,
    Modal,
    Box,
    Typography
} from '@mui/material';
import "./lobby.css";

function Lobby ({partida, id_jugador, creador}) {
    const [jugadores, setJugadores] = useState(["Juan", "ignacio", "adolfo", "ernesto"])
    const [cantJugadores, setCantJugadores] = useState(4) 
    const handleSubmit = async event => {
        event.preventDefault();
        
        alert("buenas");
      };

/*
    const ws = useWebSocket(`http://127.0.0.1:8000/ws/matchs/${partida}/${jugador}`);
    ws.onmessage = (event) => {
      setJugadores(JSON.parse(event.data);
      console.log(jugadores);
      setCantJugadores(jugadores.length)
    };
*/  const output = [];
    jugadores.forEach(jugadores => {
      output.push(
        <li key={jugadores.id} className='listajugadores'>  
          <Typography> {jugadores} </Typography>
        </li>
      );
      })

    return(
        <Container>
          <Typography className="tituloLobby" component="h2">
            Lobby: {partida} 
          </Typography>
          <br/>
          <br/>
          <Typography> Jugadores ({cantJugadores}): {output}</Typography>
          <Button 
            variant="contained" 
            onClick={handleSubmit}
            disabled={!creador || (cantJugadores < 4)}
            className="boton_iniciar"> 
            Iniciar Partida
          </Button>          
        </Container>
    );
}

export default Lobby