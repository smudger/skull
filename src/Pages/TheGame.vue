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

const joinGame = (player) => {
  setPlayerProperty("name", player.name);
  showJoinGameModal.value = false;
};

const decks = [
  {
    name: "Pink",
    bgColor: "bg-pink-500",
    selectedColor: "ring-pink-500",
    isAssigned: true,
  },
  {
    name: "Purple",
    bgColor: "bg-purple-500",
    selectedColor: "ring-purple-500",
    isAssigned: false,
  },
  {
    name: "Blue",
    bgColor: "bg-blue-500",
    selectedColor: "ring-blue-500",
    isAssigned: false,
  },
  {
    name: "Green",
    bgColor: "bg-green-500",
    selectedColor: "ring-green-500",
    isAssigned: true,
  },
  {
    name: "Yellow",
    bgColor: "bg-yellow-500",
    selectedColor: "ring-yellow-500",
    isAssigned: false,
  },
  {
    name: "Orange",
    bgColor: "bg-orange-500",
    selectedColor: "ring-orange-500",
    isAssigned: false,
  },
];
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
    <JoinGameModal :show="showJoinGameModal" :decks="decks" @join="joinGame" />
  </div>
</template>
