import TestRenderer from "react-test-renderer";
import { describe, expect, test } from "vitest";
import { Provider } from "react-redux";
import store from "../../store/store"
import Chat from "../chat/Chat";

describe("Chat Test", () => {
  test("Renderiza Chat", () => {
    const elem = TestRenderer.create(<Provider store={store}><Chat></Chat></Provider>).toJSON();
    expect(elem).not.toBeNull;
  });
});
