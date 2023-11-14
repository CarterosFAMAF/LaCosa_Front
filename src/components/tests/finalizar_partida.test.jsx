import { Provider } from "react-redux";
import { BrowserRouter} from "react-router-dom";
import FinalizarPartida from "../partida/finalizar_partida/FinalizarPartida";
import { describe, expect, test} from "vitest";
import {render, screen, cleanup} from '@testing-library/react';
import configureStore from "redux-mock-store";



const mockStore = configureStore([]);
describe("Finalizar Partida Test", () => {
  test("Renderiza Finalizar Partida", async () => {
    
    const initialState = {
      jugador: {
        jugadores: [
          { id: 5, name: 'Ernesto', turn: 0, alive: true, winner: true },
          { id: 6, name: 'Elena', turn: 0, alive: true, winner: false },
          { id: 6, name: 'Janina', turn: 0, alive: true, winner: false },
          { id: 6, name: 'Cleopatra', turn: 0, alive: true, winner: true }
        ],
      }
    };

    const store = mockStore(initialState);
    render(
      <Provider store={store}>
        <BrowserRouter>
            <FinalizarPartida/>
        </BrowserRouter>
      </Provider>);

    expect(screen.queryByText("La Partida ha terminado!")).toBeTruthy();
    expect(screen.queryByText("Ganadores: Ernesto, Cleopatra")).toBeTruthy();
    expect(screen.queryByRole('button', { name: "Volver al inicio"})).toBeTruthy();
    
    });
});
