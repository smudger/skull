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
  <div
    class="fixed bottom-0 inset-x-0 flex items-center sm:items-end sm:justify-center flex-col sm:flex-row bg-gray-50 p-4 space-y-2 sm:space-y-0"
  >
    <div v-if="gameState === 'estimating'" class="max-w-full sm:mr-4">
      <EstimateSelector
        :options="estimateOptions"
        @change="$emit('estimate-changed', $event)"
      />
    </div>
    <div
      class="flex sm:flex-col w-full sm:w-auto space-x-4 sm:space-x-0 sm:gap-y-4 justify-center sm:justify-end"
    >
      <button
        class="w-1/2 sm:w-32 rounded-md bg-indigo-50 px-3.5 py-2.5 text-sm font-semibold text-indigo-600 shadow-sm hover:bg-indigo-100"
        data-test="copy-game-link"
        type="button"
        @click="copyGameLinkToClipboard"
      >
        Copy Link
      </button>
      <div class="w-1/2 sm:w-32 sm:mb-2">
        <button
          v-if="gameState === 'estimating'"
          class="w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          data-test="reveal-cards"
          type="button"
          @click="$emit('reveal-cards')"
        >
          Reveal
        </button>
        <button
          v-if="gameState === 'showing'"
          class="w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          data-test="reset-game"
          type="button"
          @click="$emit('reset-game')"
        >
          Reset
        </button>
      </div>
    </div>
  </div>
</template>
