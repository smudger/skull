<script setup>
import { RadioGroup, RadioGroupLabel, RadioGroupOption } from "@headlessui/vue";

defineProps({
  options: { type: Array, required: true },
});

defineEmits(["change"]);
</script>

<template>
  <RadioGroup
    class="mt-2"
    name="estimate"
    @update:model-value="$emit('change', $event)"
  >
    <RadioGroupLabel class="sr-only">Estimate</RadioGroupLabel>
    <div class="grid grid-cols-3 gap-3 sm:grid-cols-6">
      <RadioGroupOption
        v-for="option in options"
        :key="option"
        v-slot="{ active, checked }"
        :value="option"
        as="template"
      >
        <div
          :class="[
            'cursor-pointer focus:outline-none',
            active ? 'ring-2 ring-indigo-600 ring-offset-2' : '',
            checked
              ? 'bg-indigo-600 text-white hover:bg-indigo-500'
              : 'ring-1 ring-inset ring-gray-300 bg-white text-gray-900 hover:bg-gray-50',
            'flex items-center justify-center rounded-md py-3 px-3 text-sm font-semibold uppercase sm:flex-1',
          ]"
        >
          <RadioGroupLabel as="span">{{ option }}</RadioGroupLabel>
        </div>
      </RadioGroupOption>
    </div>
  </RadioGroup>
</template>
