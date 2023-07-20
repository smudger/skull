<script setup>
import EstimateSelector from "@/Components/EstimateSelector.vue";

defineProps({
  gameState: { type: String, default: undefined },
  estimateOptions: { type: Array, required: true },
});

defineEmits(["estimate-changed", "reveal-cards", "reset-game"]);

const copyGameLinkToClipboard = () => {
  navigator.clipboard.writeText(window.location.href);
};
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
  <button
    class="rounded-md bg-indigo-50 px-3.5 py-2.5 text-sm font-semibold text-indigo-600 shadow-sm hover:bg-indigo-100"
    data-test="copy-game-link"
    type="button"
    @click="copyGameLinkToClipboard"
  >
    Copy Game Link
  </button>
</template>
