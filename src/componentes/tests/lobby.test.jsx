import TestRenderer from "react-test-renderer";
import { describe, expect, test } from "vitest";
import Lobby from "../home/lobby/lobby";

describe("Lobby Test", () => {
  test("Renderiza Lobby", () => {
    const elem = TestRenderer.create(<Lobby></Lobby>).toJSON();
    expect(elem).not.toBeNull;
  });
});
