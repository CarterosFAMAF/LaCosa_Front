import "./ElegirCarta.css";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { tirarCarta, setFase, limpiarSelector, setCartasPublicas, setIntercambiante, robarCarta, limpiarAtacante, setOpcionesDefensivas, seleccionar } from "../../../store/jugadorSlice";
import { useSnackbar } from "notistack";
import { useState } from "react";
import { useEffect } from "react";

function ElegirCarta() {
  const jugador = useSelector((state) => state.jugador);
  const fase = useSelector((state) => state.fase);
  const typecard = useSelector((state) => state.typecard);
  const rol = useSelector((state) => state.rol);

  const dispatch = useDispatch();

  const { enqueueSnackbar } = useSnackbar();

  const [hasTarget, setHasTaget] = useState(false);
  const [hasPlayed, setHasPlayed] = useState(false);
  const cartasPanico = jugador.cartas.filter(carta => carta.type === "Panico");

  useEffect(() => {
    setHasPlayed(false);
  }, [jugador.fase]);

  const filtered_cards = jugador.cartas.filter(carta => (carta.id === jugador.seleccion))[0];
  const carta_nombre = filtered_cards ? filtered_cards.name : "";

  const enviar_carta = (urlEnviarCarta) => {
    axios
      .put(urlEnviarCarta)
      .then(function (response) {
        dispatch(tirarCarta(jugador.seleccion));
        dispatch(limpiarSelector());
        if (Array.isArray(response.data) && response.data.length) {
          dispatch(setCartasPublicas(response.data)); // Carta: {id, image, name, type}
          dispatch(setFase(fase.resultado)); // Ver Efecto
        }
        else {
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
    if (cartasPanico.length){
      dispatch(seleccionar(cartasPanico[0]));
    }
    if (carta_nombre === "Vigila_tus_espaldas" || carta_nombre === "Whisky" || carta_nombre === "Ups!") {
      //Sin Objetivo
      jugar_carta(0);
    } else {
      //Pedir Objetivo
      dispatch(setFase(fase.objetivo));
    }
  };

  const intercambiar_carta = () => {
    setHasPlayed(true);
    const urlIntercambiarCarta = `http://127.0.0.1:8000/matches/${jugador.partidaId}/players/${jugador.id}/exchange_cards`;

    console.log("Intercambiante")
    console.log(jugador.intercambiante)

    const endpoint_params_intercambiar = {
      match_id: jugador.partidaId,
      player_id: jugador.id,
      player_target_id: jugador.intercambiante,
      card_id: jugador.seleccion,
      is_you_failed: false
    };

    axios
      .put(urlIntercambiarCarta, endpoint_params_intercambiar)
      .then(function (response) {
        dispatch(tirarCarta(jugador.seleccion));
        dispatch(limpiarSelector());
        dispatch(setIntercambiante(0));
        dispatch(limpiarAtacante());
        dispatch(setOpcionesDefensivas([]));
      })
      .catch(function (response) {
        enqueueSnackbar(`error: ${response.message}`, {
          variant: "error",
        });
      });
  }

  const defender_carta = (id_card_defense) => {

    const urlDefender = `http://127.0.0.1:8000/matches/${jugador.partidaId}/players/${jugador.id}/play_card_defense`;

    const formatoDefensa = {
      player_main_id: jugador.id,
      match_id: jugador.partidaId,
      card_main_id: id_card_defense,
      card_target_id: jugador.atacanteCardId,
      player_target_id: jugador.atacanteId,
    }
    console.log(formatoDefensa);

    axios
      .put(urlDefender, formatoDefensa)
      .then(function (response) {
        dispatch(tirarCarta(jugador.seleccion));
        dispatch(limpiarSelector());
        dispatch(limpiarAtacante());
        dispatch(setOpcionesDefensivas([]));

        if (Array.isArray(response.data) && response.data.length) {
          dispatch(setCartasPublicas(response.data)); // Carta: {id, image, name, type}
          dispatch(setFase(fase.resultado)); // Ver Efecto
        }
        else {
          dispatch(setFase(fase.espera)); // No es tu turno.
        }

        const urlRobarCarta = `http://127.0.0.1:8000/matches/${jugador.partidaId}/players/${jugador.id}/get_card`;
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
      })
      .catch(function (response) {
        enqueueSnackbar(`error: ${response.message}`, {
          variant: "error",
        });
      });
  }

  const obtenerObjetivos = () => {
    if (carta_nombre === "Mas_Vale_Que_Corras" || carta_nombre === "Seduccion") {
      //Objetivo Cualquiera
      const objetivos = jugador.jugadores.filter(player => (player.alive === true && player.id != jugador.id))
      const output = [];
      objetivos.forEach((player) => {
        output.push(
          <li key={player.id}>
            <button
              className="opcion_verde"
              onClick={() => jugar_carta(player.id)}
            >
              {player.name}
            </button>
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
          <li key={player.id}>
            <button
              className="opcion_verde"
              onClick={() => jugar_carta(player.id)}
            >
              {player.name}
            </button>
          </li>
        );
      });
      return output;
    }
  }

  const objetivosJugadores = obtenerObjetivos();

  return (
    <div className="botones_juego">
      {jugador.seleccion !== -1 && jugador.seleccionType !== typecard.lacosa && <div>
        {jugador.fase === fase.juego && !hasPlayed &&
        <div>
          {cartasPanico.length ? 
          <button className="opcion_verde" onClick={() => check_carta()}>Pánico!!!!</button> :
          <div>
            <button
              className="opcion_rojo" onClick={() => descartar_carta()}>
              Descartar
            </button>
            {jugador.seleccionType === typecard.accion &&
              <button className="opcion_verde" onClick={() => check_carta()}>
                Jugar
              </button>}
          </div>}
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
      {jugador.fase === fase.objetivo && !hasTarget && objetivosJugadores}
    </div>
  );
}

export default ElegirCarta;
