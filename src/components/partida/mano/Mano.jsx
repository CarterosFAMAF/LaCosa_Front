import "./Mano.css";
import Carta from "../carta/Carta";

function Mano({cartas}) {

  const output = [];
  cartas.forEach((carta) => {
    output.push(
      <li key={carta.id}>
        <Carta
          id={carta.id}
          imagen={carta.image}
        ></Carta>
      </li>
    );
  });

  return <div className="mano">{output}</div>;
}

export default Mano;
