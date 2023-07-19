<script setup>
defineProps({
  options: { type: Array, required: true },
});

defineEmits(["change"]);
</script>

<template>
  <div v-for="option in options" :key="option">
    <input
      :id="option"
      :value="option"
      name="estimate"
      type="radio"
      @change="$emit('change', option)"
    />
    <label :for="option">{{ option }}</label>
  </div>
</template>
