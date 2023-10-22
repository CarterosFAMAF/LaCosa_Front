import "./JugarCarta.css";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { tirarCarta, setFase, limpiarSelector } from "../../../store/jugadorSlice";
import { useSnackbar } from "notistack";

function JugarCarta() {
  const jugador = useSelector((state) => state.jugador);
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const enviar_carta = (urlEnviarCarta) => {
    axios
      .put(urlEnviarCarta)
      .then(function (response) {
        dispatch(tirarCarta(jugador.seleccion));
        dispatch(limpiarSelector());
        dispatch(setFase(0)); // Termina turno
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
    const card_name = jugador.cartas.filter(carta => (carta.id === jugador.seleccion))[0].name;
    if (card_name === "lanzallamas" || card_name === "Mas_Vale_Que_Corras" || card_name === "Sospecha") {
      //Pedir Objetivo
      dispatch(setFase(2));
    } else { //Sin Objetivo
      jugar_carta(0);
    }
  };

  const obtener_adyacentes = () => {
    // CORREGIR
    // No checkea los muertos
    const jugadoresVivos = jugador.jugadores.filter(player => (player.vivo === true))
    // jugadoresAdyacentes = checkear jugadores adyacentes de los vivos  

    const output = [];
    jugador.jugadores.forEach((player) => {
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

  const outputAdyacentes = obtener_adyacentes();

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
      ) : outputAdyacentes}
    </div>
  );
}

export default JugarCarta;
