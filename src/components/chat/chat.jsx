import "./chat.css";
import ChatIcon from '@mui/icons-material/Chat';
import CloseIcon from '@mui/icons-material/Close';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import { IconButton, Box } from '@mui/material';
import { useSelector } from 'react-redux';

function Chat () {
  
  const jugador = useSelector((state) => state.jugador);
  const [showChat, setShowChat] = useState(true);
  
  const chat = jugador.chat.map ( (mensaje) => {
    if (mensaje.owner !== 'Sistema') {
      return (
        <div style={mensaje.infeccion ? {color: "green"} : {color: "grey"}}>
          <p> {mensaje.owner}: {mensaje.text} </p>
        </div>
      );
    } else {
      return (
        <div>
          <p> {mensaje.text} </p>
        </div>
      );
    }
  } );

  return (
    <div>
      <IconButton 
        className={!showChat ? "abrir_chat" : "hidden"}
        aria-label="upload picture"
        style={{ marginTop: "10px", 
          marginLeft: "10px", 
          position: "fixed", 
          width: "30px", 
          height: "19px"
        }} 
        onClick={() => setShowChat(true)}> 
        <ChatIcon
          color="secondary"
          sx={{ fontSize: 40, color: 'white' }}
        /> 
      </IconButton>
      <Box
        className={showChat ? "modal_chat" : "hidden"}
        component="div"
      >
        {chat}
        <div>
          <h2 className="titulo_chat"> Chat </h2>
          <IconButton 
            className="cerrar_chat"
            color="primary"
            style={{ 
              marginTop: "5px" , 
              position: "fixed", 
              width: "50px", 
              height: "50px"
            }} 
            onClick={ () => setShowChat(false) }> 
            <CloseIcon 
              sx={{ color: 'black' }}
            /> 
          </IconButton>
          <div className="chat">
          </div>
            <TextField
              label="Escribe un mensaje"
              name="mensaje"
              display="flex"
              style={{
                marginTop: "7px",
                marginLeft: "20px",
                width: "75%", 
                height: "50px"
              }}
            >  
            </TextField>
            <IconButton 
              type="button" 
              sx={{ p: '10px' }} 
              className="enviar_mensaje"
              color="primary"
              style={{ 
                marginTop: "10px" , 
                position: "fixed", 
                width: "50px", 
                height: "50px"
              }} 
              >
              <SendOutlinedIcon 
                sx={{ color: 'black' }}
              />
            </IconButton>
        </div>
      </Box>
    </div>
  );
};

export default Chat;
