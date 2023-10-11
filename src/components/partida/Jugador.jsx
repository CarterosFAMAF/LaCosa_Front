import { useSelector } from "react-redux";

import Mano from "./mano/Mano";
import RobarCarta from "./robar/RobarCarta";
import JugarCarta from "./jugar/JugarCarta";
import FinalizarPartida from "./finalizar_partida/finalizar_partida";

function Jugador() {
  const jugador = useSelector((state) => state.jugador);

  console.log(jugador); //Borrar

  return (
    <div>
      <Mano />
      {(jugador.iniciada === true) ? (
        <div>
          {(jugador.turnoPartida && (jugador.turno === jugador.turnoPartida)) ? (
            <div>
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
      ) :
        <FinalizarPartida />}
    </div>
  );
}

export default Jugador;
