import { ref } from "vue";

export function useGameMap(ydoc) {
  const ygame = ydoc.getMap("game");

  const game = ref(ygame.toJSON());

  ygame.observe(() => {
    game.value = ygame.toJSON();
  });

  const setGameProperty = (key, value) => {
    ygame.set(key, value);
  };

  return { game, setGameProperty };
}
