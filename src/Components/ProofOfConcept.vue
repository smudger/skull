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

const awareness = provider.awareness;

onMounted(() => {
  yarray.insert(0, ["New User"]);
  console.log(awareness.clientID);
});

awareness.on("change", (changes) => {
  // Whenever somebody updates their awareness information,
  // we log all awareness information from all users.
  console.log(changes);
  console.log(Array.from(awareness.getStates().values()));
});

awareness.setLocalStateField("user", {
  // Define a print name that should be displayed
  name: "Emmanuelle Charpentier",
  // Define a color that should be associated to the user:
  color: "#ffb61e", // should be a hex color
});
</script>

<template>
  <h1>Hi there!</h1>
  {{ myArray }}
</template>
