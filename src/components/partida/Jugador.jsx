import Mano from "./mano/Mano";
import RobarCarta from "./robar/RobarCarta";
import JugarCarta from "./jugar/JugarCarta";
import Carta from "./carta/Carta";
import FinalizarPartida from "./finalizar_partida/finalizar_partida";
import { useSelector, useDispatch } from "react-redux";
import { setCartaPublica, setFase } from "../../store/jugadorSlice";

function Jugador() {
  const jugador = useSelector((state) => state.jugador);
  const dispatch = useDispatch();

  console.log(jugador); //Borrar

  if (jugador.fase === 3) {
    setTimeout(() => {
      dispatch(setFase(0)); // Termina turno
      dispatch(setCartaPublica({}))
    }, 3000);
  }

  return (
    <div>
      <h2>{jugador.nombre}</h2>
      {(!jugador.iniciada && !jugador.id) ?
        <FinalizarPartida /> :
        (jugador.vivo) ?
          <div>
            <Mano />
            {(jugador.posicion === jugador.turnoPartida) ?
              <div>
                {(jugador.fase === 0) ?
                  <RobarCarta /> :
                  <div>
                    {(jugador.seleccion !== -1 || jugador.fase === 2) && <JugarCarta />}
                  </div>
                }
              </div> :
              <div>
                {jugador.fase === 3 &&
                  <Carta
                    id={jugador.cartaPublica.id}
                    imagen={jugador.cartaPublica.image} />
                }
              </div>}
          </div>
          : <h1>Estás Muerto jajaja</h1>
      }
    </div>
  );
}

export default Jugador;
