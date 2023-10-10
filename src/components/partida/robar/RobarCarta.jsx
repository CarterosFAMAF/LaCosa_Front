import "./RobarCarta.css";
import { useDispatch } from "react-redux";
import { robarCarta } from "../../../store/jugadorSlice";

//Petición al Back simulada.
import Lanzallamas2 from "/Lanzallamas.png?url";
const carta_nueva = { id: 5, imagen: Lanzallamas2 };
// Back

function RobarCarta() {
  const dispatch = useDispatch();

  const robar_carta = () => {
    console.log(`Hacer petición al back de robar carta`);
    dispatch(robarCarta(carta_nueva));
  };

  return (
    <button className="robar_carta" onClick={() => robar_carta()}>
      Robar
    </button>
  );
}

export default RobarCarta;
