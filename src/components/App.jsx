import React from "react";
import axios from "axios";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useSnackbar } from "notistack";
import useWebSocket from "react-use-websocket";
import Home from "./home/Home";
import Jugador from "./partida/Jugador";
import { salirPartida, iniciarPartida, setTurno, pedirMano, setJugadores } from "../store/jugadorSlice";

function App() {
  const jugador = useSelector((state) => state.jugador);
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const socketUrl = `ws://localhost:8000/ws/matches/${jugador.partidaId}/${jugador.id}`;
  const urlPedirMano = `http://127.0.0.1:8000/matches/${jugador.partidaId}/players/${jugador.id}/get_hand`;

  useWebSocket(
    socketUrl,
    {
      onOpen: () => {
        console.log("Connected");
      },
      onMessage: (event) => {
        const parsedData = JSON.parse(JSON.parse(event.data));
        dispatch(setJugadores(parsedData.players));

        console.log("Partida Ws:"); //Borrar
        console.log(parsedData);

        if (parsedData.started === true) {
          const formatoTurno = {
            turnoPartida: parsedData.turn_game,
            turno: parsedData.players.filter(player => (player.id === jugador.id))[0].turn,
            vivo: parsedData.players.filter(player => (player.id === jugador.id))[0].alive
          };
          if (jugador.iniciada === true) { //Avanza Turno.
            dispatch(setTurno(formatoTurno));
          } else { //Iniciar Partida.
            axios
              .get(urlPedirMano)
              .then(function (response) {
                //Pedir Mano
                dispatch(pedirMano(response.data));
                //Establecer Turno
                dispatch(setTurno(formatoTurno));
                //Iniciar
                dispatch(iniciarPartida());
              })
              .catch(function (response) {
                enqueueSnackbar(`error: ${response.message}`, {
                  variant: "error",
                });
              });
          }
        } else {
          if (jugador.iniciada === true) {//Termina la Partida
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
