import "./RobarCarta.css";

//Petición al Back simulada.
import Lanzallamas2 from "/Lanzallamas.png?url";
const carta_nueva = { id: 4, imagen: Lanzallamas2 };

function RobarCarta({ setFaseRobo, setCartas }) {
  const carta_robo = () => {
    console.log(`Hacer petición al back de robar carta`);
    setCartas((oldArray) => [...oldArray, carta_nueva]);
    setFaseRobo(false);
  };

  return (
    <button className="robar_carta" onClick={() => carta_robo()}>
      Robar
    </button>
  );
}

export default RobarCarta;
