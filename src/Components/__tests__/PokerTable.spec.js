import { describe, expect, it } from "vitest";
import { shallowMount } from "@vue/test-utils";
import PokerTable from "@/Components/PokerTable.vue";

describe("PokerTable", () => {
  it("displays each player's name", () => {
    const players = [
      [1, { name: "Constance", estimate: 5 }],
      [2, { name: "Beth", estimate: 3 }],
      [3, { name: "Leslie", estimate: undefined }],
      [4, { name: undefined, estimate: undefined }],
    ];

    const wrapper = shallowMount(PokerTable, {
      props: {
        players,
        showEstimates: false,
      },
    });

    expect(wrapper.text()).toContain("Constance");
    expect(wrapper.text()).toContain("Beth");
    expect(wrapper.text()).toContain("Leslie");
    expect(wrapper.text()).toContain("Anonymous");
  });

  it("displays each player's estimate if the show estimates prop is true", () => {
    const players = [
      [1, { name: "Constance", estimate: 5 }],
      [2, { name: "Beth", estimate: 3 }],
      [3, { name: "Leslie", estimate: undefined }],
    ];

    const wrapper = shallowMount(PokerTable, {
      props: {
        players,
        showEstimates: true,
      },
    });

    expect(wrapper.text()).toContain("5");
    expect(wrapper.text()).toContain("3");
    expect(wrapper.text()).toContain("Didn't Guess!");
  });

  it("does not display each player's estimate if the show estimates prop is false", () => {
    const players = [
      [1, { name: "Constance", estimate: 5 }],
      [2, { name: "Beth", estimate: 3 }],
      [3, { name: "Leslie", estimate: undefined }],
    ];

    const wrapper = shallowMount(PokerTable, {
      props: {
        players,
        showEstimates: false,
      },
    });

    expect(wrapper.text()).not.toContain("5");
    expect(wrapper.text()).not.toContain("3");
    expect(wrapper.text()).not.toContain("Didn't Guess!");
  });
});
