import "./ElegirCarta.css";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { tirarCarta, setFase, limpiarSelector, setCartasPublicas } from "../../../store/jugadorSlice";
import { useSnackbar } from "notistack";
import { useState } from "react";

function ElegirCarta() {
  const jugador = useSelector((state) => state.jugador);
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const [hasTarget, setHasTaget] = useState(false);
  const [hasPlayed, setHasPlayed] = useState(false);
  const [hasExchanged, setHasExchanged] = useState(false);

  const filtered_cards = jugador.cartas.filter(carta => (carta.id === jugador.seleccion))[0];
  const carta_nombre = filtered_cards ? filtered_cards.name : "";

  const enviar_carta = (urlEnviarCarta) => {
    axios
      .put(urlEnviarCarta)
      .then(function (response) {
        dispatch(tirarCarta(jugador.seleccion));
        dispatch(limpiarSelector());
        console.log("Jugar")
        console.log(response)
        if (Array.isArray(response.data) && response.data.length) {
          dispatch(setCartasPublicas(response.data)); //Carta: {id, image, name}
          dispatch(setFase(4)); // Ver Efecto
        }
        else {
          dispatch(setFase(5)); // Ir a Intercambio
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
    if (carta_nombre === "Vigila_Tus_Espaldas" || carta_nombre === "Whisky") {
      //Sin Objetivo
      jugar_carta(0);
    } else {
      //Pedir Objetivo
      dispatch(setFase(2));
    }
  };

  const intercambiar_carta = () => {
    setHasExchanged(true);
    const urlIntercambiarCarta = `http://127.0.0.1:8000/matches/${jugador.partidaId}/players/${jugador.id}/exchange_cards`;

    const endpoint_params_intercambiar = {
      match_id: jugador.partidaId,
      player_id: jugador.id,
      player_target_id: jugador.intercambiante,
      card_id: jugador.seleccion
    };

    axios
      .put(urlIntercambiarCarta, endpoint_params_intercambiar)
      .then(function (response) {
        dispatch(tirarCarta(jugador.seleccion));
        dispatch(limpiarSelector());
        dispatch(setFase(0)) // Termina Turno
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
              className="elegir_jugador"
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
              className="elegir_jugador"
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
      {jugador.seleccion !== -1 && <div>
        {jugador.fase === 1 &&
          <div>
            {!hasPlayed &&
              <div>
                <button
                  className="descartar" onClick={() => descartar_carta()}>
                  Descartar
                </button>
                <button className="elegir_carta" onClick={() => check_carta()}>
                  Jugar
                </button>
              </div>}
          </div>}
        {jugador.fase === 5 && !hasExchanged &&
          <button
            className="elegir_carta" onClick={() => intercambiar_carta()}>
            Intercambiar
          </button>
        }
      </div>}
      {jugador.fase === 2 && !hasTarget && objetivosJugadores}
    </div>
  );
}

export default ElegirCarta;
