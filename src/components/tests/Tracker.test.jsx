import TestRenderer from "react-test-renderer";
import { describe, expect, test } from "vitest";
import { Provider } from "react-redux";
import store from "../../store/store"
import Tracker from "../partida/tracker/Tracker";

describe("Tracker Test", () => {
  test("Renderiza Tracker", () => {
    const elem = TestRenderer.create(<Provider store={store}><Tracker></Tracker></Provider>).toJSON();
    expect(elem).not.toBeNull;
  });
});
