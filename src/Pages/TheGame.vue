<script setup>
import * as Y from "yjs";
import { WebrtcProvider } from "y-webrtc";
import { ref } from "vue";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";

const open = ref(true);

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

const awareness = provider.awareness;

const players = ref(Array.from(awareness.getStates().entries()));

awareness.on("change", () => {
  players.value = Array.from(awareness.getStates().entries());
});

const setName = (event) => {
  const name = event.target.elements.name.value;
  awareness.setLocalStateField("name", name);
  open.value = false;
};
</script>

<template>
  <h1>The Game</h1>
  <ul>
    <li v-for="[playerId, player] in players" :key="playerId">
      {{ player.name || "N/A" }}
    </li>
  </ul>
  <TransitionRoot :show="open" as="template">
    <Dialog as="div" class="relative z-10">
      <TransitionChild
        as="template"
        enter="ease-out duration-300"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="ease-in duration-200"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div
          class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
        />
      </TransitionChild>

      <div class="fixed inset-0 z-10 overflow-y-auto">
        <div
          class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0"
        >
          <TransitionChild
            as="template"
            enter="ease-out duration-300"
            enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enter-to="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leave-from="opacity-100 translate-y-0 sm:scale-100"
            leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <DialogPanel
              class="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6"
            >
              <div class="text-center">
                <form @submit.prevent="setName">
                  <DialogTitle
                    as="h3"
                    class="text-base font-semibold leading-6 text-gray-900"
                    >What shall we call you?</DialogTitle
                  >
                  <div class="mt-2">
                    <label class="sr-only" for="name">Name</label>
                    <div class="mt-2">
                      <input
                        id="name"
                        class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        name="name"
                      />
                    </div>
                  </div>
                  <div class="mt-5 sm:mt-6">
                    <button
                      class="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      type="submit"
                    >
                      Join
                    </button>
                  </div>
                </form>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
