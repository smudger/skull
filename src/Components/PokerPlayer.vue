<script setup>
import { computed } from "vue";
import { minidenticon } from "minidenticons";
import { CheckIcon } from "@heroicons/vue/24/solid";

const props = defineProps({
  name: { type: String, default: undefined },
  estimate: { type: [String, Number], default: undefined },
  showEstimate: { type: Boolean, required: true },
  isHighest: { type: Boolean, required: true },
  isLowest: { type: Boolean, required: true },
});

const avatar = computed(
  () =>
    "data:image/svg+xml;utf8," + encodeURIComponent(minidenticon(props.name)),
);
</script>

<template>
  <div
    :class="[
      name ? 'bg-gray-800 border-gray-800' : 'border-dashed border-gray-300',
    ]"
    class="rounded-2xl border-2 justify-between flex sm:flex-col-reverse w-80 sm:w-64 items-center px-6 py-4 space-x-2 sm:space-x-0"
  >
    <div class="sm:mt-4">
      <h3
        v-if="name"
        class="text-base font-semibold leading-7 tracking-tight text-white whitespace-nowrap truncate"
      >
        {{ name }}
      </h3>
      <div v-else class="rounded-2xl w-32 h-3 my-2 bg-gray-300"></div>
    </div>
    <div>
      <div
        v-if="showEstimate && name"
        :class="[estimate !== undefined ? 'bg-indigo-600' : '']"
        class="h-16 w-16 sm:h-32 sm:w-32 shrink-0 flex items-center justify-center rounded-full"
      >
        <span
          class="text-white font-mono font-semibold leading-7 tracking-tight text-xl sm:text-4xl"
        >
          {{ estimate }}
        </span>
      </div>
      <div v-else-if="name" class="relative">
        <img
          :class="[estimate !== undefined ? 'ring-4 ring-indigo-600' : '']"
          :src="avatar"
          alt="avatar"
          class="h-16 w-16 sm:h-32 sm:w-32 shrink-0 rounded-full bg-white"
        />
        <span
          v-if="estimate !== undefined"
          class="absolute right-0 top-0 sm:right-1 sm:top-1 block h-4 sm:h-6 w-4 sm:w-6 rounded-full bg-indigo-600 ring-2 ring-white text-white"
        >
          <CheckIcon />
        </span>
      </div>
      <div
        v-else
        class="h-16 w-16 sm:h-32 sm:w-32 shrink-0 rounded-full bg-gray-300"
      />
    </div>
  </div>
</template>
