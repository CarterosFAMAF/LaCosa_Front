import './faltante_finalizar.css';
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setFaltanteFinalizar } from '../../../store/jugadorSlice';

function FaltanteFinalizar() {
  const jugador = useSelector((state) => state.jugador);
  const dispatch = useDispatch();
  const esLaCosa = jugador.cartas.filter(carta => carta.name === "La_Cosa").find(jugador => jugador);

  const urlFaltanteFinalizar = `http://127.0.0.1:8000/matches/${jugador.partidaId}/players/${jugador.id}/declare_end`;

  const faltante_finalizar = () => {
    axios
      .put(urlFaltanteFinalizar)
      .then(function (response) {
        dispatch(setFaltanteFinalizar(response.data));
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
        <button className="faltante_finalizar" onClick={() => faltante_finalizar}>
          Finalizar
        </button>
      }
    </div>
  );
}

export default FaltanteFinalizar;