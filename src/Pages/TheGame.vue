<script setup>
import { onMounted, ref, watch } from "vue";
import JoinGameModal from "@/Components/JoinGameModal.vue";
import PokerTable from "@/Components/PokerTable.vue";
import ControlPanel from "@/Components/ControlPanel.vue";
import { useYDoc } from "@/Composables/useYDoc.js";

const props = defineProps({
  id: { type: String, required: true },
  code: { type: String, required: true },
});

const { ydoc, awareness } = useYDoc(props.id, props.code);

const ygame = ydoc.getMap("game");

onMounted(() => {
  if (ygame.get("state") === undefined) {
    ygame.set("state", "estimating");
  }
});

const game = ref(ygame.toJSON());

ygame.observe(() => {
  game.value = ygame.toJSON();
});

const setGameProperty = (key, value) => {
  ygame.set(key, value);
};

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

const players = ref(Array.from(awareness.getStates().entries()));
const me = ref(awareness.getLocalState());

awareness.on("change", () => {
  me.value = awareness.getLocalState();
  players.value = Array.from(awareness.getStates().entries());
});

const setEstimate = (estimate) => {
  awareness.setLocalStateField("estimate", estimate);
};

const showJoinGameModal = ref(true);

const joinGame = (name) => {
  awareness.setLocalStateField("name", name);
  showJoinGameModal.value = false;
};
</script>

<template>
  <div class="bg-gray-50 min-h-screen h-full pt-4 pb-72">
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
