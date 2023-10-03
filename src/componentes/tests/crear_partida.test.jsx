import TestRenderer from "react-test-renderer";
import { describe, expect, test } from "vitest";
import CrearPartida from "../home/crear_partida/crear_partida";

describe("Crear Partida Test", () => {
  test("Renderiza Crear Partida", () => {
    const elem = TestRenderer.create(<CrearPartida></CrearPartida>).toJSON();
    expect(elem).not.toBeNull;
  });
});
