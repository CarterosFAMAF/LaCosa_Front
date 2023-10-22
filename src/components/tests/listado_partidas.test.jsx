import TestRenderer from "react-test-renderer";
import { Provider } from "react-redux";
import store from "../../store/store"
import { describe, expect, test } from "vitest";
import ListadoPartidas from "../home/listado_partidas/listado_partidas";

describe("listado_partidas Test", () => {
  test("Renderiza listado_partidas", () => {
    const elem = TestRenderer.create(<Provider store={store}><ListadoPartidas></ListadoPartidas></Provider>).toJSON();
    expect(elem).not.toBeNull;
  });
});