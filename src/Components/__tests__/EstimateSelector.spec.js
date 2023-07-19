import { describe, expect, it } from "vitest";
import { shallowMount } from "@vue/test-utils";
import EstimateSelector from "@/Components/EstimateSelector.vue";

describe("EstimateSelector", () => {
  it("displays a radio button for each option", () => {
    const options = [1, 2, 3];

    const wrapper = shallowMount(EstimateSelector, {
      props: { options },
    });

    const radios = wrapper.findAll('input[type="radio"]');
    expect(radios.length).toBe(3);
    expect(radios.map((radio) => parseInt(radio.element.value))).toEqual(
      options,
    );
  });

  it("emits an event when the estimate is changed", async () => {
    const options = [1, 2, 3];

    const wrapper = shallowMount(EstimateSelector, {
      props: { options },
    });

    await wrapper.find('input[type="radio"][value="2"]').setValue();

    expect(wrapper.emitted()["change"][0][0]).toBe(2);

    await wrapper.find('input[type="radio"][value="3"]').setValue();

    expect(wrapper.emitted()["change"][1][0]).toBe(3);
  });
});
