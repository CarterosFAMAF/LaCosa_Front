import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ReactDOM from "react-dom/client";
import Home from "./componentes/home/Home";
import Jugador from "./componentes/jugador/Jugador";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" Component={Home}/>
      <Route path="/jugador" Component={Jugador}/>
    </Routes>
  </BrowserRouter>
);