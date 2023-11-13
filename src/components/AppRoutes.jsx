import Home from "./home/Home";
import "./Estilos.css";
import Jugador from "./partida/Jugador";
import { Route, Routes } from "react-router-dom";

function AppRoutes() {
   return (
      <Routes>
        <Route path="/" Component={Home} />
        <Route path="/partida" Component={Jugador} />
      </Routes>);
}

export default AppRoutes;
