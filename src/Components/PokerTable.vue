<script setup>
defineProps({
  players: { type: Array, required: true },
  showEstimates: { type: Boolean, required: true },
});
</script>

<template>
  <ul>
    <li v-for="[playerId, player] in players" :key="playerId">
      {{ player.name || "Anonymous"
      }}<span v-if="showEstimates"
        >: {{ player.estimate || "Didn't Guess!" }}</span
      >
    </li>
  </ul>
</template>
