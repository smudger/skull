import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { config, mount } from "@vue/test-utils";
import JoinGameModal from "@/Components/JoinGameModal.vue";
import BaseModal from "@/Components/Base/BaseModal.vue";

const decks = [
  {
    name: "Pink",
    bgColor: "bg-pink-500",
    selectedColor: "ring-pink-500",
    isAssigned: false,
  },
  {
    name: "Purple",
    bgColor: "bg-purple-500",
    selectedColor: "ring-purple-500",
    isAssigned: false,
  },
  {
    name: "Blue",
    bgColor: "bg-blue-500",
    selectedColor: "ring-blue-500",
    isAssigned: false,
  },
  {
    name: "Green",
    bgColor: "bg-green-500",
    selectedColor: "ring-green-500",
    isAssigned: false,
  },
  {
    name: "Yellow",
    bgColor: "bg-yellow-500",
    selectedColor: "ring-yellow-500",
    isAssigned: true,
  },
];

describe("JoinGameModal", () => {
  beforeAll(() => {
    config.global.renderStubDefaultSlot = true;
  });

  afterAll(() => {
    config.global.renderStubDefaultSlot = false;
  });

  it("is visible when the show prop is true", () => {
    const wrapper = mount(JoinGameModal, {
      props: { show: true, decks },
    });

    expect(wrapper.findComponent(BaseModal).props().show).toBe(true);
  });

  it("is not visible when the show prop is false", () => {
    const wrapper = mount(JoinGameModal, {
      props: { show: false, decks },
    });

    expect(wrapper.findComponent(BaseModal).props().show).toBe(false);
  });

  it("emits a join event when the form is submitted", async () => {
    const wrapper = mount(JoinGameModal, {
      props: { show: true, decks },
      global: {
        stubs: {
          BaseModal: true,
          DialogTitle: true,
        },
      },
    });

    await wrapper.find("input").setValue("Constance Wu");

    await wrapper.find("form").trigger("submit.prevent");

    expect(wrapper.emitted()).toHaveProperty("join");

    expect(wrapper.emitted("join")[0][0]).toStrictEqual({
      name: "Constance Wu",
      deck: decks[0].name,
    });
  });

  it("requires you to choose a name", async () => {
    const wrapper = mount(JoinGameModal, {
      props: { show: true, decks },
      global: {
        stubs: {
          BaseModal: true,
          DialogTitle: true,
        },
      },
    });

    expect(wrapper.find("input").attributes()).toHaveProperty("required");
  });

  it("renders an option for each deck color", async () => {
    const blueAndGreen = [
      { name: "Blue", bgColor: "bg-blue-500", selectedColor: "ring-blue-500" },
      {
        name: "Green",
        bgColor: "bg-green-500",
        selectedColor: "ring-green-500",
      },
    ];

    const wrapper = mount(JoinGameModal, {
      props: { show: true, decks: blueAndGreen },
      global: {
        stubs: {
          BaseModal: true,
          DialogTitle: true,
        },
      },
    });

    const options = wrapper.findAll('div[role="radio"]');

    expect(options).toHaveLength(2);
    expect(options[0].text()).toBe("Blue");
    expect(options[1].text()).toBe("Green");
  });

  it("selects the first unassigned deck by default", async () => {
    const blueAndGreen = [
      {
        name: "Blue",
        bgColor: "bg-blue-500",
        selectedColor: "ring-blue-500",
        isAssigned: true,
      },
      {
        name: "Green",
        bgColor: "bg-green-500",
        selectedColor: "ring-green-500",
        isAssigned: false,
      },
    ];

    const wrapper = mount(JoinGameModal, {
      props: { show: true, decks: blueAndGreen },
      global: {
        stubs: {
          BaseModal: true,
          DialogTitle: true,
        },
      },
    });

    const options = wrapper.findAll('div[role="radio"]');
    expect(options[0].attributes()).toHaveProperty("aria-checked", "false");
    expect(options[1].attributes()).toHaveProperty("aria-checked", "true");
  });

  it("disables the assigned decks for selection", async () => {
    const blueAndGreen = [
      {
        name: "Blue",
        bgColor: "bg-blue-500",
        selectedColor: "ring-blue-500",
        isAssigned: true,
      },
      {
        name: "Green",
        bgColor: "bg-green-500",
        selectedColor: "ring-green-500",
        isAssigned: false,
      },
    ];

    const wrapper = mount(JoinGameModal, {
      props: { show: true, decks: blueAndGreen },
      global: {
        stubs: {
          BaseModal: true,
          DialogTitle: true,
        },
      },
    });

    const options = wrapper.findAll('div[role="radio"]');
    expect(options[0].attributes()).toHaveProperty("aria-disabled", "true");
    expect(options[1].attributes()).not.toHaveProperty("aria-disabled");
  });

  it("displays a warning when all the decks are assigned", async () => {
    const blueAndGreen = [
      {
        name: "Blue",
        bgColor: "bg-blue-500",
        selectedColor: "ring-blue-500",
        isAssigned: true,
      },
      {
        name: "Green",
        bgColor: "bg-green-500",
        selectedColor: "ring-green-500",
        isAssigned: true,
      },
    ];

    const wrapper = mount(JoinGameModal, {
      props: { show: true, decks: blueAndGreen },
      global: {
        stubs: {
          BaseModal: true,
          DialogTitle: true,
        },
      },
    });

    expect(wrapper.find("form").exists()).toBe(false);
    expect(wrapper.text()).toContain("This game is full!");
    expect(wrapper.text()).toContain(
      "All the decks have been taken, but you can still join as a spectator.",
    );
  });

  it("renders correctly when visible", () => {
    const wrapper = mount(JoinGameModal, {
      props: { show: true, decks },
    });

    expect(wrapper.element).toMatchSnapshot();
  });
});
