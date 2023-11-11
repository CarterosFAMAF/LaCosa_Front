import "./chat.css";
import ChatIcon from '@mui/icons-material/Chat';
import CloseIcon from '@mui/icons-material/Close';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import Modal from 'react-modal';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import { IconButton } from '@mui/material';

function Chat () {
  const [isOpen, setIsOpen] = useState(true);

  const openChat = () => {
    setIsOpen(true);
  };

  const closeChat = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <IconButton 
        className="abrir_chat"
        aria-label="upload picture"
        style={{ marginTop: "10px", 
          marginLeft: "10px", 
          position: "fixed", 
          width: "30px", 
          height: "19px"
        }} 
        onClick={openChat}> 
        <ChatIcon
          color="secondary"
          sx={{ fontSize: 40, color: 'white' }}
        /> 
      </IconButton>
      <Modal
        className="modal_chat"
        style={{
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0)', // Fondo transparente
          },
        }}
        shouldCloseOnOverlayClick={false}
        isOpen={isOpen}
        onRequestClose={closeChat}
        closeTimeoutMS={500}
        contentLabel="Chat Modal"
        ariaHideApp={false}
      >
        {/* Contenido del chat */}
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
            onClick={closeChat}> 
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
      </Modal>
    </div>
  );
};

export default Chat;
