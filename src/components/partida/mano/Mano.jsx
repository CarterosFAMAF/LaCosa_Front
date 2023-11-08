import "./Mano.css";
import Carta from "../carta/Carta";

function Mano({cartas}) {

  const output = [];
  cartas.forEach((card) => {
    output.push(
      <li key={card.id}>
        <Carta
          carta={card}
        ></Carta>
      </li>
    );
  });

  return <div className="mano">{output}</div>;
}

export default Mano;
