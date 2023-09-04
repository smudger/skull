<script setup>
import { DialogTitle } from "@headlessui/vue";
import BaseModal from "@/Components/Base/BaseModal.vue";
import { RadioGroup, RadioGroupLabel, RadioGroupOption } from "@headlessui/vue";
import { computed, ref } from "vue";

const props = defineProps({
  show: { type: Boolean, required: true },
  decks: { type: Array, required: true },
});

const gameIsFull = computed(() =>
  props.decks.every(({ isAssigned }) => isAssigned),
);

const emit = defineEmits(["join"]);

const joinGame = (event) => {
  const name = event.target.elements.name.value;

  emit("join", {
    name,
    deck: selectedDeck.value.name,
  });
};

const selectedDeck = ref(
  gameIsFull.value
    ? undefined
    : props.decks.filter(({ isAssigned }) => !isAssigned)[0],
);
</script>

<template>
  <BaseModal :show="show">
    <div>
      <div v-if="gameIsFull">
        <DialogTitle
          as="h3"
          class="text-center text-base font-semibold leading-6 text-gray-900"
          >This game is full!</DialogTitle
        >
        <p class="mt-2">
          All the decks have been taken, but you can still join as a spectator.
        </p>
      </div>
      <form v-else @submit.prevent="joinGame">
        <DialogTitle
          as="h3"
          class="text-center text-base font-semibold leading-6 text-gray-900"
          >Let's get started!</DialogTitle
        >
        <div class="mt-2">
          <label
            class="block text-sm font-medium leading-6 text-gray-900"
            for="name"
            >Name</label
          >
          <div class="mt-2">
            <input
              id="name"
              class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-rose-600 sm:text-sm sm:leading-6"
              name="name"
              required
            />
          </div>
        </div>
        <RadioGroup v-model="selectedDeck" class="mt-5">
          <RadioGroupLabel
            class="block text-sm font-medium leading-6 text-gray-900"
            >Choose a deck color</RadioGroupLabel
          >
          <div class="mt-4 flex items-center space-x-3">
            <RadioGroupOption
              v-for="deck in decks"
              :key="deck.name"
              v-slot="{ active, checked, disabled }"
              as="template"
              :value="deck"
              :disabled="deck.isAssigned"
            >
              <div
                :class="[
                  deck.selectedColor,
                  disabled ? 'opacity-20' : '',
                  active && checked ? 'ring ring-offset-1' : '',
                  !active && checked ? 'ring-2' : '',
                  'relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none',
                ]"
              >
                <RadioGroupLabel as="span" class="sr-only">{{
                  deck.name
                }}</RadioGroupLabel>
                <span
                  aria-hidden="true"
                  :class="[
                    deck.bgColor,
                    'h-8 w-8 rounded-full border border-black border-opacity-10',
                  ]"
                />
              </div>
            </RadioGroupOption>
          </div>
        </RadioGroup>
        <div class="mt-5 sm:mt-6">
          <button
            class="inline-flex w-full justify-center rounded-md bg-rose-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-rose-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-600"
            type="submit"
          >
            Join Game
          </button>
        </div>
      </form>
    </div>
  </BaseModal>
</template>
