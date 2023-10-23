import TestRenderer from "react-test-renderer";
import { Provider } from "react-redux";
import { describe, expect, test } from "vitest";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import configureStore from "redux-mock-store";
import FinalizarPartida from "../partida/finalizar_partida/finalizar_partida";

const mockStore = configureStore([]);
describe("Finalizar Partida Test", () => {
  test("Renderiza Finalizar Partida", () => {
    
    const initialState = {
      jugador: {
        jugadores: [
          { id: 5, name: 'Ernesto', turn: 0, alive: true },
        ],
      }
    };

    const store = mockStore(initialState);
    const elem = TestRenderer.create(
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" Component={null} />
          <Route path="/partida" Component={FinalizarPartida} />
        </Routes>
      </BrowserRouter>
    </Provider>).toJSON();
    expect(elem).not.toBeNull;
  });
});
