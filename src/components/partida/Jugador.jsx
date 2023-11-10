import "./Jugador.css";
import axios from "axios";
import Mano from "./mano/Mano";
import RobarCarta from "./robar/RobarCarta";
import ElegirCarta from "./elegir_carta/ElegirCarta";
import FinalizarPartida from "./finalizar_partida/FinalizarPartida";
import Tracker from "./tracker/Tracker";
import BotonFinalizar from "./boton_finalizar/BotonFinalizar";
import { setCartasPublicas, setFase } from "../../store/jugadorSlice";
import { useSelector, useDispatch } from "react-redux";
import { useSnackbar } from "notistack";
import { useState } from "react";

function Jugador() {
  const jugador = useSelector((state) => state.jugador);
  const fase = useSelector((state) => state.fase);
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const [endedMatch, setEndedMatch] = useState(false);

  console.log(jugador); //Borrar
  if(jugador.rol === "La_Cosa" && !jugador.vivo && endedMatch){
    const urlBotonFinalizar = `http://127.0.0.1:8000/matches/${jugador.partidaId}/players/${jugador.id}/declare_end`;
    axios
      .put(urlBotonFinalizar, {match_id: jugador.partidaId})
      .then(function (response) {
      })
      .catch(function (response) {
        enqueueSnackbar(`error: ${response.message}`, {
          variant: "error",
        });
      });
    setEndedMatch(true);
  }
  const terminar_checkeo = () => {
    if (jugador.posicion === jugador.turnoPartida) {
      dispatch(setFase(fase.intercambio)); // Ir a Intercambio
    }
    else {
      dispatch(setFase(fase.robo)); // No es tu turno
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
