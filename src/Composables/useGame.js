import { useYDoc } from "@/Composables/useYDoc.js";
import { useGameMap } from "@/Composables/useGameMap.js";
import { usePlayers } from "@/Composables/usePlayers.js";

export function useGame(room, password, signalingUrl) {
  const { ydoc, awareness } = useYDoc(room, password, signalingUrl);

  const { game, setGameProperty } = useGameMap(ydoc);
  const { players, setPlayerProperty } = usePlayers(awareness);

  return { game, setGameProperty, players, setPlayerProperty };
}
