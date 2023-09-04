<script setup>
import { onMounted, ref, watch } from "vue";
import JoinGameModal from "@/Components/JoinGameModal.vue";
import PokerTable from "@/Components/PokerTable.vue";
import ControlPanel from "@/Components/ControlPanel.vue";
import { useGame } from "@/Composables/useGame.js";

const props = defineProps({
  id: { type: String, required: true },
  code: { type: String, required: true },
});

const { game, setGameProperty, players, setPlayerProperty } = useGame(
  props.id,
  props.code,
  import.meta.env.VITE_SIGNALING_URL,
);

onMounted(() => {
  if (game.value.state === undefined) {
    setGameProperty("state", "estimating");
  }
});

watch(
  () => game.value.state,
  (state) => {
    switch (state) {
      case "estimating":
        resetGame();
        break;
    }
  },
);

const resetGame = () => {
  setEstimate(undefined);
};

const setEstimate = (estimate) => {
  setPlayerProperty("estimate", estimate);
};

const showJoinGameModal = ref(true);

const joinGame = (name) => {
  setPlayerProperty("name", name);
  showJoinGameModal.value = false;
};
</script>

<template>
  <div class="bg-gray-900 min-h-screen h-full pt-4 pb-72">
    <PokerTable :players="players" :show-estimates="game.state === 'showing'" />
    <ControlPanel
      :estimate-options="[0, 0.5, 1, 2, 3, 5, 8, 13, 20, 40, 100, '?']"
      :game-state="game.state"
      @estimate-changed="setEstimate"
      @reveal-cards="setGameProperty('state', 'showing')"
      @reset-game="setGameProperty('state', 'estimating')"
    />
    <JoinGameModal :show="showJoinGameModal" @join="joinGame" />
  </div>
</template>
