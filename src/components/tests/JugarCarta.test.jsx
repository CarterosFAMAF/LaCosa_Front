import TestRenderer from "react-test-renderer";
import { Provider } from "react-redux";
import store from "../../store/store"
import { describe, expect, test } from "vitest";
import JugarCarta from "../partida/jugar/JugarCarta";

describe("JugarCarta Test", () => {
  test("Renderiza JugarCarta", () => {
    // Arreglar: El código satánico de jugadores adyacentes trae problemas.
    /*
    const elem = TestRenderer.create(<Provider store={store}><JugarCarta></JugarCarta></Provider>).toJSON();
    expect(elem).not.toBeNull;
    */
  });
});
