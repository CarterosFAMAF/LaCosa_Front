import TestRenderer from "react-test-renderer";
import { Provider } from "react-redux";
import store from "../../store/store"
import { describe, expect, test } from "vitest";
import Jugador from "../jugador/Jugador";

describe("Jugador Test", () => {
  test("Renderiza Jugador", () => {
    const elem = TestRenderer.create(<Provider store={store}><Jugador></Jugador></Provider>).toJSON();
    expect(elem).not.toBeNull;
  });
});
