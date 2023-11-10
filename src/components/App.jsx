import React from "react";
import axios from "axios";
import { BrowserRouter } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useSnackbar } from "notistack";
import useWebSocket from "react-use-websocket";
import {
  salirPartida, iniciarPartida, setTurnoPartida, pedirMano, setJugadores, setFase,
  setCartasPublicas, setMensajeFinalizar, setIntercambiante, robarCarta, setAtacante,
  setOpcionesDefensivas, setInfectado, limpiarSelector} from "../store/jugadorSlice";
import AppRoutes from "./AppRoutes";

//Web Socket Status
//Lobby
const WS_STATUS_PLAYER_JOINED = 0
const WS_STATUS_PLAYER_LEFT = 1
const WS_STATUS_MATCH_STARTED = 2
const WS_STATUS_MATCH_ENDED = 3
const WS_STATUS_PLAYER_WELCOME = 4
//Partida
const WS_STATUS_NEW_TURN = 10
const WS_STATUS_DISCARD = 11
const WS_STATUS_EXCHANGE_REQUEST = 12
const WS_STATUS_EXCHANGE = 13
const WS_STATUS_INFECTED = 14
const WS_STATUS_DEFENSE_PRIVATE_MSG = 15
//Accion
const WS_STATUS_PLAYER_BURNED = 101
const WS_STATUS_CHANGED_OF_PLACES = 102
const WS_STATUS_REVERSE_POSITION = 103
const WS_STATUS_SUSPECT = 104
const WS_STATUS_CARD_DISCOVER = 105
const WS_STATUS_CARD_SHOWN = 106
const WS_STATUS_ANALYSIS = 107
const WS_STATUS_WHISKY = 108
const WS_STATUS_SEDUCCION = 109
//Defensa
const WS_STATUS_HERE_IM_FINE = 201
const WS_STATUS_NOTHING_BARBECUE = 202
const WS_STATUS_NOPE_THANKS = 203
const WS_STATUS_YOU_FAILED = 204
const WS_STATUS_SCARY = 205
//Pánico
const WS_STATUS_LET_IT_REMAIN_BETWEEN_US = 401
const WS_STATUS_UPS = 402
const WS_STATUS_BLIND_DATE = 403
const WS_STATUS_REVELATIONS = 404
// Carta de Intercambio Ws
const WS_CARD = 505


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
        console.log("Partida Ws:"); // BORRAR: DEBUG
        console.log(parsedData);

        // Terminó la Partida
        if (parsedData.status === 300 || parsedData.status === 301 || parsedData.status === 302) {
          dispatch(salirPartida());
          dispatch(setMensajeFinalizar(parsedData.message));
        }

        switch (parsedData.status) {

          case WS_STATUS_EXCHANGE_REQUEST: // Solicitar Intercambio
            if (parsedData.player_target_id === jugador.id) {
              dispatch(setIntercambiante(parsedData.player_id))
              dispatch(setFase(fase.intercambio))
            }
            break;

          case WS_STATUS_EXCHANGE: // Intercambio Extioso
            dispatch(setFase(fase.espera))
            dispatch(setIntercambiante(0));
            break;

          case WS_CARD: // Recibir Carta del Intercambio
            dispatch(robarCarta(parsedData.card));
            break;

          case WS_STATUS_DEFENSE_PRIVATE_MSG: // Mensaje de que puedes defenderte
            dispatch(setOpcionesDefensivas(parsedData.data_for_defense.defensive_options_id));
            dispatch(setAtacante(parsedData.data_for_defense));
            if (jugador.fase !== fase.intercambio) {
              dispatch(setFase(fase.defensa));
            }
            break;

          case WS_STATUS_NOPE_THANKS: // Cancelación de Intercambio: "No Gracias"
            dispatch(setIntercambiante(0));
            break;

          case WS_STATUS_INFECTED: // Infección
            dispatch(setInfectado(parsedData.player_id));
            break;

          case WS_STATUS_WHISKY: // Whisky
            dispatch(setCartasPublicas(parsedData.players[jugador.turnoPartida].revealed_cards));
            dispatch(setFase(fase.resultado));
            enqueueSnackbar(parsedData.message, {
              variant: "info",
            });
            break;

          case WS_STATUS_LET_IT_REMAIN_BETWEEN_US: // Dejarlo entre nosotros
            dispatch(setCartasPublicas(parsedData.players[jugador.turnoPartida].revealed_cards));
            dispatch(setFase(fase.resultado));
            enqueueSnackbar(parsedData.message, {
              variant: "info",
            });
            break;
          
          case WS_STATUS_UPS: // Ups
            dispatch(setCartasPublicas(parsedData.players[jugador.turnoPartida].revealed_cards));
            dispatch(setFase(fase.resultado));
            enqueueSnackbar(parsedData.message, {
              variant: "info",
            });
            break;

          case WS_STATUS_SEDUCCION: // Seducción
            if (jugador.id === parsedData.player_id) {
              dispatch(setIntercambiante(parsedData.player_target_id));
            }
            if (jugador.id === parsedData.player_target_id) {
              dispatch(setIntercambiante(parsedData.player_id));
            }
            break;

          case WS_STATUS_MATCH_STARTED: // Iniciar Partida
            axios
              .get(urlPedirMano)
              .then(function (response) {
                //Pedir Mano
                dispatch(pedirMano(response.data));
                //Establecer Jugadores
                dispatch(setJugadores(parsedData.players));
                //Iniciar
                dispatch(iniciarPartida());
              })
              .catch(function (response) {
                enqueueSnackbar(`error: ${response.message}`, {
                  variant: "error",
                });
              });
            break;

          case WS_STATUS_NEW_TURN: // Turno Nuevo
            if (parsedData.player_id === jugador.id) {
              dispatch(setFase(fase.robo));
            }
            dispatch(setTurnoPartida(parsedData.turn_game));
            dispatch(limpiarSelector());
            break;

          case WS_STATUS_MATCH_ENDED: // Terminó Partida (Desconexion)
            dispatch(salirPartida());
            break;

          default:
            dispatch(setJugadores(parsedData.players));
            dispatch(setTurnoPartida(parsedData.turn_game));
            break;
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
