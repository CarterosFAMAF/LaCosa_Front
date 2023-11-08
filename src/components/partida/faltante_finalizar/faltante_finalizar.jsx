import './faltante_finalizar.css';
import axios from "axios";
import { useSelector } from "react-redux";
import { useSnackbar } from "notistack";
import FinalizarPartida from '../finalizar_partida/finalizar_partida';

function FaltanteFinalizar() {
  const jugador = useSelector((state) => state.jugador);
  const { enqueueSnackbar } = useSnackbar();
  const esLaCosa = jugador.cartas.filter(carta => carta.name === "La_Cosa").find(jugador => jugador);

  const urlFaltanteFinalizar = `http://127.0.0.1:8000/matches/${jugador.partidaId}/players/${jugador.id}/declare_end`;
  const endpoint_params_faltante = {
    match_id: jugador.partidaId,
  };

  const faltante_finalizar = () => {
    axios
      .put(urlFaltanteFinalizar, endpoint_params_faltante)
      .then(function (response) {
        <FinalizarPartida />
      })
      .catch(function (response) {
        enqueueSnackbar(`error: ${response.message}`, {
          variant: "error",
        });
      });
  };

  return (
    <div>
      {
        esLaCosa &&
        <button className="faltante_finalizar" onClick={() => faltante_finalizar()}>
          Finalizar
        </button>
      }
    </div>
  );
}

export default FaltanteFinalizar;