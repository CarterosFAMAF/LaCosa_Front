import TestRenderer from "react-test-renderer";
import { Provider } from "react-redux";
import store from "../../store/store"
import { describe, expect, test } from "vitest";
import Mano from "../partida/mano/Mano";

import Lanzallamas from "/Lanzallamas.png?url";

describe("Mano Test", () => {
  const cartas = [{ id: 0, imagen: Lanzallamas }];
  test("Renderiza Mano", () => {
    const elem = TestRenderer.create(<Provider store={store}><Mano cartas={cartas}></Mano></Provider>).toJSON();
    expect(elem).not.toBeNull;
  });
});
