import TestRenderer from "react-test-renderer";
import { Provider } from "react-redux";
import store from "../../store/store"
import { describe, expect, test } from "vitest";
import RobarCarta from "../partida/robar/RobarCarta";

describe("RobarCarta Test", () => {
  test("Renderiza RobarCarta", () => {
    const elem = TestRenderer.create(<Provider store={store}><RobarCarta></RobarCarta></Provider>).toJSON();
    expect(elem).not.toBeNull;
  });
});
