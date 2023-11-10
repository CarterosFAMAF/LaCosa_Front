import "./Carta.css";
import { useSelector, useDispatch } from "react-redux";
import { seleccionar } from "../../../store/jugadorSlice";

function Carta({ carta }) { // Carta = {id, name, image, type}
  const jugador = useSelector((state) => state.jugador);
  const dispatch = useDispatch();

  const brillo_style =
    (carta.id === jugador.seleccion) ? { border: `6px solid rgba(0, 60, 0, 0.6)` } : {};

  const selector = () => {
    if (jugador.fase % 2 === 1) {
      dispatch(seleccionar(carta))
    }
  }

  return (
    <img
      className="carta"
      style={brillo_style}
      src={`data:image/png;base64,${carta.image}`}
      alt=""
      onClick={() => selector()}
    />
  );
}

export default Carta;
