import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { config, shallowMount } from "@vue/test-utils";
import AppModal from "@/Components/AppModal.vue";
import JoinGameModal from "@/Components/JoinGameModal.vue";

describe("JoinGameModal", () => {
  beforeAll(() => {
    config.global.renderStubDefaultSlot = true;
  });

  afterAll(() => {
    config.global.renderStubDefaultSlot = false;
  });

  it("is visible when the show prop is true", () => {
    const wrapper = shallowMount(JoinGameModal, {
      props: { show: true },
    });

    expect(wrapper.findComponent(AppModal).props().show).toBe(true);
  });

  it("is not visible when the show prop is false", () => {
    const wrapper = shallowMount(JoinGameModal, {
      props: { show: false },
    });

    expect(wrapper.findComponent(AppModal).props().show).toBe(false);
  });

  it("emits a join event when the form is submitted", async () => {
    const wrapper = shallowMount(JoinGameModal, {
      props: { show: true },
    });

    await wrapper.find("input").setValue("Constance Wu");

    await wrapper.find("form").trigger("submit.prevent");

    expect(wrapper.emitted()).toHaveProperty("join");

    expect(wrapper.emitted("join")[0][0]).toBe("Constance Wu");
  });

  it("renders correctly when visible", () => {
    const wrapper = shallowMount(JoinGameModal, {
      props: { show: true },
    });

    expect(wrapper.element).toMatchSnapshot();
  });
});
