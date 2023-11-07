import "./Carta.css";
import { useSelector, useDispatch } from "react-redux";
import { seleccionar } from "../../../store/jugadorSlice";

function Carta({ id, imagen }) {
  const jugador = useSelector((state) => state.jugador);
  const dispatch = useDispatch();

  const brillo_style =
    (id === jugador.seleccion) ? { border: `6px solid rgba(0, 60, 0, 0.6)` } : {};

  return (
    <img
      className="carta"
      style={brillo_style}
      src={`data:image/png;base64,${imagen}`}
      alt=""
      onClick={() => (jugador.fase%2 === 1) ? dispatch(seleccionar(id)) : null}
    />
  );
}

export default Carta;
