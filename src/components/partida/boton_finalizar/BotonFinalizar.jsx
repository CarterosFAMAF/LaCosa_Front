import './BotonFinalizar.css';
import axios from "axios";
import { useSelector } from "react-redux";
import { useSnackbar } from "notistack";

function BotonFinalizar() {
  const jugador = useSelector((state) => state.jugador);
  const rol = useSelector((state) => state.rol);
  const { enqueueSnackbar } = useSnackbar();

  const urlBotonFinalizar = `http://127.0.0.1:8000/matches/${jugador.partidaId}/players/${jugador.id}/declare_end`;

  const boton_finalizar = () => {
    axios
      .put(urlBotonFinalizar, {match_id: jugador.partidaId})
      .then(function (response) {
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
        jugador.rol === rol.lacosa &&
        <button className="boton_finalizar" onClick={() => boton_finalizar()}>
          Finalizar
        </button>
      }
    </div>
  );
}

export default BotonFinalizar;