import React from "react";
import axios from "axios";
import { BrowserRouter } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useSnackbar } from "notistack";
import useWebSocket from "react-use-websocket";
import {
  salirPartida, iniciarPartida, setTurnoPartida, pedirMano, setJugadores, setFase,
  setCartasPublicas, setMensajeFinalizar, setIntercambiante, robarCarta, setAtacante,
  setOpcionesDefensivas, setInfectado, addMessage, setCitaCiega, setFallaste, setAterrado, setEspera
} from "../store/jugadorSlice";
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
const WS_STATUS_EVENTS_CARDS = 19
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
const WS_STATUS_AXE = 111
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
// Mensaje Chat Ws
const WS_STATUS_CHAT_MESSAGE = 600
// Obstaculo
const WS_STATUS_QUARANTINE = 802
const WS_STATUS_LOCKED_DOOR = 803
const WS_STATUS_DISCARD_QUARANTINE = 804
const WS_STATUS_DRAW = 805
const WS_STATUS_EXCHANGE_REQUEST_QUARANTINE = 806
const WS_STATUS_EXCHANGE_QUARANTINE = 807

function App() {
  const jugador = useSelector((state) => state.jugador);
  const fase = useSelector((state) => state.fase);
  const rol = useSelector((state) => state.rol);
  const typemessage = useSelector((state) => state.typemessage);

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

        dispatch(setEspera(false));
        if (
          // Not Showing
          !(parsedData.status === WS_STATUS_PLAYER_JOINED || parsedData.status === WS_STATUS_MATCH_STARTED ||
            parsedData.status === WS_STATUS_PLAYER_WELCOME || parsedData.status === WS_STATUS_PLAYER_LEFT ||
            parsedData.status === WS_STATUS_MATCH_ENDED || parsedData.status === WS_CARD ||
            parsedData.status === 300 || parsedData.status === 301 || parsedData.status === 302 ||
            // Matched switch (Special Cases)
            parsedData.status === WS_STATUS_INFECTED || parsedData.status === WS_STATUS_DEFENSE_PRIVATE_MSG ||
            parsedData.status === WS_STATUS_EXCHANGE_QUARANTINE || parsedData.status === WS_STATUS_DRAW ||
            parsedData.status === WS_STATUS_EXCHANGE_REQUEST_QUARANTINE || parsedData.status === WS_STATUS_DISCARD_QUARANTINE ||
            parsedData.status === WS_STATUS_LET_IT_REMAIN_BETWEEN_US || parsedData.status === WS_STATUS_UPS ||
            parsedData.status === WS_STATUS_BLIND_DATE || parsedData.status === WS_STATUS_CHAT_MESSAGE)) {
          // All rest
          dispatch(addMessage({ owner: "", text: parsedData.message, type: typemessage.system }));
        }

        switch (parsedData.status) {

          case WS_STATUS_EXCHANGE_REQUEST: // Solicitar Intercambio
            if (parsedData.player_target_id === jugador.id) {
              dispatch(setIntercambiante(parsedData.player_id))
              dispatch(setFase(fase.intercambio))
            }
            break;

          case WS_STATUS_EXCHANGE: // Intercambio Exitoso
            if (parsedData.player_target_id === jugador.id || parsedData.player_id === jugador.id) {
              dispatch(setFase(fase.espera))
              dispatch(setIntercambiante(0));
            }
            break;

          case WS_CARD: // Recibir Carta del Intercambio
            dispatch(robarCarta(parsedData.card));
            break;

          case WS_STATUS_DEFENSE_PRIVATE_MSG: // Mensaje de que puedes defenderte
            dispatch(addMessage({
              owner: "",
              text: "Puedes defenderte",
              type: typemessage.defense
            }));
            dispatch(setOpcionesDefensivas(parsedData.data_for_defense.defensive_options_id));
            if (jugador.fase !== fase.intercambio) {
              dispatch(setFase(fase.defensa));
              dispatch(setAtacante(parsedData.data_for_defense));
            }
            break;

          case WS_STATUS_NOPE_THANKS: // No Gracias: Cancela intercambio
            dispatch(setIntercambiante(0));
            break;

          case WS_STATUS_INFECTED: // Infección
            dispatch(addMessage({
              owner: "",
              text: parsedData.message,
              type: typemessage.infeccion
            }));
            dispatch(setInfectado(parsedData.player_id));
            break;

          case WS_STATUS_REVERSE_POSITION: // Cambia el sentido de la ronda
            if (parsedData.player_id === jugador.id) {
              // Get Next Player Status
              const urlNextPlayer = `http://127.0.0.1:8000/matches/${jugador.partidaId}/next_player`;
              axios
                .get(urlNextPlayer)
                .then(function (response) {
                  dispatch(setIntercambiante(response.data.next_player_id));
                })
                .catch(function (response) {
                  enqueueSnackbar(`error: ${response.message}`, {
                    variant: "error",
                  });
                });
            }
            break;

          case WS_STATUS_CHANGED_OF_PLACES: // Hubo cambio de lugar
            if (parsedData.player_id === jugador.id) {
              // Get Next Player Status
              const urlNextPlayer = `http://127.0.0.1:8000/matches/${jugador.partidaId}/next_player`;
              axios
                .get(urlNextPlayer)
                .then(function (response) {
                  dispatch(setIntercambiante(response.data.next_player_id));

                  // Update Game State
                  dispatch(setJugadores(parsedData.players));
                  dispatch(setTurnoPartida(parsedData.turn_game));
                })
                .catch(function (response) {
                  enqueueSnackbar(`error: ${response.message}`, {
                    variant: "error",
                  });
                });
            } else {
              // Update Game State
              dispatch(setJugadores(parsedData.players));
              dispatch(setTurnoPartida(parsedData.turn_game));
            }
            break;

          case WS_STATUS_WHISKY: // Whisky
            if (parsedData.player_id != jugador.id) {
              dispatch(setCartasPublicas(parsedData.players[jugador.turnoPartida].revealed_cards));
              dispatch(setFase(fase.resultado));
            }
            break;

          case WS_STATUS_UPS: // Ups
            dispatch(addMessage({
              owner: "",
              text: parsedData.message,
              type: typemessage.panico
            }));
            if (parsedData.player_id != jugador.id) {
              dispatch(setCartasPublicas(parsedData.players[jugador.turnoPartida].revealed_cards));
              dispatch(setFase(fase.resultado));
            }
            break;

          case WS_STATUS_LET_IT_REMAIN_BETWEEN_US: // Dejarlo entre nosotros
            dispatch(addMessage({
              owner: "",
              text: parsedData.message,
              type: typemessage.panico
            }));
            if (parsedData.player_target_id === jugador.id) {
              dispatch(setCartasPublicas(parsedData.players[jugador.turnoPartida].revealed_cards));
              dispatch(setFase(fase.resultado));
            }
            break;

          case WS_STATUS_BLIND_DATE: // Cita a ciegas
            dispatch(addMessage({
              owner: "",
              text: parsedData.message,
              type: typemessage.panico
            }));
            if (parsedData.player_id === jugador.id) {
              dispatch(setCitaCiega(true));
            }
            break;

          case WS_STATUS_SEDUCCION: // Seducción
            if (jugador.id === parsedData.player_id) {
              dispatch(setIntercambiante(parsedData.player_target_id));
            }
            if (jugador.id === parsedData.player_target_id) {
              dispatch(setIntercambiante(parsedData.player_id));
            }
            break;

          case WS_STATUS_YOU_FAILED: // Fallaste
            if (jugador.id === parsedData.player_fallaste) {
              dispatch(setIntercambiante(0));
            } else if (jugador.id === parsedData.player_target) {
              dispatch(setIntercambiante(parsedData.player_main_id));
              dispatch(setFase(fase.intercambio));
              dispatch(setFallaste(true));
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
              // Get Next Player Status
              const urlNextPlayer = `http://127.0.0.1:8000/matches/${jugador.partidaId}/next_player`;
              axios
                .get(urlNextPlayer)
                .then(function (response) {
                  dispatch(setIntercambiante(response.data.next_player_id));

                  // Update Game State
                  dispatch(setJugadores(parsedData.players));
                  dispatch(setTurnoPartida(parsedData.turn_game));
                  if (!jugador.aterrado) {
                    dispatch(setFase(fase.robo));
                  }
                })
                .catch(function (response) {
                  enqueueSnackbar(`error: ${response.message}`, {
                    variant: "error",
                  });
                });
            } else {
              // TODO: quitarlo si es innecesario, pero asegura orden
              dispatch(setIntercambiante(0));
              // Update Game State
              dispatch(setJugadores(parsedData.players));
              dispatch(setFase(fase.robo));
              dispatch(setTurnoPartida(parsedData.turn_game));
            }
            break;

          case WS_STATUS_CHAT_MESSAGE: // Mensaje Chat
            dispatch(addMessage({
              owner: parsedData.msg.owner,
              text: parsedData.msg.text,
              type: typemessage.user
            }));
            break;

          // Cuarentena Mensajes:
          case WS_STATUS_EXCHANGE_REQUEST_QUARANTINE: // Solicitar Intercambio (Cuarentena)
            dispatch(addMessage({
              owner: "",
              text: parsedData.message,
              type: typemessage.quarantine
            }));
            if (parsedData.player_target_id === jugador.id) {
              dispatch(setIntercambiante(parsedData.player_id))
              dispatch(setFase(fase.intercambio))
            }
            break;

          case WS_STATUS_EXCHANGE_QUARANTINE: // Intercambio Exitoso (Cuarentena)
            dispatch(addMessage({
              owner: "",
              text: parsedData.message,
              type: typemessage.quarantine
            }));
            if (parsedData.player_target_id === jugador.id || parsedData.player_id === jugador.id) {
              dispatch(setFase(fase.espera))
              dispatch(setIntercambiante(0));
            }
            break;

          case WS_STATUS_DRAW: // Robar Carta (Cuarentena)
            dispatch(addMessage({
              owner: "",
              text: parsedData.message,
              type: typemessage.quarantine
            }));
            break;

          case WS_STATUS_DISCARD_QUARANTINE: // Descartar Carta (Cuarentena)
            dispatch(addMessage({
              owner: "",
              text: parsedData.message,
              type: typemessage.quarantine
            }));
            break;

          case WS_STATUS_EVENTS_CARDS: // Aviso de intento de juego
            dispatch(setEspera(true));
            break;

          case WS_STATUS_SCARY: // Aterrador: Resuelve condición de Carrera
            if (parsedData.player_id === jugador.id) {
              dispatch(setAterrado(true));
            }
            break;

          case WS_STATUS_PLAYER_BURNED: // Muere alguien (Cosa Check)
            if (jugador.rol === rol.lacosa && jugador.id === parsedData.player_target_id) {
              const urlBotonFinalizar = `http://127.0.0.1:8000/matches/${jugador.partidaId}/players/${jugador.id}/declare_end`;
              axios
                .put(urlBotonFinalizar, { match_id: jugador.partidaId })
                .then(function (response) {
                })
                .catch(function (response) {
                  enqueueSnackbar(`error: ${response.message}`, {
                    variant: "error",
                  });
                });
            }
            if (parsedData.player_id === jugador.id) {
              // Get Next Player Status
              const urlNextPlayer = `http://127.0.0.1:8000/matches/${jugador.partidaId}/next_player`;
              axios
                .get(urlNextPlayer)
                .then(function (response) {
                  dispatch(setIntercambiante(response.data.next_player_id));
                })
                .catch(function (response) {
                  enqueueSnackbar(`error: ${response.message}`, {
                    variant: "error",
                  });
                });
            }
            dispatch(setJugadores(parsedData.players));
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
