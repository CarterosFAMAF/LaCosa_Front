import TestRenderer from "react-test-renderer";
import { describe, expect, test } from "vitest";
import { Provider } from "react-redux";
import store from "../../store/store"
import Carta from "../partida/carta/Carta";

describe("Carta Test", () => {
  test("Renderiza Carta", () => {
    const elem = TestRenderer.create(<Provider store={store}><Carta></Carta></Provider>).toJSON();
    expect(elem).not.toBeNull;
  });
});
