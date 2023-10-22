import "./JugarCarta.css";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { tirarCarta, setFase, limpiarSelector, setCartaPublica } from "../../../store/jugadorSlice";
import { useSnackbar } from "notistack";

function JugarCarta() {
  const jugador = useSelector((state) => state.jugador);
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const card_name = jugador.cartas.filter(carta => (carta.id === jugador.seleccion))[0].name;

  const enviar_carta = (urlEnviarCarta) => {
    axios
      .put(urlEnviarCarta)
      .then(function (response) {
        dispatch(tirarCarta(jugador.seleccion));
        dispatch(limpiarSelector());
        if (response.data && response.data.message !== "Card discard") {
          dispatch(setCartaPublica(response.data)); // Para Sospecha: {id, image, name}
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
    const urlJugarCarta = `http://127.0.0.1:8000/matches/${jugador.partidaId}/players/${jugador.id}/${objetivo_id}/${jugador.seleccion}/play_card`;
    enviar_carta(urlJugarCarta);
  }

  const descartar_carta = () => {
    const urlDescartarCarta = `http://127.0.0.1:8000/matches/${jugador.partidaId}/players/${jugador.id}/${jugador.seleccion}/discard`;
    enviar_carta(urlDescartarCarta);
  };

  const check_carta = () => {
    if (card_name === "lanzallamas" || card_name === "Mas_Vale_Que_Corras" || card_name === "Sospecha") {
      //Pedir Objetivo
      dispatch(setFase(2));
    } else { //Sin Objetivo
      jugar_carta(0);
    }
  };

  const obtenerObjetivos = () => {
    if (card_name === "lanzallamas" || card_name === "Sospecha") {
      //Jugadores Adyacentes
      const turno_actual = jugador.turnoPartida;
      var i = turno_actual;
      var jugadorAnterior;
      var jugadorSiguiente;
      console.log(jugador.turnoPartida);
      do {
        if (i === 0) {
          i = jugador.jugadores.length;
        };
        i--;
        jugadorAnterior = jugador.jugadores.find(player => (player.turn === i));
        console.log(jugadorAnterior);
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
    else {
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
  }

  const objetivosJugadores = obtenerObjetivos();

  return (
    <div className="botones_juego">
      {jugador.fase == 1 ? (
        <div>
          <button
            className="descartar" onClick={() => descartar_carta()}>
            Descartar
          </button>
          <button className="jugar" onClick={() => check_carta()}>
            Jugar
          </button>
        </div>
      ) : objetivosJugadores}
    </div>
  );
}

export default JugarCarta;
