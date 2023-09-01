import * as Y from "yjs";
import { WebrtcProvider } from "y-webrtc";

export function useYDoc(room, password, signalingUrl) {
  const ydoc = new Y.Doc();

  const provider = new WebrtcProvider(room, ydoc, {
    signaling: [signalingUrl],
    password,
  });

  return { ydoc, awareness: provider.awareness };
}
