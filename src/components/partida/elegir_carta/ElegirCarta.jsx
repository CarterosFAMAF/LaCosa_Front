import "./ElegirCarta.css";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import {
  tirarCarta, setFase, limpiarSelector, setCartasPublicas, setIntercambiante,
  robarCarta, limpiarAtacante, setOpcionesDefensivas, limpiarPanico, setCitaCiega, setFallaste
} from "../../../store/jugadorSlice";
import { useSnackbar } from "notistack";
import { useState } from "react";
import { useEffect } from "react";

const MAS_VALE_QUE_CORRAS_STR = "Mas_vale_que_corras";
const LANZALLAMAS_STR = "lanzallamas";
const CAMBIO_DE_LUGAR_STR = "Cambio_de_lugar";
const SEDUCCION_STR = "Seduccion";
const VIGILA_TUS_ESPALDAS_STR = "Vigila_tus_espaldas";
const WHISKY_STR = "Whisky";
const UPS_STR = "Ups!";
const CITA_A_CIEGAS_STR = "Cita_a_ciegas";

function ElegirCarta() {
  const jugador = useSelector((state) => state.jugador);
  const fase = useSelector((state) => state.fase);
  const typecard = useSelector((state) => state.typecard);
  const rol = useSelector((state) => state.rol);

  const dispatch = useDispatch();

  const { enqueueSnackbar } = useSnackbar();

  const [hasTarget, setHasTaget] = useState(false);
  const [hasPlayed, setHasPlayed] = useState(false);
  const [hasPanicked, setHasPanicked] = useState(false);

  useEffect(() => {
    setHasPlayed(false);
  }, [jugador.fase]);

  const enviar_carta = (urlEnviarCarta) => {
    dispatch(limpiarPanico());
    axios
      .put(urlEnviarCarta)
      .then(function (response) {
        dispatch(tirarCarta(jugador.seleccion));
        dispatch(limpiarSelector());
        if (Array.isArray(response.data) && response.data.length) {
          dispatch(setCartasPublicas(response.data));
          /* Hay resultado.
          Cartas: Analisis, Sospecha
          */
          dispatch(setFase(fase.resultado)); // Ver Efecto
        }
        else {
          // No hay resultado.
          dispatch(setFase(fase.intercambio)); // Ir a Intercambio
        }
      })
      .catch(function (response) {
        enqueueSnackbar(`error: ${response.message}`, {
          variant: "error",
        });
      });
  }

  const jugar_carta = (objetivo_id) => {
    /*
    if (jugador.seleccionName === SEDUCCION_STR) {
      dispatch(setIntercambiante(objetivo_id));
    }
    */
    setHasTaget(true);
    const urlJugarCarta = `http://127.0.0.1:8000/matches/${jugador.partidaId}/players/${jugador.id}/${objetivo_id}/${jugador.seleccion}/play_card`;
    enviar_carta(urlJugarCarta);
  }

  const descartar_carta = () => {
    setHasPlayed(true);
    const urlDescartarCarta = `http://127.0.0.1:8000/matches/${jugador.partidaId}/players/${jugador.id}/${jugador.seleccion}/discard`;
    enviar_carta(urlDescartarCarta);
  };

  const check_carta = () => {
    setHasPlayed(true);
    setHasPanicked(true);
    if (jugador.seleccionName === VIGILA_TUS_ESPALDAS_STR ||
      jugador.seleccionName === WHISKY_STR ||
      jugador.seleccionName === UPS_STR ||
      jugador.seleccionName === CITA_A_CIEGAS_STR) {
      //Sin Objetivo
      jugar_carta(0);
    } else {
      //Pedir Objetivo
      dispatch(setFase(fase.objetivo));
    }
  };

  const intercambiar_carta = () => {
    setHasPlayed(true);
    dispatch(setFase(fase.espera));
    const urlIntercambiarCarta = `http://127.0.0.1:8000/matches/${jugador.partidaId}/players/${jugador.id}/exchange_cards`;

    const endpoint_params_intercambiar = {
      match_id: jugador.partidaId,
      player_id: jugador.id,
      player_target_id: jugador.intercambiante,
      card_id: jugador.seleccion,
      is_you_failed: jugador.fallaste,
      blind_date: jugador.citaCiega,
    };

    console.log(endpoint_params_intercambiar);

    axios
      .put(urlIntercambiarCarta, endpoint_params_intercambiar)
      .then(function (response) {
        dispatch(tirarCarta(jugador.seleccion));
        dispatch(limpiarSelector());
        dispatch(limpiarAtacante());
        dispatch(setOpcionesDefensivas([]));
      })
      .catch(function (response) {
        enqueueSnackbar(`error: ${response.message}`, {
          variant: "error",
        });
      });

    dispatch(setCitaCiega(false));
    dispatch(setFallaste(false));
  }

  const defender_carta = (id_card_defense) => {
    setHasPlayed(true);
    const urlDefender = `http://127.0.0.1:8000/matches/${jugador.partidaId}/players/${jugador.id}/play_card_defense`;

    const formatoDefensa = {
      player_main_id: jugador.id,
      match_id: jugador.partidaId,
      card_main_id: id_card_defense,
      card_target_id: jugador.atacanteCardId,
      player_target_id: jugador.atacanteId,
    }

    axios
      .put(urlDefender, formatoDefensa)
      .then(function (response) {
        if (Array.isArray(response.data) && response.data.length) {
          dispatch(setCartasPublicas(response.data)); // Carta: {id, image, name, type}
          /* Hay resultado.
          Cartas: Aterrador
          */
          dispatch(setFase(fase.resultado));
        } else {
          /* No hay resultado.
          Cartas: Nada de Barbacoas, Aqui estoy Bien, No Gracias, Fallaste
          */
          dispatch(setFase(fase.robo));
        }

        if (id_card_defense > 0) {
          dispatch(tirarCarta(jugador.seleccion));
          const urlRobarCarta = `http://127.0.0.1:8000/matches/${jugador.partidaId}/players/${jugador.id}/${false}/get_card`;
          axios
            .get(urlRobarCarta)
            .then(function (response) {
              dispatch(robarCarta(response.data));
            })
            .catch(function (response) {
              enqueueSnackbar(`error: ${response.message}`, {
                variant: "error",
              });
            });
        }
        dispatch(limpiarSelector());
        dispatch(limpiarAtacante());
        dispatch(setOpcionesDefensivas([]));
      })
      .catch(function (response) {
        enqueueSnackbar(`error: ${response.message}`, {
          variant: "error",
        });
      });
  }

  const obtenerObjetivos = () => {
    if (jugador.seleccionName === MAS_VALE_QUE_CORRAS_STR ||
      jugador.seleccionName === SEDUCCION_STR) {
      //Objetivo Cualquiera
      const objetivos = jugador.jugadores.filter(player => (player.alive && player.id != jugador.id))

      const output = [];
      objetivos.forEach((player) => {
        output.push(
          <li key={player.id} className="column">
            {(player.quarantine > 0 &&
              (jugador.seleccionName === MAS_VALE_QUE_CORRAS_STR ||
                jugador.seleccionName === SEDUCCION_STR)) ?
              <button
                className="opcion_rojo"
                onClick={() => descartar_carta()}
              >
                {player.name} (Descartar)
              </button> :
              <button
                className="opcion_verde"
                onClick={() => jugar_carta(player.id)}
              >
                {player.name}
              </button>
            }
          </li>
        );
      });
      return output;
    }
    else {
      //Objetivos Adyacentes
      const turno_actual = jugador ? jugador.turnoPartida : 0;
      var i = turno_actual;
      var jugadorAnterior;
      var jugadorSiguiente;
      do {
        if (i === 0) {
          i = jugador.jugadores.length;
        };
        i--;
        jugadorAnterior = jugador.jugadores.find(player => (player.turn === i));
      } while (!jugadorAnterior.alive);
      i = turno_actual;
      do {
        if (i === jugador.jugadores.length - 1) {
          i = -1;
        };
        i++;
        jugadorSiguiente = jugador.jugadores.find(player => (player.turn === i));
      } while (!jugadorSiguiente.alive);

      const adyacentes = (jugadorAnterior.id === jugadorSiguiente.id)
        ? [jugadorAnterior]
        : [jugadorAnterior, jugadorSiguiente];

      const output = [];
      adyacentes.forEach((player) => {
        output.push(
          <li key={player.id} className="column">
            {(player.quarantine > 0 && jugador.seleccionName === CAMBIO_DE_LUGAR_STR) ?
              <button
                className="opcion_rojo"
                onClick={() => descartar_carta()}
              >
                {player.name} (Descartar)
              </button> :
              <button
                className="opcion_verde"
                onClick={() => jugar_carta(player.id)}
              >
                {player.name}
              </button>
            }
          </li>
        );
      });
      return output;
    }
  }

  const objetivosJugadores = obtenerObjetivos();

  return (
    <div className="botones_juego">
      {jugador.cartasPanico.length && !hasPanicked ?
        <button className="opcion_rosa" onClick={() => check_carta()}>Pánico!!!!</button> :
        <div>
          {jugador.fase === fase.objetivo && !hasTarget && objetivosJugadores}
          {jugador.seleccion !== -1 && jugador.seleccionType !== typecard.lacosa && <div>
            {jugador.fase === fase.juego && !hasPlayed &&
              <div>
                <div>
                  <button
                    className="opcion_rojo" onClick={() => descartar_carta()}>
                    Descartar
                  </button>
                  {(
                    // Debe ser Acción u Obstáculo
                    (jugador.seleccionType === typecard.accion || jugador.seleccionType === typecard.obstaculo)
                    && // Si estoy en cuarentena
                    !(jugador.jugadores.find(player => player.id === jugador.id).quarantine > 0 &&
                      (
                        jugador.seleccionName === LANZALLAMAS_STR ||
                        jugador.seleccionName === CAMBIO_DE_LUGAR_STR ||
                        jugador.seleccionName === MAS_VALE_QUE_CORRAS_STR
                      )
                    ))
                    &&
                    <button
                      className={jugador.seleccionType === typecard.accion ? "opcion_verde" : "opcion_amarillo"}
                      onClick={() => check_carta()}>
                      {jugador.seleccionType === typecard.accion ? "Jugar" : "Bloquear"}
                    </button>}
                </div>
              </div>
            }
            {jugador.fase === fase.defensa && !hasPlayed &&
              <div>
                <button
                  className="opcion_rojo" onClick={() => defender_carta(0)}>
                  No Defender
                </button>
                {jugador.opcionesDefensivas.some(id => jugador.seleccion === id) &&
                  <button className="opcion_azul" onClick={() => defender_carta(jugador.seleccion)}>
                    Defender
                  </button>
                }
              </div>
            }
            {jugador.fase === fase.intercambio && !hasPlayed &&
              <div>
                {(jugador.seleccionType !== typecard.infectado || jugador.rol === typecard.lacosa ||
                  (jugador.rol === rol.infectado &&
                    jugador.cartas.filter(card => card.type === typecard.infectado).length > 1 &&
                    jugador.intercambiante === jugador.cosaId))
                  &&
                  <button
                    className="opcion_verde" onClick={() => intercambiar_carta()}>
                    Intercambiar
                  </button>
                }
                {jugador.opcionesDefensivas.some(id => jugador.seleccion === id) &&
                  <button className="opcion_azul" onClick={() => defender_carta(jugador.seleccion)}>
                    Defender
                  </button>
                }
              </div>
            }
          </div>}
        </div>}
    </div>
  );
}

export default ElegirCarta;
