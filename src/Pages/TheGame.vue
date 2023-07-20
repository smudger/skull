<script setup>
import * as Y from "yjs";
import { WebrtcProvider } from "y-webrtc";
import { onMounted, ref } from "vue";
import JoinGameModal from "@/Components/JoinGameModal.vue";
import PokerTable from "@/Components/PokerTable.vue";
import ControlPanel from "@/Components/ControlPanel.vue";

const props = defineProps({
  id: { type: String, required: true },
  code: { type: String, required: true },
});

// A new Y document
const ydoc = new Y.Doc();
// Registered with a WebRTC provider
const provider = new WebrtcProvider(props.id, ydoc, {
  signaling: ["ws://localhost:4444"],
  password: props.code,
});

const ygame = ydoc.getMap("game");

onMounted(() => {
  if (ygame.get("state") === undefined) {
    ygame.set("state", "estimating");
  }
});

const state = ref(ygame.get("state"));

ygame.observe(() => {
  state.value = ygame.get("state");
});

const awareness = provider.awareness;

const players = ref(Array.from(awareness.getStates().entries()));
const me = ref(awareness.getLocalState());

awareness.on("change", () => {
  me.value = awareness.getLocalState();
  players.value = Array.from(awareness.getStates().entries());
});

const setState = (state) => {
  ygame.set("state", state);
};

const setEstimate = (estimate) => {
  awareness.setLocalStateField("estimate", estimate);
};

const showJoinGameModal = ref(true);

const joinGame = (name) => {
  awareness.setLocalStateField("name", name);
  showJoinGameModal.value = false;
};
</script>

<template>
  <div class="bg-gray-50 h-full">
    <h1>The Game: {{ state }}</h1>
    <button
      v-show="state === 'estimating'"
      class="rounded-md bg-indigo-50 px-3.5 py-2.5 text-sm font-semibold text-indigo-600 shadow-sm hover:bg-indigo-100"
      type="button"
      @click="setState('showing')"
    >
      Reveal
    </button>
    <button
      v-show="state === 'showing'"
      class="rounded-md bg-indigo-50 px-3.5 py-2.5 text-sm font-semibold text-indigo-600 shadow-sm hover:bg-indigo-100"
      type="button"
      @click="setState('estimating')"
    >
      Hide
    </button>
    <PokerTable :players="players" :show-estimates="state === 'showing'" />
    <ControlPanel
      :estimate-options="[0, 0.5, 1, 2, 3, 5, 8, 13, 20, 40, 100, '?']"
      :game-state="state"
      @estimate-changed="setEstimate"
    />
    <JoinGameModal :show="showJoinGameModal" @join="joinGame" />
  </div>
</template>
