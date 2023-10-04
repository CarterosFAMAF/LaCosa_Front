import "./Mano.css";
import Carta from "../carta/Carta";
import { useSelector } from "react-redux";

function Mano() {
  const jugador = useSelector((state) => state.jugador);

  const output = [];
  jugador.cartas.forEach((carta) => {
    output.push(
      <li key={carta.id}>
        <Carta
          id={carta.id}
          imagen={carta.imagen}
        ></Carta>
      </li>
    );
  });

  return <div className="mano">{output}</div>;
}

export default Mano;
