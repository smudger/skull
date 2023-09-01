import { describe, expect, it } from "vitest";
import * as Y from "yjs";
import { useGameMap } from "@/Composables/useGameMap.js";

const ydoc = new Y.Doc();

describe("useGameMap", () => {
  it("returns a ref to the ydoc game map", () => {
    ydoc.getMap("game").set("test-key", "test-value");

    const { game } = useGameMap(ydoc);

    expect(game.value).toEqual({
      "test-key": "test-value",
    });
  });

  it("updates the game when the ydoc game map updates", () => {
    ydoc.getMap("game").set("test-key", "test-value");

    const { game } = useGameMap(ydoc);

    expect(game.value).toEqual({
      "test-key": "test-value",
    });

    ydoc.getMap("game").set("test-key", "test-value-2");

    expect(game.value).toEqual({
      "test-key": "test-value-2",
    });
  });

  it("provides a function to update a property on the ydoc game map", () => {
    ydoc.getMap("game").set("test-key", "test-value");

    const { game, setGameProperty } = useGameMap(ydoc);

    setGameProperty("test-key", "test-value-2");

    expect(ydoc.getMap("game").toJSON()).toEqual({
      "test-key": "test-value-2",
    });
    expect(game.value).toEqual({
      "test-key": "test-value-2",
    });
  });
});
