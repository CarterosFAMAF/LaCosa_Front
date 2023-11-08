import "./Jugador.css";
import Mano from "./mano/Mano";
import RobarCarta from "./robar/RobarCarta";
import ElegirCarta from "./elegir_carta/ElegirCarta";
import FinalizarPartida from "./finalizar_partida/finalizar_partida";
import Tracker from "./tracker/Tracker";
import { setCartasPublicas, setFase } from "../../store/jugadorSlice";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { useEffect } from "react";

function Jugador() {
  const jugador = useSelector((state) => state.jugador);
  const fase = useSelector((state) => state.fase);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (jugador.jugadores.length) {
      navigate("/");
    }
  }, [jugador.jugadores]);

  console.log(jugador); //Borrar

  const terminar_checkeo = () => {
    dispatch(setFase(fase.intercambio)); // Ir a Intercambio
    dispatch(setCartasPublicas([]))
  }

  return (
    <div>
      {(!jugador.iniciada && !jugador.id) ?
        <FinalizarPartida /> :
        (jugador.vivo) ?
          <div>
            <Tracker />
            <Mano cartas={jugador.cartas} />

            {(jugador.posicion === jugador.turnoPartida && jugador.fase === fase.robo) && <RobarCarta />}
            {(jugador.fase !== fase.robo && jugador.fase !== fase.resultado) && <ElegirCarta />}
            {jugador.fase === fase.resultado &&
              <div className="check_fase">
                <Mano cartas={jugador.cartasPublicas} />
                <button className="listo" onClick={() => terminar_checkeo()}>Listo</button>
              </div>
            }
          </div>
          : <h1>Estás Muerto</h1>
      }
    </div>
  );
}

export default Jugador;
