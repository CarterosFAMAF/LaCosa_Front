import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import useWebSocket from "react-use-websocket";
import { setJugadores } from "../store/lobbySlice";
import Home from "./home/Home";
import Jugador from "./partida/Jugador";
import { salirPartida, iniciarPartida } from "../store/jugadorSlice";
import { useSnackbar } from "notistack";

function App() {
  const jugador = useSelector((state) => state.jugador);
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const socketUrl = `ws://localhost:8000/ws/matches/${jugador.partidaId}/${jugador.id}`;

  useWebSocket(
    socketUrl,
    {
      onOpen: () => {
        console.log("Connected");
      },
      onMessage: (event) => {
        const parsedData = JSON.parse(JSON.parse(event.data));

        if(parsedData.started === true) {
          if(jugador.iniciada === true) {
            // dispatch(setEstadoPartida());
          } else {
            dispatch(iniciarPartida());
            navigate("/partida");
          }
        } else {
          if(jugador.iniciada === false) {
            dispatch(setJugadores(parsedData.players));
          } else {
            dispatch(salirPartida());
          }
        }
      },
      onClose: () => {
        enqueueSnackbar("Has abandonado la partida!", {
          variant: "error",
        });
        dispatch(salirPartida());
      },
    },
    jugador.unido
  );

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" Component={Home} />
        <Route path="/partida" Component={Jugador} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
