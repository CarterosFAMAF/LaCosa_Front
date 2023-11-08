import React from "react";
import axios from "axios";
import { BrowserRouter } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useSnackbar } from "notistack";
import useWebSocket from "react-use-websocket";
import { salirPartida, iniciarPartida, setTurno, pedirMano, setJugadores, setFase, setCartasPublicas, 
  setMensajeFinalizar, setIntercambiante, robarCarta } from "../store/jugadorSlice";
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

        // Terminó la Partida
        if (parsedData.status === 3){
          dispatch(setMensajeFinalizar("No hay ganadores"));
          dispatch(salirPartida());
        }if (parsedData.status === 300 || parsedData.status === 301 || parsedData.status === 302) {
          dispatch(setMensajeFinalizar(parsedData.message));
          dispatch(salirPartida());
        }

        if (parsedData.status === 100) {
          dispatch(robarCarta(parsedData.card));
        }
        else {
          dispatch(setJugadores(parsedData.players));
        }
        
        console.log("Partida Ws:"); // BORRAR: DEBUG
        console.log(parsedData);

        if (parsedData.started === true) {
          const formatoTurno = {
            turnoPartida: parsedData.turn_game,
            posicion: parsedData.players.filter(player => (player.id === jugador.id))[0].turn,
            vivo: parsedData.players.filter(player => (player.id === jugador.id))[0].alive
          };
          if (jugador.iniciada === true) {//En Partida
            switch (parsedData.status) {
              case 14: // Whisky
                dispatch(setCartasPublicas(parsedData.players[jugador.turnoPartida].revealed_cards));
                dispatch(setFase(3));
                enqueueSnackbar(parsedData.message, {
                  variant: "info",
                });
                break;

              case 16: // Solicitar Intercambio
                if (parsedData.player_target_id === jugador.id) {
                  dispatch(setIntercambiante(parsedData.player_id))
                  dispatch(setFase(5))
                }
                break;

              case 17:  // Intercambio Extioso
                dispatch(setFase(0)) // Termina Turno
                break;

              default:
                break;
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
