import "./RobarCarta.css";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { robarCarta } from "../../../store/jugadorSlice";
import { useState } from "react";

function RobarCarta() {
  const jugador = useSelector((state) => state.jugador);
  const dispatch = useDispatch();
  const [gotCard, setGotCard] = useState(false);
  const urlRobarCarta = `http://127.0.0.1:8000/matches/${jugador.partidaId}/players/${jugador.id}/get_card`;

  const robar_carta = () => {
    setGotCard(true);
    axios
      .get(urlRobarCarta)
      .then(function (response) {
        dispatch(robarCarta(response.data));
      })
      .catch(function (response) {
        enqueueSnackbar(`error: ${response.message}`, {
          variant: "error",
        });
      });
  };

  return (
    <div>
      {!gotCard &&
        <button className="robar_carta" onClick={() => robar_carta()}>
          Robar
        </button>}
    </div>
  );
}

export default RobarCarta;
