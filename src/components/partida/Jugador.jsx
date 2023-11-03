import "./Jugador.css";
import Mano from "./mano/Mano";
import RobarCarta from "./robar/RobarCarta";
import ElegirCarta from "./elegir_carta/ElegirCarta";
import FinalizarPartida from "./finalizar_partida/finalizar_partida";
import { useSelector, useDispatch } from "react-redux";
import { setCartasPublicas, setFase } from "../../store/jugadorSlice";

function Jugador() {
  const jugador = useSelector((state) => state.jugador);
  const dispatch = useDispatch();

  console.log(jugador); //Borrar

  const terminar_checkeo = () => {
    dispatch(setFase(5)); // Ir a Intercambio
    dispatch(setCartasPublicas([]))
  }

  return (
    <div>
      {(!jugador.iniciada && !jugador.id) ?
        <FinalizarPartida /> :
        (jugador.vivo) ?
          <div>
            <Mano cartas={jugador.cartas} />

            {(jugador.posicion === jugador.turnoPartida && jugador.fase === 0) && <RobarCarta />}
            {(jugador.fase !== 0 && jugador.fase !== 4) && <ElegirCarta />}
            {jugador.fase === 4 &&
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
