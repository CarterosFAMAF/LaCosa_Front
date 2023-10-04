import { useSelector, useDispatch } from "react-redux";
import { inicioPartida } from "../../store/jugadorSlice";

// Petición al Back simulado
import Mano from "./mano/Mano";
import RobarCarta from "./robar/RobarCarta";
import JugarCarta from "./jugar/JugarCarta";
import Lanzallamas from "/Lanzallamas.png?url";

import Dorso1 from "/Dorso.png?url";
import Dorso2 from "/Dorso.png?url";
import Dorso3 from "/Dorso.png?url";
import { useEffect } from "react";

const cartas_import = [
  { id: 1, imagen: Lanzallamas },
  { id: 2, imagen: Dorso1 },
  { id: 3, imagen: Dorso2 },
  { id: 4, imagen: Dorso3 },
];

const formato_inicio_partida = {
  turno: 1,
  cartas: cartas_import,
  turnoPartida: 1,
}
// Back



function Jugador() {
  const jugador = useSelector((state) => state.jugador);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(inicioPartida(formato_inicio_partida));
  }, [])
  
  console.log(jugador.cartas);

  return (
    <div>
      {(jugador.turnoPartida && (jugador.turno === jugador.turnoPartida)) ? (
        <div>
          <Mano />
          {(jugador.fase === 0) ? (
            <RobarCarta />
          ) : (
            <div>
              {jugador.seleccion !== 0 ? (
                <JugarCarta />
              ) : null}
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
}

export default Jugador;
