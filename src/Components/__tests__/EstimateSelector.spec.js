import { describe, expect, it } from "vitest";
import { mount } from "@vue/test-utils";
import EstimateSelector from "@/Components/EstimateSelector.vue";
import { RadioGroupOption } from "@headlessui/vue";

describe("EstimateSelector", () => {
  it("displays a radio button for each option", () => {
    const options = [1, 2, 3];

    const wrapper = mount(EstimateSelector, {
      props: { options },
    });

    const radios = wrapper.findAllComponents(RadioGroupOption);
    expect(radios.length).toBe(3);
    expect(radios.map((radio) => radio.props().value)).toEqual(options);
  });

  it("emits an event when the estimate is changed", async () => {
    const options = [1, 2, 3];

    const wrapper = mount(EstimateSelector, {
      props: { options },
    });

    await wrapper
      .findAllComponents(RadioGroupOption)
      .find((radio) => radio.props().value === 2)
      .trigger("click");

    expect(wrapper.emitted()["change"][0][0]).toBe(2);

    await wrapper
      .findAllComponents(RadioGroupOption)
      .find((radio) => radio.props().value === 3)
      .trigger("click");

    expect(wrapper.emitted()["change"][1][0]).toBe(3);
  });
});
