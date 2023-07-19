import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { config, shallowMount } from "@vue/test-utils";
import AppModal from "@/Components/AppModal.vue";
import { TransitionRoot } from "@headlessui/vue";

describe("AppModal", () => {
  beforeAll(() => {
    config.global.renderStubDefaultSlot = true;
  });

  afterAll(() => {
    config.global.renderStubDefaultSlot = false;
  });

  it("is visible when the show prop is true", () => {
    const wrapper = shallowMount(AppModal, {
      props: { show: true },
    });

    expect(wrapper.findComponent(TransitionRoot).props().show).toBe(true);
  });

  it("is not visible when the show prop is false", () => {
    const wrapper = shallowMount(AppModal, {
      props: { show: false },
    });

    expect(wrapper.findComponent(TransitionRoot).props().show).toBe(false);
  });

  it("renders the content that is passed to its slot", async () => {
    const wrapper = shallowMount(AppModal, {
      props: { show: true },
      slots: {
        default: "<p>Put me in a modal</p>",
      },
    });

    expect(wrapper.find("p").text()).toBe("Put me in a modal");
  });

  it("renders correctly when visible", () => {
    const wrapper = shallowMount(AppModal, {
      props: { show: true },
    });

    expect(wrapper.element).toMatchSnapshot();
  });
});
