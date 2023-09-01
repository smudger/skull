import { afterEach, describe, expect, it, vi } from "vitest";
import { useYDoc } from "@/Composables/useYDoc.js";
import * as Y from "yjs";
import { WebrtcProvider } from "y-webrtc";

vi.mock("y-webrtc", () => {
  const WebrtcProvider = vi.fn();
  WebrtcProvider.prototype.awareness = vi.fn();

  return { WebrtcProvider };
});

describe("useYDoc", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("returns a Y.Doc instance", () => {
    const { ydoc } = useYDoc("test-room", "test-password", "https://test-url");
    expect(ydoc).toBeInstanceOf(Y.Doc);
    expect(WebrtcProvider).toHaveBeenCalledWith("test-room", ydoc, {
      signaling: ["https://test-url"],
      password: "test-password",
    });
  });

  it("uses the WebRTC provider on the Y.Doc instance", () => {
    const { ydoc } = useYDoc("test-room", "test-password", "https://test-url");
    expect(WebrtcProvider).toHaveBeenCalledWith("test-room", ydoc, {
      signaling: ["https://test-url"],
      password: "test-password",
    });
  });

  it("returns the awareness from the WebRTC provider", () => {
    const { awareness } = useYDoc(
      "test-room",
      "test-password",
      "https://test-url",
    );
    expect(awareness).toBe(WebrtcProvider.prototype.awareness);
  });
});
