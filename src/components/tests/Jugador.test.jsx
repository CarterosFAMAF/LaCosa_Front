import { BrowserRouter, Route, Routes } from "react-router-dom";
import Jugador from "../partida/Jugador";
import store from "../../store/store"


import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { describe, expect, test, afterEach, vi } from "vitest";
import {render, screen, cleanup } from '@testing-library/react';

const initialState = {
  jugador: {
    partidaNombre: 'Fiesta',
    partidaId: 3,
    id: 1,
    vivo: false,
    cartas: [
      { id: 1, name: "lanzallamas", image:"a", type: "accion" },
      { id: 2, name: "Mas_Vale_Que_Corras", image:"a", type: "accion"},
      { id: 3, name: "Sospecha", image:"a", type : "accion" },
    ],
    iniciada: true,
    rol:"Humano",
    chat:["hola"],
    turnoPartida:1,
    jugadores: [
      { id: 1, name: 'Ernesto', turn: 0, alive: false, quarantine:0 },
      { id: 6, name: 'Gustavo', turn: 1, alive: true,quarantine:0 },
      { id: 8, name: 'Juan Carlos', turn: 2, alive: true, quarantine:0 },
      { id: 7, name: 'Elena', turn: 3, alive: true,quarantine:0 },
    ]
  },
  rol: {
    lacosa: "La_Cosa",
    humano: "Humano",
    infectado: "Infectado",
  },
  fase: {
    robo: 1,
    juego: 2,
    objetivo: 3,
    defensa: 4,
    resultado: 5,
    intercambio: 6,
},
"typemessage": {
    user: 0,
    system: 1,
    infeccion: 2,
    defense: 3,
    quarantine: 4
  }}

const mockStore = configureStore([]);

describe("Jugador Test", () => {
test("Muerto", () => {
    const store = mockStore(initialState);

    render(
      <Provider store={store}>
        <BrowserRouter>
          <Jugador/>
        </BrowserRouter>
      </Provider>);
    expect(screen.queryByText("Estás Muerto")).toBeTruthy()
  });
})