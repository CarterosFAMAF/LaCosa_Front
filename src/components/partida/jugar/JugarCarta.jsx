import "./JugarCarta.css";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { tirarCarta, setFase, limpiarSelector, setCartasPublicas } from "../../../store/jugadorSlice";
import { useSnackbar } from "notistack";
import { useState } from "react";

function JugarCarta() {
  const jugador = useSelector((state) => state.jugador);
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const [hasTarget, setHasTaget] = useState(false);
  const [hasPlayed, setHasPlayed] = useState(false);

  const carta_nombre = jugador.cartas.filter(carta => (carta.id === jugador.seleccion))[0].name;

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
          dispatch(setFase(3)); // Ver Efecto
        }
        else {
          dispatch(setFase(0)); // Termina turno
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

  const obtenerObjetivos = () => {
    if (carta_nombre === "Mas_Vale_Que_Corras") {
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
      {jugador.fase === 1 && !hasPlayed &&
        <div>
          <button
            className="descartar" onClick={() => descartar_carta()}>
            Descartar
          </button>
          <button className="jugar" onClick={() => check_carta()}>
            Jugar
          </button>
        </div>
      }
      {jugador.fase === 2 && !hasTarget && objetivosJugadores}
    </div>
  );
}

export default JugarCarta;
