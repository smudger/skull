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
  <img v-if="name" :src="avatar" alt="avatar" class="h-16 w-16 text-gray-300" />
  <p>{{ name }}</p>
  <p v-if="showEstimate">{{ estimate }}</p>
</template>
