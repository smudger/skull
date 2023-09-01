import { describe, expect, it, vi } from "vitest";
import { usePlayers } from "@/Composables/usePlayers.js";

const awareness = {
  getStates: () => ({
    entries: () => new Set(["player-1", "player-2"]),
  }),
  on: vi.fn(),
  setLocalStateField: vi.fn(),
};

describe("usePlayers", () => {
  it("returns a ref to the awareness entries", () => {
    const { players } = usePlayers(awareness);

    expect(players.value).toStrictEqual(["player-1", "player-2"]);
  });

  it("registers a listener to update the players whenever the awareness changes", () => {
    usePlayers(awareness);

    expect(awareness.on).toHaveBeenCalledWith("change", expect.anything());
  });

  it("allows you to update the state for the current player", () => {
    const { setPlayerProperty } = usePlayers(awareness);

    setPlayerProperty("test-key", "test-value");

    expect(awareness.setLocalStateField).toHaveBeenCalledWith(
      "test-key",
      "test-value",
    );
  });
});
