import "./chat.css";
import ChatIcon from '@mui/icons-material/Chat';
import CloseIcon from '@mui/icons-material/Close';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import { IconButton, Box } from '@mui/material';
import { useSelector } from 'react-redux';
import axios from "axios";

function Chat() {

  const jugador = useSelector((state) => state.jugador);
  const [showChat, setShowChat] = useState(true);
  const [mensaje, setMensaje] = useState("");

  const handleChange = (event) => {
    setMensaje({
      ...mensaje,
      [event.target.name]: event.target.value,
    });
  };

  const enviar_mensaje = () => {
    const urlMensaje = `http://127.0.0.1:8000/matches/${jugador.partidaId}/players/${jugador.id}/send_chat_message`;
    const formatoMensaje = {
      match_id: jugador.partidaId,
      owner_id: jugador.id,
      text: mensaje
    }
    
    axios
      .post(urlMensaje, formatoMensaje)
      .then(function (response) {
      })
      .catch(function (response) {
        enqueueSnackbar(`error: ${response.message}`, {
          variant: "error",
        });
      });
  }

  const chat = jugador.chat.map((msg) => {
    if (msg.owner !== 'Sistema') {
      return (
        <div style={msg.infeccion ? { color: "green" } : { color: "grey" }}>
          <p> {msg.owner}: {msg.text} </p>
        </div>
      );
    } else {
      return (
        <div>
          <p> {msg.text} </p>
        </div>
      );
    }
  });

  return (
    <div>
      <IconButton
        className={!showChat ? "abrir_chat" : "hidden"}
        aria-label="upload picture"
        style={{
          marginTop: "10px",
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
              marginTop: "5px",
              position: "fixed",
              width: "50px",
              height: "50px"
            }}
            onClick={() => setShowChat(false)}>
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
            value={mensaje}
            onChange={handleChange}
          >
          </TextField>
          <IconButton
            type="button"
            sx={{ p: '10px' }}
            className="enviar_mensaje"
            color="primary"
            style={{
              marginTop: "10px",
              position: "fixed",
              width: "50px",
              height: "50px"
            }}
            onClick={() => enviar_mensaje()}
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
