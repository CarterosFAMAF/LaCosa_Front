import TestRenderer from "react-test-renderer";
import { Provider } from "react-redux";
import { describe, expect, test } from "vitest";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Jugador from "../partida/Jugador";
import store from "../../store/store"

describe("Jugador Test", () => {
  test("Renderiza Jugador", () => {
    const elem = TestRenderer.create(
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={null} />
          <Route path="/partida" element={Jugador} />
        </Routes>
      </BrowserRouter>
    </Provider>).toJSON();
    expect(elem).not.toBeNull;
  });
});