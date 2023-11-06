import Home from "./home/Home";
import Jugador from "./partida/Jugador";
import { Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";

function AppRoutes() {
  const jugador = useSelector((state) => state.jugador);

   return (
      <Routes>
        <Route path="/" Component={Home} />
        <Route path="/partida" Component={Jugador} />
      </Routes>);
}

export default AppRoutes;
