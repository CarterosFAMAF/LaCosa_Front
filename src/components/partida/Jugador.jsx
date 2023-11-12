import "./Jugador.css";
import axios from "axios";
import Mano from "./mano/Mano";
import RobarCarta from "./robar/RobarCarta";
import ElegirCarta from "./elegir_carta/ElegirCarta";
import FinalizarPartida from "./finalizar_partida/FinalizarPartida";
import Tracker from "./tracker/Tracker";
import BotonFinalizar from "./boton_finalizar/BotonFinalizar";
import { setCartasPublicas, setFase, setIntercambiante } from "../../store/jugadorSlice";
import { useSelector, useDispatch } from "react-redux";
import { useSnackbar } from "notistack";
import Chat from "../chat/Chat";

function Jugador() {
  const jugador = useSelector((state) => state.jugador);
  const fase = useSelector((state) => state.fase);
  const rol = useSelector((state) => state.rol);
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();

  console.log(jugador); //Borrar

  //Infectado revisa si el intercambiante es LaCosa
  if (jugador.rol === rol.infectado &&
    jugador.fase === fase.intercambio && !jugador.intercambiante &&
    jugador.turnoPartida === jugador.posicion) {
    console.log("Entra busca")
    const urlNextPlayer = `http://127.0.0.1:8000/matches/${jugador.partidaId}/next_player`;
    axios
      .get(urlNextPlayer)
      .then(function (response) {
        dispatch(setIntercambiante(response.data.next_player_id));
      })
      .catch(function (response) {
        enqueueSnackbar(`error: ${response.message}`, {
          variant: "error",
        });
      });
  }

  const terminar_checkeo = () => {
    if (jugador.posicion === jugador.turnoPartida && !jugador.intercambiante) {
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
      dispatch(setIntercambiante(0));
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
