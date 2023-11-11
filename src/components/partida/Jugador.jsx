import "./Jugador.css";
import Mano from "./mano/Mano";
import RobarCarta from "./robar/RobarCarta";
import ElegirCarta from "./elegir_carta/ElegirCarta";
import FinalizarPartida from "./finalizar_partida/FinalizarPartida";
import Tracker from "./tracker/Tracker";
import BotonFinalizar from "./boton_finalizar/BotonFinalizar";
import { setCartasPublicas, setFase, setIntercambiante } from "../../store/jugadorSlice";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

function Jugador() {
  const jugador = useSelector((state) => state.jugador);
  const fase = useSelector((state) => state.fase);
  const rol = useSelector((state) => state.rol);
  const dispatch = useDispatch();

  console.log(jugador); //Borrar

  //Infectado revisa si el intercambiante es LaCosa
  if (jugador.rol === rol.infectado && 
      jugador.fase === fase.intercambio && !jugador.intercambiante &&
      jugador.turnoPartida === jugador.posicion) {
    const urlNextPlayer = `http://127.0.0.1:8000/matches/${jugador.partidaId}/next_player`;
    axios
      .get(urlNextPlayer)
      .then(function (response) {
        console.log("Check cosa")
        console.log(response)
        dispatch(setIntercambiante(response.data.next_player_id));
      })
      .catch(function (response) {
        enqueueSnackbar(`error: ${response.message}`, {
          variant: "error",
        });
      });
  }

  const terminar_checkeo = () => {
    if (jugador.posicion === jugador.turnoPartida) {
      dispatch(setFase(fase.intercambio)); // Ir a Intercambio
    }
    else {
      dispatch(setFase(fase.espera)); // No es tu turno
    }
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
            <BotonFinalizar />

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
          : <h1>Estás Muerto</h1>
      }
    </div>
  );
}

export default Jugador;
