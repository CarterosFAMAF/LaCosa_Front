import TestRenderer from "react-test-renderer";
import { Provider } from "react-redux";
import { describe, expect, test } from "vitest";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../home/Home";
import store from "../../store/store"

describe("Home Test", () => {
  test("Renderiza Home", () => {
    const elem = TestRenderer.create(
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={null} />
          <Route path="/partida" element={Home} />
        </Routes>
      </BrowserRouter>
    </Provider>).toJSON();
    expect(elem).not.toBeNull;
  });
});