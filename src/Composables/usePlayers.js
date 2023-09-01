import { ref } from "vue";

export function usePlayers(awareness) {
  const players = ref(Array.from(awareness.getStates().entries()));

  awareness.on("change", () => {
    players.value = Array.from(awareness.getStates().entries());
  });

  const setPlayerProperty = (key, value) => {
    awareness.setLocalStateField(key, value);
  };

  return { players, setPlayerProperty };
}
