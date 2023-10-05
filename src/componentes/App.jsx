import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import useWebSocket from "react-use-websocket";
import { setJugadores } from "../store/lobbySlice";
import Home from "./home/Home";
import Jugador from "./jugador/Jugador";

function App() {
  const jugador = useSelector((state) => state.jugador);
  const dispatch = useDispatch();
  const socketUrl = `ws://localhost:8000/ws/matches/${jugador.partidaId}/${jugador.id}`;

  useWebSocket(
    socketUrl,
    {
      onOpen: () => {
        console.log("Connected");
      },
      onMessage: (event) => {
        const parsedData = JSON.parse(JSON.parse(event.data));
        
        // Si El Doc viene Iniciado = false:
        dispatch(setJugadores(parsedData.players));

        /*
        Si El Doc Viene Iniciado = True y jugador.iniciado = false:
          dispatch(iniciarPartida());
          navigate("/jugador");
        
        Si El Doc Viene Iniciado = True y jugador.iniciado = true:
          dispatch(setEstadoPartida());

        Si el Doc viene Iniciado = False y jugador.iniciado = true:
          dispatch(salirPartida());
        */
      },
      onClose: () => {
        console.log("Closed");
      },
    },
    jugador.unido
  );

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" Component={Home} />
        <Route path="/jugador" Component={Jugador} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
