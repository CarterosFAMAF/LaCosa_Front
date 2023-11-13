import "./Chat.css";
import ChatIcon from '@mui/icons-material/Chat';
import CloseIcon from '@mui/icons-material/Close';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import ToggleOnIcon from '@mui/icons-material/ToggleOn';
import ToggleOffIcon from '@mui/icons-material/ToggleOff';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import { IconButton, Box } from '@mui/material';
import { useSelector } from 'react-redux';
import axios from "axios";
import { useSnackbar } from "notistack";

function Chat() {
  const jugador = useSelector((state) => state.jugador);
  const typemessage = useSelector((state) => state.typemessage);
  const { enqueueSnackbar } = useSnackbar();
  const [showChat, setShowChat] = useState(true);
  const [mensaje, setMensaje] = useState("");
  const [showSystem, setShowSystem] = useState(false);

  const handleChange = (event) => {
    setMensaje(event.target.value);
  };

  const enviar_mensaje = () => {
    if (mensaje !== "") {
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
      setMensaje("");
    }
  }

  const colors = ["black", "rgb(120, 120, 120)", "green", "blue", "orange", "purple"];

  const chat = jugador.chat.filter(msg => showSystem ? msg.type != typemessage.user : true).map((msg, index) => {
    if (msg.type == typemessage.user) {
      return (
        <li style={{color: colors[msg.type]}} key={index}>
          <p> {msg.owner}: {msg.text} </p>
        </li>
      );
    } else {
      return (
        <li style={{color: colors[msg.type]}} key={index}>
          <p> {">"}{msg.text} </p>
        </li>
      );
    }
  });

  const chatContainer = document.querySelector('.chat');
  if (chatContainer !== null) {
    chatContainer.scrollTop = chatContainer.scrollHeight;
  }

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
        onClick={() => setShowChat(true)}
        data-testid="abrir_chat"
        >
        <ChatIcon
          color="secondary"
          sx={{ fontSize: 40, color: 'white' }}
        />
      </IconButton>
      <Box
        className={showChat ? "modal_chat" : "hidden"}
        component="div"
        data-testid="chat"
      >
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
            onClick={() => setShowChat(false)}
            data-testid="cerrar_chat"
            >
            <CloseIcon
              sx={{ color: 'black' }}
            />
          </IconButton>
          {!showSystem && <IconButton
            className="filtro_sistema"
            color="primary"
            style={{
              width: "50px",
              top: "-28px",
            }}
            onClick={() => setShowSystem(true)}
            data-testid="filtro2"
            >
            <ToggleOnIcon
              sx={{ color: 'black' }}
            />
          </IconButton>}
          {showSystem && <IconButton
            className="filtro_sistema"
            color="primary"
            style={{
              width: "50px",
              top: "-28px",
            }}
            onClick={() => setShowSystem(false)}
            data-testid="filtro1"
            >
            <ToggleOffIcon
              sx={{ color: 'black' }}
            />
          </IconButton>}
          <div className="chat">
            <div className="mensajes">
              {chat}
            </div>
          </div>
          <TextField
            label="Escribe un mensaje"
            name="mensaje"
            display="flex"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                enviar_mensaje();
              }
            }}
            style={{
              marginTop: "7px",
              marginLeft: "20px",
              width: "75%",
              height: "30%"
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
            data-testid="enviar_mensaje"
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
