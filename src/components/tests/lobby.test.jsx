import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Lobby from "../home/lobby/lobby";
import {userEvent} from "@testing-library/user-event"
import { SnackbarProvider } from "notistack";
import { describe, expect, test, vi, afterEach} from "vitest";
import {render, screen, cleanup } from '@testing-library/react';
import configureStore from "redux-mock-store";
import axios from 'axios';

const initialState = {
  jugador: {
    partidaNombre: 'Fiesta',
    partidaId: 3,
    id: 2,
    jugadores: [
      { id: 5, name: 'Ernesto', turn: 0, alive: true },
      { id: 6, name: 'Gustavo', turn: 1, alive: true },
      { id: 8, name: 'Juan Carlos', turn: 2, alive: true },
      { id: 7, name: 'Elena', turn: 3, alive: true }],
    creador : true,
    minJugadores : 4
}}

const initialState1 = {
  jugador: {
    partidaNombre: 'Fiesta',
    partidaId: 3,
    id: 2,
    jugadores: [
      { id: 5, name: 'Ernesto', turn: 0, alive: true }],
    creador : true,
    minJugadores : 4
}}

const initialState2 = {
  jugador: {
    partidaNombre: 'Fiesta',
    partidaId: 3,
    id: 2,
    jugadores: [
      { id: 5, name: 'Ernesto', turn: 0, alive: true },
      { id: 6, name: 'Gustavo', turn: 1, alive: true },
      { id: 8, name: 'Juan Carlos', turn: 2, alive: true },
      { id: 7, name: 'Elena', turn: 3, alive: true }],
    creador : false,
    minJugadores : 4
}}

const mockStore = configureStore([]);

describe("Lobby Test", () => {

  afterEach(() => {
    vi.clearAllMocks();
    vi.resetAllMocks();
    cleanup();
  })

  test("Error al Iniciar Partida", async () => {

    const store = mockStore(initialState);
    
    vi.mock('axios');
    axios.put.mockRejectedValue({
      error: {
        message: 'Algo salio mal!',
      },
    });

    render(
    <Provider store={store}>
      <SnackbarProvider
        maxSnack={3}
        anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
        }}
      >
        <BrowserRouter>
          <Routes>
            <Route path="/" Component={Lobby} />
            <Route path="/partida" Component={null}/>
          </Routes>
        </BrowserRouter>
      </SnackbarProvider>
    </Provider>)
    const button = screen.queryByText("Iniciar Partida");
    expect(button.disabled).toBeFalsy();  
    await userEvent.click(button);
    const alerta = screen.queryByText("error: undefined");
    expect(alerta).toBeTruthy();
});

  test("Render", async () => {

    const store = mockStore(initialState);
    render(
    <Provider store={store}>
      <SnackbarProvider
        maxSnack={3}
        anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
        }}
      >
        <BrowserRouter>
          <Routes>
           <Route path="/" Component={Lobby} />
          </Routes>
        </BrowserRouter>
      </SnackbarProvider>
    </Provider>)

    expect(screen.queryByText('Fiesta')).toBeTruthy();
    expect(screen.queryByText('Jugadores (4):')).toBeTruthy();
  
    const playerNames = ['Ernesto', 'Gustavo', 'Juan Carlos', 'Elena'];

    playerNames.forEach((name) => {
      expect(screen.queryByText(name)).toBeTruthy();
    });
    
    const button = screen.queryByText("Abandonar Partida");
    expect(button).toBeTruthy();

    const button2 = screen.queryByText("Iniciar Partida");
    expect(button2).toBeTruthy();
  });

  test("Abandonar", async () => {
    const store = mockStore(initialState);
    render(
    <Provider store={store}>
      <SnackbarProvider
        maxSnack={3}
        anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
        }}
      >
        <BrowserRouter>
          <Routes>
           <Route path="/" Component={Lobby} />
          </Routes>
        </BrowserRouter>
      </SnackbarProvider>
    </Provider>)
    const button = screen.queryByText("Abandonar Partida");
    expect(button).toBeTruthy();
    await userEvent.click(button);

    expect(screen.queryByRole('Fiesta')).toBeFalsy();

  });

  test("No hay suficientes Jugadores", async () => {

    const store = mockStore(initialState1);
    render(
    <Provider store={store}>
      <SnackbarProvider
        maxSnack={3}
        anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
        }}
      >
        <BrowserRouter>
          <Routes>
           <Route path="/" Component={Lobby} />
          </Routes>
        </BrowserRouter>
      </SnackbarProvider>
    </Provider>)

    const button = screen.queryByText("Iniciar Partida");
    expect(button.disabled).toBeTruthy();
  });

  test("Jugador no es el creador", async () => {
    const store = mockStore(initialState2);
    render(
    <Provider store={store}>
      <SnackbarProvider
        maxSnack={3}
        anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
        }}
      >
        <BrowserRouter>
          <Routes>
           <Route path="/" Component={Lobby} />
          </Routes>
        </BrowserRouter>
      </SnackbarProvider>
    </Provider>)

    const button = screen.queryByText("Iniciar Partida");
    expect(button.disabled).toBeTruthy();
  });
  test("Iniciar Partida funcionando", async () => {

    vi.mock('axios');
    axios.put.mockResolvedValue({
      data: { random: "random"
      },
    });
    const store = mockStore(initialState);
    render(
    <Provider store={store}>
      <SnackbarProvider
        maxSnack={3}
        anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
        }}
        >
        <BrowserRouter>
          <Routes>
            <Route path="/" Component={Lobby} />
            <Route path="/partida" Component={null}/>
          </Routes>
        </BrowserRouter>
      </SnackbarProvider>
    </Provider>)
  
    const button = screen.queryByText("Iniciar Partida");
    expect(button.disabled).toBeFalsy();
    await userEvent.click(button);
  });

});