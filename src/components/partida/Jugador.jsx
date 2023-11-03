import "./Jugador.css";
import '../Estilos.css';
import Mano from "./mano/Mano";
import RobarCarta from "./robar/RobarCarta";
import JugarCarta from "./jugar/JugarCarta";
import FinalizarPartida from "./finalizar_partida/finalizar_partida";
import { useSelector, useDispatch } from "react-redux";
import { setCartasPublicas, setFase } from "../../store/jugadorSlice";

function Jugador() {
  const jugador = useSelector((state) => state.jugador);
  const dispatch = useDispatch();

  console.log(jugador); //Borrar

  const terminar_checkeo = () => {
    dispatch(setFase(0)); // Termina turno
    dispatch(setCartasPublicas([]))
  }

  return (
    <div>
      <h2>{jugador.nombre}</h2>
      {(!jugador.iniciada && !jugador.id) ?
        <FinalizarPartida /> :
        (jugador.vivo) ?
          <div>
            <Mano cartas={jugador.cartas} />
            {(jugador.posicion === jugador.turnoPartida) &&
              <div>
                {(jugador.fase === 0) ?
                  <RobarCarta /> :
                  <div>
                    {(jugador.seleccion !== -1 || jugador.fase === 2) && <JugarCarta />}
                  </div>
                }
              </div>}
            {jugador.fase === 3 &&
              <div className="check_fase">
                <Mano cartas={jugador.cartasPublicas} />
                <button className="listo" onClick={() => terminar_checkeo()}>Listo</button>
              </div>
            }
          </div>
          : <h1>Estás Muerto jajaja</h1>
      }
    </div>
  );
}

export default Jugador;
