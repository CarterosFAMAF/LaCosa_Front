import Home from "./home/Home";
import Jugador from "./partida/Jugador";
import { Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { useEffect } from "react";


function AppRoutes() {
  const jugador = useSelector((state) => state.jugador);
  const navigate = useNavigate();

  useEffect(() => {
    if (jugador.iniciada) {
      navigate("/partida");
    }
  }, [jugador.iniciada]);

   return (
      <Routes>
        <Route path="/" Component={Home} />
        <Route path="/partida" Component={Jugador} />
      </Routes>);
}

export default AppRoutes;
