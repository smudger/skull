import { afterEach, describe, expect, it, vi } from "vitest";
import { shallowMount } from "@vue/test-utils";
import PokerPlayer from "@/Components/PokerPlayer.vue";

vi.mock("minidenticons", () => {
  return { minidenticon: () => "image-url" };
});

describe("PokerPlayer", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  describe("when the player has a name", () => {
    it("displays the player's name", () => {
      const wrapper = shallowMount(PokerPlayer, {
        props: {
          name: "Constance Wu",
          estimate: 3,
          showEstimate: false,
        },
      });

      expect(wrapper.text()).toContain("Constance Wu");
    });

    it("displays an avatar based on the player's name", () => {
      const wrapper = shallowMount(PokerPlayer, {
        props: {
          name: "Constance Wu",
          estimate: 3,
          showEstimate: false,
        },
      });

      expect(wrapper.find("img").exists()).toBe(true);
      expect(wrapper.find("img").attributes("src")).toBe(
        "data:image/svg+xml;utf8,image-url",
      );
    });
  });

  describe("when the player does not have a name", () => {
    it("does not display any text", () => {
      const wrapper = shallowMount(PokerPlayer, {
        props: {
          name: undefined,
          estimate: undefined,
          showEstimate: false,
        },
      });

      expect(wrapper.text()).toBe("");
    });

    it("does not display an avatar", () => {
      const wrapper = shallowMount(PokerPlayer, {
        props: {
          name: undefined,
          estimate: undefined,
          showEstimate: false,
        },
      });

      expect(wrapper.find("img").exists()).toBe(false);
    });
  });

  it("displays the player's estimate when the show estimate prop is true", () => {
    const wrapper = shallowMount(PokerPlayer, {
      props: {
        name: "Constance Wu",
        estimate: 3,
        showEstimate: true,
      },
    });

    expect(wrapper.text()).toContain("3");
  });

  it("does not display the player's estimate when the show estimate prop is false", () => {
    const wrapper = shallowMount(PokerPlayer, {
      props: {
        name: "Constance Wu",
        estimate: 3,
        showEstimate: false,
      },
    });

    expect(wrapper.text()).not.toContain("3");
  });
});
