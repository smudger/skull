import * as Y from "yjs";
import { WebrtcProvider } from "y-webrtc";

export function useYDoc(room, password) {
  const ydoc = new Y.Doc();

  const provider = new WebrtcProvider(room, ydoc, {
    signaling: [import.meta.env.VITE_SIGNALING_URL],
    password,
  });

  return { ydoc, awareness: provider.awareness };
}
