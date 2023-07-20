<script setup>
import EstimateSelector from "@/Components/EstimateSelector.vue";

defineProps({
  gameState: { type: String, required: true },
  estimateOptions: { type: Array, required: true },
});

defineEmits(["estimate-changed", "reveal-cards", "reset-game"]);
</script>
<template>
  <div v-show="gameState === 'estimating'">
    <EstimateSelector
      :options="estimateOptions"
      @change="$emit('estimate-changed', $event)"
    />
  </div>
  <button
    v-if="gameState === 'estimating'"
    class="rounded-md bg-indigo-50 px-3.5 py-2.5 text-sm font-semibold text-indigo-600 shadow-sm hover:bg-indigo-100"
    data-test="reveal-cards"
    type="button"
    @click="$emit('reveal-cards')"
  >
    Reveal
  </button>
  <button
    v-if="gameState === 'showing'"
    class="rounded-md bg-indigo-50 px-3.5 py-2.5 text-sm font-semibold text-indigo-600 shadow-sm hover:bg-indigo-100"
    data-test="reset-game"
    type="button"
    @click="$emit('reset-game')"
  >
    Reset
  </button>
</template>
