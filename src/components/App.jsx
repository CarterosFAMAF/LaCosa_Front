import React from "react";
import axios from "axios";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useSnackbar } from "notistack";
import useWebSocket from "react-use-websocket";
import { salirPartida, iniciarPartida, setTurno, pedirMano, setJugadores, setFase, setCartasPublicas, setIntercambiante } from "../store/jugadorSlice";
import AppRoutes from "./AppRoutes";

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

        if (parsedData.status === 3) {
          // Terminó la Partida
          dispatch(salirPartida());
        }

        dispatch(setJugadores(parsedData.players));

        console.log("Partida Ws:"); // BORRAR: DEBUG
        console.log(parsedData);

        if (parsedData.started === true) {
          const formatoTurno = {
            turnoPartida: parsedData.turn_game,
            posicion: parsedData.players.filter(player => (player.id === jugador.id))[0].turn,
            vivo: parsedData.players.filter(player => (player.id === jugador.id))[0].alive
          };
          if (jugador.iniciada === true) {//En Partida
            // Solicitar Intercambio
            if (parsedData.status === 16 && parsedData.player_target_id === jugador.id) {
              dispatch(setIntercambiante(parsedData.player_id))
              dispatch(setFase(5))
            }
            // Intercambio Exitoso
            if (parsedData.status === 17) {
              dispatch(setFase(0)) // Termina Turno
            }
            //Whisky
            if (parsedData.status === 14) {
              dispatch(setCartasPublicas(parsedData.players[jugador.turnoPartida].revealed_cards));
              dispatch(setFase(3));
              enqueueSnackbar(parsedData.message, {
                variant: "info",
              });
            }
            //Avanza Turno.
            dispatch(setTurno(formatoTurno));
          } else {
            //Iniciar Partida.
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
        }
      },
      onClose: () => {
        enqueueSnackbar("Has abandonado la partida!", {
          variant: "info",
        });
      },
    },
    jugador.unido
  );

  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
