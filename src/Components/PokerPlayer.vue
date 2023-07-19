<script setup>
import { computed } from "vue";
import { minidenticon } from "minidenticons";

const props = defineProps({
  name: { type: String, default: undefined },
  estimate: { type: [String, Number], default: undefined },
  showEstimate: { type: Boolean, required: true },
});

const avatar = computed(
  () =>
    "data:image/svg+xml;utf8," + encodeURIComponent(minidenticon(props.name)),
);
</script>

<template>
  <div
    class="rounded-2xl justify-between flex w-72 items-center bg-gray-800 px-6 py-4 space-x-2"
  >
    <h3
      class="text-base font-semibold leading-7 tracking-tight text-white whitespace-nowrap truncate"
    >
      {{ name }}
    </h3>
    <div
      v-if="showEstimate"
      class="h-16 w-16 shrink-0 flex items-center justify-center rounded-full bg-indigo-600"
    >
      <span
        class="text-white font-mono font-semibold leading-7 tracking-tight text-xl"
      >
        {{ estimate }}
      </span>
    </div>
    <img
      v-else
      :src="avatar"
      alt="avatar"
      class="h-16 w-16 shrink-0 rounded-full bg-white"
    />
  </div>
</template>
