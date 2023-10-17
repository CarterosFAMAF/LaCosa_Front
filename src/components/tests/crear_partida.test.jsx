import TestRenderer from "react-test-renderer";
import { describe, expect, test } from "vitest";
import { Provider } from "react-redux";
import store from "../../store/store"
import CrearPartida from "../home/crear_partida/crear_partida";

describe("Crear Partida Test", () => {
  test("Renderiza Crear Partida", () => {
    const elem = TestRenderer.create(<Provider store={store}><CrearPartida></CrearPartida></Provider>).toJSON();
    expect(elem).not.toBeNull;
  });
});
