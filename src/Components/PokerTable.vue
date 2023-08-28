<script setup>
import PokerPlayer from "@/Components/PokerPlayer.vue";
import { computed } from "vue";

const props = defineProps({
  players: { type: Array, required: true },
  showEstimates: { type: Boolean, required: true },
});

const estimates = computed(() => {
  return props.players
    .map(([, player]) => player.estimate)
    .filter((estimate) => estimate !== undefined)
    .filter((estimate, index, arr) => arr.indexOf(estimate) === index);
});
const lowestEstimate = computed(() => {
  return estimates.value.length > 1 && props.showEstimates
    ? Math.min(...estimates.value)
    : undefined;
});
const highestEstimate = computed(() => {
  return estimates.value.length > 1 && props.showEstimates
    ? Math.max(...estimates.value)
    : undefined;
});
</script>

<template>
  <ul
    class="w-full flex flex-col justify-between items-center gap-4 sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6"
  >
    <li v-for="[playerId, player] in players" :key="playerId" class="mx-auto">
      <PokerPlayer
        :estimate="player.estimate"
        :is-highest="!!player.estimate && player.estimate === highestEstimate"
        :is-lowest="!!player.estimate && player.estimate === lowestEstimate"
        :name="player.name"
        :show-estimate="showEstimates"
      />
    </li>
  </ul>
</template>
