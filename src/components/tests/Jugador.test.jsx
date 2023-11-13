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
    id: 2,
    vivo: false,
    iniciada: true,
    rol:"Humano",
    chat:["hola"]
},
rol: {
  lacosa: "La_Cosa",
  humano: "Humano",
  infectado: "Infectado",
}}
const initialState1 = {
  jugador: {
    partidaNombre: 'Fiesta',
    partidaId: 3,
    id: 2,
    vivo: true,
    iniciada: true,
    rol:"Humano",
    chat:["hola"]
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
}}

const mockStore = configureStore([]);

describe("Jugador Test", () => {
/*  test("Muerto", () => {
    const store = mockStore(initialState);

    render(
      <Provider store={store}>
        <BrowserRouter>
          <Jugador/>
        </BrowserRouter>
      </Provider>);
    console.log(screen.debug())
    expect(screen.queryByText("Estás Muerto")).toBeTruthy()
  });
*/

  test("Muerto", () => {
    /*
    const store = mockStore(initialState1);

    render(
      <Provider store={store}>
        <BrowserRouter>
          <Jugador/>
        </BrowserRouter>
      </Provider>);
    console.log(screen.debug())
    expect(screen.queryByText("Estás Muerto")).toBeTruthy()*/
  });
});
