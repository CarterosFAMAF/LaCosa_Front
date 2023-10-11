import "./RobarCarta.css";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { robarCarta } from "../../../store/jugadorSlice";


function RobarCarta() {
  const jugador = useSelector((state) => state.jugador);
  const dispatch = useDispatch();
  const urlRobarCarta = `http://127.0.0.1:8000/matches/${jugador.partidaId}/players/${jugador.id}/get_card`;

  const robar_carta = () => {
    axios
      .get(urlRobarCarta)
      .then(function (response) {
        console.log(response)
        dispatch(robarCarta(response.data));
      })
      .catch(function (response) {
        alert(`error: ${response.message}`);
      });
  };

  return (
    <button className="robar_carta" onClick={() => robar_carta()}>
      Robar
    </button>
  );
}

export default RobarCarta;
