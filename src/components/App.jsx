import React from "react";
import axios from "axios";
import { BrowserRouter } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useSnackbar } from "notistack";
import useWebSocket from "react-use-websocket";
import {
  salirPartida, iniciarPartida, setTurno, pedirMano, setJugadores, setFase, setCartasPublicas,
  setMensajeFinalizar, setIntercambiante, robarCarta, setAtacante, setOpcionesDefensivas
} from "../store/jugadorSlice";
import AppRoutes from "./AppRoutes";

// Web Socket Status
const WS_STATUS_MATCH_ENDED = 3;
const WS_STATUS_EXCHANGE_REQUEST = 12;
const WS_STATUS_DEFENSE_PRIVATE_MSG = 15;
const WS_STATUS_EXCHANGE = 13;
const WS_STATUS_WHISKY = 108;
const WS_CARD_EXCHANGE = 505;
const WS_STATUS_NOPE_THANKS = 203;

function App() {
  const jugador = useSelector((state) => state.jugador);
  const fase = useSelector((state) => state.fase);
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
        if (parsedData.status === WS_STATUS_MATCH_ENDED) {
          dispatch(setMensajeFinalizar("No hay ganadores"));
          dispatch(salirPartida());
        } else if (parsedData.status === 300 || parsedData.status === 301 || parsedData.status === 302) {
          dispatch(setMensajeFinalizar(parsedData.message));
        }

        // Mensajes con formato distinto y que no tienen la lista de jugadores.
        switch (parsedData.status) {
          case WS_CARD_EXCHANGE: // Recibir Carta del Intercambio
            dispatch(robarCarta(parsedData.card));
            dispatch(setFase(fase.robo));
            break;

          case WS_STATUS_DEFENSE_PRIVATE_MSG: // Mensaje de que puedes defenderte
            dispatch(setOpcionesDefensivas(parsedData.data_for_defense.defensive_options_id));
            dispatch(setAtacante(parsedData.data_for_defense));
            if (jugador.fase !== fase.intercambio) {
              dispatch(setFase(fase.defensa));
            }
            break;

          case WS_STATUS_NOPE_THANKS:
            dispatch(setIntercambiante(0));
            break;

          default:
            dispatch(setJugadores(parsedData.players));
            break;
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
              case WS_STATUS_WHISKY: // Whisky
                dispatch(setCartasPublicas(parsedData.players[jugador.turnoPartida].revealed_cards));
                dispatch(setFase(fase.resultado));
                enqueueSnackbar(parsedData.message, {
                  variant: "info",
                });
                break;

              case WS_STATUS_EXCHANGE_REQUEST: // Solicitar Intercambio
                if (parsedData.player_target_id === jugador.id) {
                  dispatch(setIntercambiante(parsedData.player_id))
                  dispatch(setFase(fase.intercambio))
                }
                break;

              case WS_STATUS_EXCHANGE:  // Intercambio Extioso
                dispatch(setFase(fase.robo)) // Termina Turno
                dispatch(setIntercambiante(0));
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
