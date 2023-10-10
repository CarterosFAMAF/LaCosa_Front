import TestRenderer from "react-test-renderer";
import { Provider } from "react-redux";
import store from "../../store/store"
import { describe, expect, test } from "vitest";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import FinalizarPartida from "../partida/finalizar_partida/finalizar_partida";

describe("Finalizar Partida Test", () => {
  test("Renderiza Finalizar Partida", () => {
    const elem = TestRenderer.create(
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/partida" Component={FinalizarPartida} />
        </Routes>
      </BrowserRouter>
    </Provider>).toJSON();
    expect(elem).not.toBeNull;
  });
});
