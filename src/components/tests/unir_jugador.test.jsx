import TestRenderer from "react-test-renderer";
import { Provider } from "react-redux";
import store from "../../store/store"
import { describe, expect, test } from "vitest";
import UnirJugador from "../home/unir_Jugador/unir_jugador";

describe("Unir Jugador Test", () => {
  test("Renderiza Unir Jugador", () => {
    const elem = TestRenderer.create(<Provider store={store}><UnirJugador></UnirJugador></Provider>).toJSON();
    expect(elem).not.toBeNull;
  });
});
