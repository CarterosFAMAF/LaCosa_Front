import "./JugarCarta.css";
import Lanzallamas from "../lanzallamas/Lanzallamas";
import { useState } from "react";

function JugarCarta({ mi_id, mi_turno, id_carta, setTurno, setCartas }) {
  const [jugoCarta, setJugoCarta] = useState(false);

  const jugar_carta = (id_carta) => {
    console.log(`Hacer petición al back de jugar la carta ${id_carta}`);
    setJugoCarta(true);
  };

  const descartar_carta = (id_carta) => {
    console.log(`Hacer petición al back de descartar la carta ${id_carta}`);
    setCartas((oldArray) => oldArray.filter((item) => item.id !== id_carta));
    setTurno((turnoViejo) => turnoViejo + 1);
  };

  return (
    <div className="botones_juego">
      {!jugoCarta ? (
        <div>
          <button
            className="descartar"
            onClick={() => descartar_carta(id_carta)}
          >
            Descartar
          </button>
          <button className="jugar" onClick={() => jugar_carta(id_carta)}>
            Jugar
          </button>
        </div>
      ) : (
        <Lanzallamas
          mi_id={mi_id}
          mi_turno={mi_turno}
          carta_id={id_carta}
          setTurno={setTurno}
          setCartas={setCartas}
        />
      )}
    </div>
  );
}

export default JugarCarta;
