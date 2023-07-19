import { describe, expect, it } from "vitest";
import { RouterLinkStub, shallowMount } from "@vue/test-utils";
import TheNotFound from "@/Pages/TheNotFound.vue";

describe("TheNotFound", () => {
  it("should render correctly", () => {
    const wrapper = shallowMount(TheNotFound, {
      global: {
        stubs: {
          RouterLink: RouterLinkStub,
        },
      },
    });

    expect(wrapper.element).toMatchSnapshot();
  });

  it("should render a link to the homepage", () => {
    const wrapper = shallowMount(TheNotFound, {
      global: {
        stubs: {
          RouterLink: RouterLinkStub,
        },
      },
    });

    expect(wrapper.findComponent(RouterLinkStub).props().to).toEqual({
      name: "Home",
    });
  });
});
