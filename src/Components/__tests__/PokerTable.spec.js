import { afterEach, describe, expect, it, vi } from "vitest";
import { shallowMount } from "@vue/test-utils";
import PokerTable from "@/Components/PokerTable.vue";
import PokerPlayer from "@/Components/PokerPlayer.vue";

vi.mock("minidenticons", () => {
  return { minidenticon: () => "image-url" };
});

describe("PokerTable", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("displays each player when show estimates is false", () => {
    const players = [
      [1, { name: "Constance", estimate: 5 }],
      [3, { name: "Leslie", estimate: undefined }],
      [4, { name: undefined, estimate: undefined }],
    ];

    const wrapper = shallowMount(PokerTable, {
      props: {
        players,
        showEstimates: false,
      },
    });

    const playerComponents = wrapper.findAllComponents(PokerPlayer);
    expect(playerComponents.length).toBe(3);
    expect(
      playerComponents.every((c) => c.props("showEstimate") === false),
    ).toBe(true);
    expect(playerComponents[0].props("name")).toBe("Constance");
    expect(playerComponents[0].props("estimate")).toBe(5);
    expect(playerComponents[0].props("isHighest")).toBe(false);
    expect(playerComponents[0].props("isLowest")).toBe(false);
    expect(playerComponents[1].props("name")).toBe("Leslie");
    expect(playerComponents[1].props("estimate")).toBeUndefined();
    expect(playerComponents[1].props("isHighest")).toBe(false);
    expect(playerComponents[1].props("isLowest")).toBe(false);
    expect(playerComponents[2].props("name")).toBeUndefined();
    expect(playerComponents[2].props("estimate")).toBeUndefined();
    expect(playerComponents[2].props("isHighest")).toBe(false);
    expect(playerComponents[2].props("isLowest")).toBe(false);
  });

  it("displays each player estimate when show estimates is true", () => {
    const players = [
      [1, { name: "Constance", estimate: 2 }],
      [2, { name: "Marie", estimate: 3 }],
      [3, { name: "Jane", estimate: 5 }],
      [4, { name: "Leslie", estimate: undefined }],
      [5, { name: undefined, estimate: undefined }],
    ];

    const wrapper = shallowMount(PokerTable, {
      props: {
        players,
        showEstimates: true,
      },
    });

    const playerComponents = wrapper.findAllComponents(PokerPlayer);
    expect(playerComponents.length).toBe(5);
    expect(
      playerComponents.every((c) => c.props("showEstimate") === true),
    ).toBe(true);
    expect(playerComponents[0].props("name")).toBe("Constance");
    expect(playerComponents[0].props("estimate")).toBe(2);
    expect(playerComponents[0].props("isHighest")).toBe(false);
    expect(playerComponents[0].props("isLowest")).toBe(true);
    expect(playerComponents[1].props("name")).toBe("Marie");
    expect(playerComponents[1].props("estimate")).toBe(3);
    expect(playerComponents[1].props("isHighest")).toBe(false);
    expect(playerComponents[1].props("isLowest")).toBe(false);
    expect(playerComponents[2].props("name")).toBe("Jane");
    expect(playerComponents[2].props("estimate")).toBe(5);
    expect(playerComponents[2].props("isHighest")).toBe(true);
    expect(playerComponents[2].props("isLowest")).toBe(false);
    expect(playerComponents[3].props("name")).toBe("Leslie");
    expect(playerComponents[3].props("estimate")).toBeUndefined();
    expect(playerComponents[3].props("isHighest")).toBe(false);
    expect(playerComponents[3].props("isLowest")).toBe(false);
    expect(playerComponents[4].props("name")).toBeUndefined();
    expect(playerComponents[4].props("estimate")).toBeUndefined();
    expect(playerComponents[4].props("isHighest")).toBe(false);
    expect(playerComponents[4].props("isLowest")).toBe(false);
  });

  it("does not calculate highest and lowest when there are no estimates", () => {
    const players = [
      [1, { name: "Constance", estimate: undefined }],
      [2, { name: "Marie", estimate: undefined }],
      [3, { name: "Jane", estimate: undefined }],
    ];

    const wrapper = shallowMount(PokerTable, {
      props: {
        players,
        showEstimates: true,
      },
    });

    const playerComponents = wrapper.findAllComponents(PokerPlayer);
    expect(playerComponents.length).toBe(3);
    expect(
      playerComponents.every((c) => c.props("showEstimate") === true),
    ).toBe(true);
    expect(playerComponents.every((c) => c.props("isHighest") === false)).toBe(
      true,
    );
    expect(playerComponents.every((c) => c.props("isLowest") === false)).toBe(
      true,
    );
  });

  it("does not calculate highest and lowest when there is only one unique estimate", () => {
    const players = [
      [1, { name: "Constance", estimate: 2 }],
      [2, { name: "Marie", estimate: 2 }],
      [3, { name: "Jane", estimate: undefined }],
    ];

    const wrapper = shallowMount(PokerTable, {
      props: {
        players,
        showEstimates: true,
      },
    });

    const playerComponents = wrapper.findAllComponents(PokerPlayer);
    expect(playerComponents.length).toBe(3);
    expect(
      playerComponents.every((c) => c.props("showEstimate") === true),
    ).toBe(true);
    expect(playerComponents.every((c) => c.props("isHighest") === false)).toBe(
      true,
    );
    expect(playerComponents.every((c) => c.props("isLowest") === false)).toBe(
      true,
    );
  });

  it("renders correctly", () => {
    const players = [
      [1, { name: "Constance", estimate: 5 }],
      [3, { name: "Leslie", estimate: undefined }],
      [4, { name: undefined, estimate: undefined }],
    ];

    const wrapper = shallowMount(PokerTable, {
      props: {
        players,
        showEstimates: true,
      },
    });

    expect(wrapper.element).toMatchSnapshot();
  });
});
