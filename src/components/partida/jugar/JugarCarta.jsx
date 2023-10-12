import "./JugarCarta.css";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { tirarCarta, setFase, limpiarSelector } from "../../../store/jugadorSlice";

function JugarCarta() {
  const jugador = useSelector((state) => state.jugador);
  const dispatch = useDispatch();

  const obtener_adyacentes = () => {
    return jugador.jugadores.filter(player => ((player.turn === jugador.turno + 1 % jugador.jugadores.length) || (jugador.turno - 1 === -1 ? (player.turn === jugador.jugadores.length - 1) : player.turn === jugador.turno - 1)))
  }

  const jugar_carta = () => {
    dispatch(tirarCarta(jugador.seleccion))
    const card_name = jugador.cartas.filter(carta => (carta.id === jugador.seleccion))[0].name;
    if (card_name === "lanzallamas") {
      // Pedir Objetivo
      dispatch(setFase(2));
    } else {
      // Sin Objetivo
      enviar_carta(null);
    }
  };

  const descartar_carta = () => {
    dispatch(tirarCarta(jugador.seleccion))
    dispatch(limpiarSelector());
  };

  const enviar_carta = (objetivo_id) => {
    console.log("Hacer Pedido al Back de usar carta");
    const urlJugarCarta = `http://127.0.0.1:8000/matches/${jugador.partidaId}/players/${jugador.id}/${objetivo_id}/${jugador.seleccion}/play_card`;
    console.log(urlJugarCarta);
    axios
      .put(urlJugarCarta)
      .then(function (response) {
        console.log(response);
        dispatch(setFase(0));
      })
      .catch(function (response) {
        alert(`error: ${response.message}`);
      });
    dispatch(limpiarSelector());
  }

  const output = [];

  const jugadoresAdyacentes = obtener_adyacentes();
  console.log(jugadoresAdyacentes)
  jugadoresAdyacentes.forEach((player) => {
    output.push(
      <li key={player.id}>
        <button
          className="elegir_jugador"
          onClick={() => enviar_carta(player.id)}
        >
          {player.name}
        </button>
      </li>
    );
  });

  return (
    <div className="botones_juego">
      {jugador.fase !== 2 ? (
        <div>
          <button
            className="descartar" onClick={() => descartar_carta()}>
            Descartar
          </button>
          <button className="jugar" onClick={() => jugar_carta()}>
            Jugar
          </button>
        </div>
      ) : output}
    </div>
  );
}

export default JugarCarta;
