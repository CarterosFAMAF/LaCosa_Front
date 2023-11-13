import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import ElegirCarta from "../partida/elegir_carta/ElegirCarta";
import { describe, expect, test, afterEach, vi } from "vitest";
import {render, screen, cleanup } from '@testing-library/react';
import {userEvent} from "@testing-library/user-event"
import axios from 'axios';


const generateInitialState = (customCartas, fase, opcionesDefensivas) => ({
  jugador: {
    cartas: customCartas,
    opcionesDefensivas : opcionesDefensivas,
    turnoPartida: 0,
    fase: fase,
    partidaId: 2,
    jugadorid: 1,
    seleccion: 1,
    seleccionType: "Accion",
    jugadores: [
      { id: 5, name: 'Ernesto', turn: 0, alive: true },
      { id: 6, name: 'Gustavo', turn: 1, alive: true },
      { id: 8, name: 'Juan Carlos', turn: 2, alive: true },
      { id: 7, name: 'Elena', turn: 3, alive: true },
    ],
  },
  fase: {
    robo: 1,
    juego: 2,
    objetivo: 3,
    defensa: 4,
    resultado: 5,
    intercambio: 6,
  },
  typecard: {
    accion: "Accion",
    defensa: "Defensa",
    panico: "Panico",
    lacosa: "La_Cosa",
    infectado: "Infectado",
  },
  rol: {
    lacosa: "La_Cosa",
    humano: "Humano",
    infectado: "Infectado",
  },
});

const mockStore = configureStore([]);

describe("ElegirCarta Test", () => {

  afterEach(() => {
    vi.clearAllMocks();
    vi.resetAllMocks();
    cleanup();
  })

  test("Fase 2 (Juego) Con carta de acción", async () => {

    const initialState = generateInitialState([
      { id: 1, name: "lanzallamas", image:"a", type: "accion" },
      { id: 2, name: "Mas_Vale_Que_Corras", image:"a", type: "accion"},
      { id: 3, name: "Sospecha", image:"a", type : "accion" },
    ], 2, []);
    const store = mockStore(initialState);

    render(
      <Provider store={store}>
        <ElegirCarta />
      </Provider>
    );
    
    const botonJugar = screen.queryByRole("button", {name: "Jugar"});
    const botonDescartar = screen.queryByRole("button", {name: "Descartar"});

    expect(botonJugar).toBeTruthy();
    expect(botonDescartar).toBeTruthy();

    await userEvent.click(botonJugar);
    
    expect(screen.queryByRole("button")).toBeFalsy();
  });

  test("Fase 2 (Juego) Con carta de Panico", async () => {

    const initialState = generateInitialState([
      { id: 1, name: "panico", image:"a", type: "Panico" },
      { id: 2, name: "Mas_Vale_Que_Corras", image:"a", type: "accion"},
      { id: 3, name: "Sospecha", image:"a", type : "accion" },
    ], 2, []);
    const store = mockStore(initialState);

    render(
      <Provider store={store}>
        <ElegirCarta />
      </Provider>
    );
    
    const botonPanico = screen.queryByRole("button", {name: "Pánico!!!!"});

    expect(botonPanico).toBeTruthy();

    await userEvent.click(botonPanico);

    expect(screen.queryByRole("button")).toBeFalsy();

  });

  test("Fase 4 (defensa)", async () => {
    vi.mock('axios');
    axios.put.mockResolvedValue({data: {}})
    axios.get.mockResolvedValue({
      data: {
        respuesta: "random"
      }
    });

    const initialState = generateInitialState([
      { id: 1, name: "Defensa", image:"a", type: "Defensa" },
      { id: 2, name: "Mas_Vale_Que_Corras", image:"a", type: "accion"},
      { id: 3, name: "Sospecha", image:"a", type : "accion" },
    ], 4, [1]);
    const store = mockStore(initialState);

    render(
      <Provider store={store}>
        <ElegirCarta />
      </Provider>
    );
    
    const botonNoDefender = screen.queryByRole("button", {name: "No Defender"});
    expect(botonNoDefender).toBeTruthy();


    const botonDefender = screen.queryByRole("button", {name: "Defender"});
    expect(botonDefender).toBeTruthy();

    await userEvent.click(botonDefender);

    expect(screen.queryByRole("button")).toBeFalsy();
  });

  test("Fase 3 (objetivo)", async () => {
    vi.mock('axios');
    axios.put.mockResolvedValue({data: {}})

    const initialState = generateInitialState([
      { id: 1, name: "lanzallamas", image:"a", type: "accion" },
      { id: 2, name: "Mas_Vale_Que_Corras", image:"a", type: "accion"},
      { id: 3, name: "Sospecha", image:"a", type : "accion" },
    ], 3, []);
    const store = mockStore(initialState);

    render(
      <Provider store={store}>
        <ElegirCarta />
      </Provider>
    );
    
    const botonAdyacente1 = screen.queryByRole("button", {name: "Gustavo"});
    expect(botonAdyacente1).toBeTruthy();


    const botonAdyacente2 = screen.queryByRole("button", {name: "Elena"});
    expect(botonAdyacente2).toBeTruthy();

    await userEvent.click(botonAdyacente1);

    expect(screen.queryByRole("button")).toBeFalsy();
  });


});