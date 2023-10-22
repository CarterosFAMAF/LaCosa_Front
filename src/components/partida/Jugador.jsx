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
      <h2>{jugador.nombre}</h2>
      {(!jugador.iniciada && !jugador.id) ?
        <FinalizarPartida /> :
        (jugador.vivo) ?
          <div>
            <Mano />
            {(jugador.posicion === jugador.turnoPartida) ?
              <div>
                {(jugador.fase === 0) ?
                  <RobarCarta /> :
                  <div>
                    {jugador.seleccion !== -1 || jugador.fase === 2 ? (
                      <JugarCarta />
                    ) : null}
                  </div>
                }
              </div>
              : null}
          </div>
          : <h1>Estás Muerto jajaja</h1>
      }
    </div>
  );
}

export default Jugador;
