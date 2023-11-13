import "./Jugador.css";
import Mano from "./mano/Mano";
import RobarCarta from "./robar/RobarCarta";
import ElegirCarta from "./elegir_carta/ElegirCarta";
import FinalizarPartida from "./finalizar_partida/FinalizarPartida";
import Tracker from "./tracker/Tracker";
import BotonFinalizar from "./boton_finalizar/BotonFinalizar";
import { setCartasPublicas, setFase, setAterrado } from "../../store/jugadorSlice";
import { useSelector, useDispatch } from "react-redux";
import Chat from "../chat/Chat";

function Jugador() {
  const jugador = useSelector((state) => state.jugador);
  const fase = useSelector((state) => state.fase);
  const dispatch = useDispatch();

  console.log(jugador); //Borrar

  const terminar_checkeo = () => {
    if (jugador.posicion === jugador.turnoPartida && !jugador.aterrado) {
      // Jugué una Carta en mi turno y me mostró algo.
      // Análisis, Sospecha.
      /*
        NOTA: Si otro jugador puede ponerme en fase.resultado estando fuera de turno,
        (durante su defensa o intercambio) entonces debería volver a la fase en la que
        estaba justo antes de que me pusieran en fase.resultado y no siempre a intercambio.
        En ese caso habría que cambiarlo.
      */
      dispatch(setFase(fase.intercambio)); // Ir a Intercambio
    }
    else {
      // Me quieren mostrar algo fuera de mi turno.
      // Aterrador, Whisky
      dispatch(setFase(fase.robo));
      dispatch(setAterrado(false))
    }
    dispatch(setCartasPublicas([]))
  }

  return (
    <div>
      {(!jugador.iniciada && !jugador.id) ?
        <FinalizarPartida /> :
        (jugador.vivo) ?
          <div>
            <Chat />
            <Mano cartas={jugador.cartas} />
            <BotonFinalizar />
            <Tracker />

            {(jugador.posicion === jugador.turnoPartida && jugador.fase === fase.robo) && <RobarCarta />}
            {(jugador.fase === fase.juego || jugador.fase === fase.objetivo ||
              jugador.fase === fase.defensa || jugador.fase === fase.intercambio) && <ElegirCarta />}
            {jugador.fase === fase.resultado &&
              <div className="check_fase">
                <Mano cartas={jugador.cartasPublicas} />
                <button className="listo" onClick={() => terminar_checkeo()}>Listo</button>
              </div>
            }
          </div>
          : <div className="muerto">
            <h1 className="muerto_mensaje">Estás Muerto</h1>
            <img className="white_skull" src={("/LaCosaNostra.png")} />
          </div>
      }
    </div>
  );
}

export default Jugador;
