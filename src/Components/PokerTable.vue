<script setup>
import PokerPlayer from "@/Components/PokerPlayer.vue";

defineProps({
  players: { type: Array, required: true },
  showEstimates: { type: Boolean, required: true },
});
</script>

<template>
  <ul>
    <li v-for="[playerId, player] in players" :key="playerId">
      <PokerPlayer
        :estimate="player.estimate"
        :name="player.name"
        :show-estimate="showEstimates"
      />
    </li>
  </ul>
</template>
