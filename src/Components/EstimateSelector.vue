<script setup>
import { RadioGroup, RadioGroupLabel, RadioGroupOption } from "@headlessui/vue";

defineProps({
  options: { type: Array, required: true },
});

defineEmits(["change"]);
</script>

<template>
  <RadioGroup
    class="flex px-2 gap-x-4 overflow-x-auto shadow-inner rounded bg-gray-100 sm:grid sm:grid-cols-6 lg:flex sm:shadow-none sm:bg-gray-50 sm:justify-items-center"
    name="estimate"
    @update:model-value="$emit('change', $event)"
  >
    <RadioGroupLabel class="sr-only">Estimate</RadioGroupLabel>
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
          'flex items-center justify-center rounded-md shrink-0 text-lg sm:text-xl w-16 h-24 my-2 font-semibold uppercase',
        ]"
      >
        <RadioGroupLabel as="span">{{ option }}</RadioGroupLabel>
      </div>
    </RadioGroupOption>
  </RadioGroup>
</template>
