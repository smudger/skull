<script setup>
import EstimateSelector from "@/Components/EstimateSelector.vue";

defineProps({
  gameState: { type: String, required: true },
  estimateOptions: { type: Array, required: true },
});

defineEmits(["estimate-changed"]);
</script>
<template>
  <div v-show="gameState === 'estimating'">
    <EstimateSelector
      :options="estimateOptions"
      @change="$emit('estimate-changed', $event)"
    />
  </div>
</template>
