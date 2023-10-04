import "./JugarCarta.css";
import { useSelector, useDispatch } from "react-redux";
import { tirarCarta } from "../../../store/jugadorSlice";

function JugarCarta() {
  const jugador = useSelector((state) => state.jugador);
  const dispatch = useDispatch();

  const jugar_carta = () => {
    console.log(`Hacer petición al back de jugar la carta ${jugador.seleccion}`);
    dispatch(tirarCarta(jugador.seleccion))
  };

  const descartar_carta = () => {
    console.log(`Hacer petición al back de descartar la carta ${jugador.seleccion}`);
    dispatch(tirarCarta(jugador.seleccion))
  };

  return (
    <div className="botones_juego">
      <button
        className="descartar" onClick={() => descartar_carta()}>
        Descartar
      </button>
      <button className="jugar" onClick={() => jugar_carta()}>
        Jugar
      </button>
    </div>
  );
}

export default JugarCarta;
