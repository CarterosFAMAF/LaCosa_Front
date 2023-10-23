import TestRenderer from "react-test-renderer";
import { Provider } from "react-redux";
import store from "../../store/store"
import { describe, expect, test } from "vitest";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Lobby from "../home/lobby/lobby";

// Ruta incorrecta. REVISAR!
describe("Lobby Test", () => {
  test("Renderiza Lobby", () => {
    const elem = TestRenderer.create(
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" Component={Lobby} />
        </Routes>
      </BrowserRouter>
    </Provider>).toJSON();
    expect(elem).not.toBeNull;
  });
});