<script setup>
import { DialogTitle } from "@headlessui/vue";
import BaseModal from "@/Components/Base/BaseModal.vue";

defineProps({
  show: { type: Boolean, required: true },
});

const emit = defineEmits(["join"]);

const joinGame = (event) => {
  const name = event.target.elements.name.value;

  emit("join", name);
};
</script>

<template>
  <BaseModal :show="show">
    <div class="text-center">
      <form @submit.prevent="joinGame">
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
              required
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
  </BaseModal>
</template>
