import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { config, shallowMount } from "@vue/test-utils";
import BaseModal from "@/Components/Base/BaseModal.vue";
import { TransitionRoot } from "@headlessui/vue";

describe("BaseModal", () => {
  beforeAll(() => {
    config.global.renderStubDefaultSlot = true;
  });

  afterAll(() => {
    config.global.renderStubDefaultSlot = false;
  });

  it("is visible when the show prop is true", () => {
    const wrapper = shallowMount(BaseModal, {
      props: { show: true },
    });

    expect(wrapper.findComponent(TransitionRoot).props().show).toBe(true);
  });

  it("is not visible when the show prop is false", () => {
    const wrapper = shallowMount(BaseModal, {
      props: { show: false },
    });

    expect(wrapper.findComponent(TransitionRoot).props().show).toBe(false);
  });

  it("renders the content that is passed to its slot", async () => {
    const wrapper = shallowMount(BaseModal, {
      props: { show: true },
      slots: {
        default: "<p>Put me in a modal</p>",
      },
    });

    expect(wrapper.find("p").text()).toBe("Put me in a modal");
  });

  it("renders correctly when visible", () => {
    const wrapper = shallowMount(BaseModal, {
      props: { show: true },
    });

    expect(wrapper.element).toMatchSnapshot();
  });
});
