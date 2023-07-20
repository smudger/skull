import { describe, expect, it } from "vitest";
import { shallowMount } from "@vue/test-utils";
import ControlPanel from "@/Components/ControlPanel.vue";
import EstimateSelector from "@/Components/EstimateSelector.vue";

describe("ControlPanel", () => {
  it('shows the estimate selector when the game state is "estimating"', () => {
    const wrapper = shallowMount(ControlPanel, {
      attachTo: document.body,
      props: {
        gameState: "estimating",
        estimateOptions: ["1", "2", "3"],
      },
    });

    expect(wrapper.findComponent(EstimateSelector).isVisible()).toBe(true);
  });

  it('does not show the estimate selector when the game state is "showing"', () => {
    const wrapper = shallowMount(ControlPanel, {
      attachTo: document.body,
      props: {
        gameState: "showing",
        estimateOptions: ["1", "2", "3"],
      },
    });

    expect(wrapper.findComponent(EstimateSelector).isVisible()).toBe(false);
  });

  it("emits the estimate changed event from when the estimate changes", async () => {
    const wrapper = shallowMount(ControlPanel, {
      props: {
        gameState: "estimating",
        estimateOptions: ["1", "2", "3"],
      },
    });

    await wrapper.findComponent(EstimateSelector).vm.$emit("change", "1");

    expect(wrapper.emitted()).toHaveProperty("estimate-changed");
    expect(wrapper.emitted("estimate-changed")).toEqual([["1"]]);
  });

  it("passes the options to the estimate selector", () => {
    const estimateOptions = ["1", "2", "3"];

    const wrapper = shallowMount(ControlPanel, {
      props: {
        gameState: "estimating",
        estimateOptions,
      },
    });

    expect(wrapper.findComponent(EstimateSelector).props("options")).toEqual(
      estimateOptions,
    );
  });

  it("displays a reveal cards button when the game state is estimating", () => {
    const wrapper = shallowMount(ControlPanel, {
      props: {
        gameState: "estimating",
        estimateOptions: ["1", "2", "3"],
      },
    });

    expect(wrapper.find('button[data-test="reveal-cards"]').exists()).toBe(
      true,
    );
  });

  it("does not display a reveal cards button when the game state is showing", () => {
    const wrapper = shallowMount(ControlPanel, {
      props: {
        gameState: "showing",
        estimateOptions: ["1", "2", "3"],
      },
    });

    expect(wrapper.find('button[data-test="reveal-cards"]').exists()).toBe(
      false,
    );
  });

  it("emits a reveal cards event when the reveal cards button is clicked", async () => {
    const wrapper = shallowMount(ControlPanel, {
      props: {
        gameState: "estimating",
        estimateOptions: ["1", "2", "3"],
      },
    });

    await wrapper.find('button[data-test="reveal-cards"]').trigger("click");

    expect(wrapper.emitted()).toHaveProperty("reveal-cards");
  });

  it("displays a reset game button when the game state is showing", () => {
    const wrapper = shallowMount(ControlPanel, {
      props: {
        gameState: "showing",
        estimateOptions: ["1", "2", "3"],
      },
    });

    expect(wrapper.find('button[data-test="reset-game"]').exists()).toBe(true);
  });

  it("does not display a reset game button when the game state is estimating", () => {
    const wrapper = shallowMount(ControlPanel, {
      props: {
        gameState: "estimating",
        estimateOptions: ["1", "2", "3"],
      },
    });

    expect(wrapper.find('button[data-test="reset-game"]').exists()).toBe(false);
  });

  it("emits a reset game event when the reset game button is clicked", async () => {
    const wrapper = shallowMount(ControlPanel, {
      props: {
        gameState: "showing",
        estimateOptions: ["1", "2", "3"],
      },
    });

    await wrapper.find('button[data-test="reset-game"]').trigger("click");

    expect(wrapper.emitted()).toHaveProperty("reset-game");
  });
});
