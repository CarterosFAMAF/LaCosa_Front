import "./Home.css";
import CrearPartida from "./crear_partida/crear_partida";
import Listado_Partidas from "./listado_partidas/listado_partidas";
import Lobby from "./lobby/lobby";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { useEffect } from "react";

function Home() {
  const jugador = useSelector((state) => state.jugador);
  const navigate = useNavigate();

  useEffect(() => {
    if (jugador.iniciada) {
      navigate("/partida");
    }
  }, [jugador.iniciada]);

  return (
    <div>
      <header className="titulo">
        <h1>La Cosa Web</h1>
        <h2>¡Bienvenido!</h2>
      </header>

      <CrearPartida />

      <Listado_Partidas/>

      {jugador.unido && <Lobby />}
    </div>
  );
}

export default Home;


