<script setup>
import PokerPlayer from "@/Components/PokerPlayer.vue";

defineProps({
  players: { type: Array, required: true },
  showEstimates: { type: Boolean, required: true },
});
</script>

<template>
  <ul
    class="w-full flex flex-col justify-between items-center gap-4 sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6"
  >
    <li v-for="[playerId, player] in players" :key="playerId" class="mx-auto">
      <PokerPlayer
        :estimate="player.estimate"
        :name="player.name"
        :show-estimate="showEstimates"
      />
    </li>
  </ul>
</template>
