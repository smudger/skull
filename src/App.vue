<script setup>
import * as Y from "yjs";
import { WebrtcProvider } from "y-webrtc";
import { onMounted, ref } from "vue";

// A new Y document
const ydoc = new Y.Doc();
// Registered with a WebRTC provider
const provider = new WebrtcProvider(
  "ce004c03-9927-40e7-9eba-3fe63f73d84e",
  ydoc,
  {
    signaling: ["ws://localhost:4444"],
  },
);

const yarray = ydoc.get("array", Y.Array);

const myArray = ref(yarray.toArray());

yarray.observe(() => {
  myArray.value = yarray.toArray();
});

onMounted(() => yarray.insert(0, ["New User"]));
</script>

<template>
  <h1>Hi there!</h1>
  {{ myArray }}
</template>
