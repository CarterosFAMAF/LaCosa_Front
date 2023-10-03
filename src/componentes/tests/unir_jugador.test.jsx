import TestRenderer from "react-test-renderer";
import { describe, expect, test } from "vitest";
import UnirJugador from "../home/unir_Jugador/unir_jugador";

describe("Unir Jugador Test", () => {
  test("Renderiza Unir Jugador", () => {
    const elem = TestRenderer.create(<UnirJugador></UnirJugador>).toJSON();
    expect(elem).not.toBeNull;
  });
});
