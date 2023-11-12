import TestRenderer from "react-test-renderer";
import { describe, expect, test } from "vitest";
import { Provider } from "react-redux";
import store from "../../store/store"
import BotonFinalizar from "../partida/boton_finalizar/BotonFinalizar";

describe("BotonFinalizar Test", () => {
  test("Renderiza BotonFinalizar", () => {
    const elem = TestRenderer.create(<Provider store={store}><BotonFinalizar></BotonFinalizar></Provider>).toJSON();
    expect(elem).not.toBeNull;
  });
});
