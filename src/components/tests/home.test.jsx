import TestRenderer from "react-test-renderer";
import { describe, expect, test } from "vitest";
import Home from "../home/Home";

describe("Home Test", () => {
  test("Renderiza Home", () => {
    const elem = TestRenderer.create(<Home></Home>).toJSON();
    expect(elem).not.toBeNull;
  });
});
