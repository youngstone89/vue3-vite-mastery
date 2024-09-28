import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import GuessAge from "./GuessAge.vue";


describe('testing GuessAge component', () => {
    it("mount GuessAge component props", () => {
        const wrapper = mount(GuessAge, {
            props: {
                title: "Guess User Age App"
            }
        });
        expect(wrapper.text()).toContain("Guess User Age App");
    });
})