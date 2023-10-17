import TestRenderer from "react-test-renderer";
import { Provider } from "react-redux";
import store from "../../store/store"
import { describe, expect, test } from "vitest";
import Home from "../home/Home";

describe("Home Test", () => {
  test("Renderiza Home", () => {
    const elem = TestRenderer.create(<Provider store={store}><Home></Home></Provider>).toJSON();
    expect(elem).not.toBeNull;
  });
});
