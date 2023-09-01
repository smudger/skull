import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { useYDoc } from "@/Composables/useYDoc.js";
import * as Y from "yjs";
import { WebrtcProvider } from "y-webrtc";

describe("useYDoc", () => {
  beforeEach(() => {
    vi.mock("y-webrtc", () => {
      const WebrtcProvider = vi.fn();
      WebrtcProvider.prototype.awareness = vi.fn();

      return { WebrtcProvider };
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("returns a Y.Doc instance", () => {
    const { ydoc } = useYDoc("test-room", "test-password");
    expect(ydoc).toBeInstanceOf(Y.Doc);
    expect(WebrtcProvider).toHaveBeenCalledWith("test-room", ydoc, {
      signaling: [import.meta.env.VITE_SIGNALING_URL],
      password: "test-password",
    });
  });

  it("uses the WebRTC provider on the Y.Doc instance", () => {
    const { ydoc } = useYDoc("test-room", "test-password");
    expect(WebrtcProvider).toHaveBeenCalledWith("test-room", ydoc, {
      signaling: [import.meta.env.VITE_SIGNALING_URL],
      password: "test-password",
    });
  });

  it("returns the awareness from the WebRTC provider", () => {
    const { awareness } = useYDoc("test-room", "test-password");
    expect(awareness).toBe(WebrtcProvider.prototype.awareness);
  });
});
