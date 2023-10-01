// Componentes
import Mano from "./mano/Mano";

import { useState } from "react";
import RobarCarta from "./robar/RobarCarta";
import JugarCarta from "./jugar/JugarCarta";

// Petición al Back simulado
import Lanzallamas from "/Lanzallamas.png?url";
import Dorso1 from "/Dorso.png?url";
import Dorso2 from "/Dorso.png?url";
import Dorso3 from "/Dorso.png?url";

const cartas_import = [
  { id: 0, imagen: Lanzallamas },
  { id: 1, imagen: Dorso1 },
  { id: 2, imagen: Dorso2 },
  { id: 3, imagen: Dorso3 },
];

const nombre_import = "MiNombre";
const turno_jugador_import = 1;
const jugador_id_import = 1;
const turno_partida_import = 1;

function Jugador() {
  const [jugadorID, setJugadorID] = useState(jugador_id_import);
  const [nombre, setNombre] = useState(nombre_import);
  const [turno, setTurno] = useState(turno_jugador_import);
  const [cartas, setCartas] = useState(cartas_import);

  const [seleccion, setSeleccion] = useState();

  const [faseRobo, setFaseRobo] = useState(true);

  return (
    <div>
      {turno === turno_partida_import ? (
        <div>
          <Mano
            cartas={cartas}
            seleccion={seleccion}
            setSeleccion={setSeleccion}
          />
          {faseRobo ? (
            <RobarCarta setFaseRobo={setFaseRobo} setCartas={setCartas} />
          ) : (
            <div>
              {seleccion != null ? (
                <JugarCarta
                  mi_id={jugadorID}
                  mi_turno={turno}
                  id_carta={seleccion}
                  setTurno={setTurno}
                  setCartas={setCartas}
                />
              ) : null}
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
}

export default Jugador;