import React from "react";
import axios from "axios";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useSnackbar } from "notistack";
import useWebSocket from "react-use-websocket";
import Home from "./home/Home";
import Jugador from "./partida/Jugador";
import { salirPartida, iniciarPartida, setTurno, pedirMano } from "../store/jugadorSlice";
import { setJugadores } from "../store/lobbySlice";


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
        console.log(`Partida Ws: ${parsedData}`);

        if (parsedData.started === true) {
          const formatoTurno = {
            turnoPartida: parsedData.turn_game,
            turno: parsedData.players.find(player => {
              if (player.id === jugador.id) {
                return player.turn
              }
            })
          };
          if (jugador.iniciada === true) { //Avanza Turno.
            dispatch(setTurno(formatoTurno));
          } else { //Iniciar Partida.
            axios
              .get(urlPedirMano)
              .then(function (response) {
                //Pedir Mano
                console.log(`Pedir Mano Response: ${response}`);
                dispatch(pedirMano(response.hand));

                //Establecer Turno
                dispatch(setTurno(formatoTurno));

                //Iniciar
                dispatch(iniciarPartida());
                navigate("/partida");
              })
              .catch(function (response) {
                alert(`error: ${response.message}`);
              });
          }
        } else {
          if (jugador.iniciada === false) { //Lobby
            dispatch(setJugadores(parsedData.players));
          } else { //Termina la Partida
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
