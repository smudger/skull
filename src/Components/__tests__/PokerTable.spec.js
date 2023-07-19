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
    expect(playerComponents[1].props("name")).toBe("Leslie");
    expect(playerComponents[1].props("estimate")).toBeUndefined();
    expect(playerComponents[2].props("name")).toBeUndefined();
    expect(playerComponents[2].props("estimate")).toBeUndefined();
  });

  it("displays each player estimate when show estimates is true", () => {
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

    const playerComponents = wrapper.findAllComponents(PokerPlayer);
    expect(playerComponents.length).toBe(3);
    expect(
      playerComponents.every((c) => c.props("showEstimate") === true),
    ).toBe(true);
    expect(playerComponents[0].props("name")).toBe("Constance");
    expect(playerComponents[0].props("estimate")).toBe(5);
    expect(playerComponents[1].props("name")).toBe("Leslie");
    expect(playerComponents[1].props("estimate")).toBeUndefined();
    expect(playerComponents[2].props("name")).toBeUndefined();
    expect(playerComponents[2].props("estimate")).toBeUndefined();
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
