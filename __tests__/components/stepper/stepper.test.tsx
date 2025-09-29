import { render } from "@testing-library/react";
import Stepper from '../../../components/stepper/stepper';
import type {Step} from '../../../components/stepper/steps';

const steps: Step[] = [
    { id: 1, title: "Step One" },
    { id: 2, title: "Step Two" },
    { id: 3, title: "Step Three" },
];

describe("Stepper", () => {
    test("render all steps correctly", () => {
        const { container } = render(<Stepper steps={steps} currentStep={1} />);
        const stepItems = container.querySelectorAll("li");
        expect(stepItems.length).toBe(steps.length);
    });

    test("display correct step titles and numbers", () => {
        const { container } = render(<Stepper steps={steps} currentStep={1} />);
        const stepItems = container.querySelectorAll("li");

        stepItems.forEach((li, index) => {
            const step = steps[index];
            const textContent = li.textContent || "";
            expect(textContent.includes((index + 1).toString())).toBe(true);
            expect(textContent.includes(step.title)).toBe(true);
        });
    });

    test("applies active class to steps up to currentStep", () => {
        const { container } = render(<Stepper steps={steps} currentStep={1} />);
        const stepItems = container.querySelectorAll("li");

        stepItems.forEach((li, index) => {
            if (index <= 1) {
                expect(li.className.includes("active")).toBe(true);
            } else {
                expect(li.className.includes("active")).toBe(false);
            }
        });
    });

    test("mark only the current step with aria-current", () => {
        const { container } = render(<Stepper steps={steps} currentStep={2} />);
        const stepItems = container.querySelectorAll("li");

        stepItems.forEach((li, index) => {
            if (index === 1) {
                expect(li.getAttribute("aria-current")).toBe("step");
            } else {
                expect(li.getAttribute("aria-current")).toBeNull();
            }
        });
    });

    test("handles the first step as current correctly", () => {
        const { container } = render(<Stepper steps={steps} currentStep={1} />);
        const stepItems = container.querySelectorAll("li");

        expect(stepItems[0].className.includes("active")).toBe(true);
        expect(stepItems[0].getAttribute("aria-current")).toBe("step");
    });

    test("handles currentStep beyond number of steps", () => {
        const { container } = render(<Stepper steps={steps} currentStep={5} />);
        const stepItems = container.querySelectorAll("li");

        stepItems.forEach((li) => {
            expect(li.className.includes("active")).toBe(true);
        });
    });
});
