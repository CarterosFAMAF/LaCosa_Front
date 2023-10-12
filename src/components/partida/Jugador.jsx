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
      {
        (jugador.vivo) ? (
          <div>
            {jugador.fase !== 2 && <Mano />}
            {(jugador.turno === jugador.turnoPartida) ? (
              <div>
                {(jugador.fase === 0) ? (
                  <RobarCarta />
                ) : (
                  <div>
                    {jugador.seleccion !== -1 || jugador.fase === 2 ? (
                      <JugarCarta />
                    ) : null}
                  </div>
                )}
              </div>
            ) : null}
            {!jugador.iniciada && jugador.turnoPartida && <FinalizarPartida />}
          </div>
        ) : <h1>Estás Muerto jajaja</h1>
      }
    </div>
  );
}

export default Jugador;
