import "./Home.css";
import UnirJugador from "./unir_Jugador/unir_jugador";
import CrearPartida from "./crear_partida/crear_partida";
import Lobby from "./lobby/lobby";
import { useSelector } from "react-redux";

function Home() {
  const jugador = useSelector((state) => state.jugador);

  return (
    <div className="container">
      <header className="titulo">
        <h1>La Cosa Web</h1>
        <h2>¡Bienvenido!</h2>
      </header>

      <CrearPartida />

      <UnirJugador />

      {jugador.unido && <Lobby />}
    </div>
  );
}

export default Home;
