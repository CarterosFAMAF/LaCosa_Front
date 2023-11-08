import "./Carta.css";
import { useSelector, useDispatch } from "react-redux";
import { seleccionar } from "../../../store/jugadorSlice";

function Carta({ id, imagen }) {
  const jugador = useSelector((state) => state.jugador);
  const dispatch = useDispatch();

  const brillo_style =
    (id === jugador.seleccion) ? { border: `6px solid rgba(0, 60, 0, 0.6)` } : {};

  const selector = () => {
    /*
    if(
      name !== "LaCosa" &&     // No es la cosa
      (jugador.fase === 1 && tipo === "Acción" && name !== "Infección") ||
      (jugador.fase === 3 && tipo === "Defensa" && name !== "Infección") ||
      (jugador.fase === 5 &&
        (
          name !== "Infección" ||
          (jugador.rol === "Infectado" && InfecciónEnMano>1 && ObjetivoEsLaCosa)
        )
      )
    ) {
      dispatch(seleccionar(id))
    }
    */
    if (jugador.fase % 2 === 1) {
      dispatch(seleccionar(id))
    }
  }

  return (
    <img
      className="carta"
      style={brillo_style}
      src={`data:image/png;base64,${imagen}`}
      alt=""
      onClick={() => selector()}
    />
  );
}

export default Carta;
