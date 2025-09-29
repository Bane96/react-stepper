import type {Step} from "./steps";
import {memo} from 'react';

interface StepperProps {
    steps: Step[];
    currentStep: number;
}

function Stepper({steps, currentStep}: StepperProps) {
    return (
        <>
            <ol className="stepper">
                {steps.map((step, index) => {
                    const stepNumber = index + 1;
                    const isActive = currentStep >= index;

                    return (
                        <li
                            key={step.id}
                            className={`step-item ${isActive ? "active" : ""}`}
                        >
                            <div className="block whitespace-nowrap z-10">
                                <span className="step">{stepNumber}</span>
                                <p className="step-text">
                                    {step.title}
                                </p>
                            </div>
                        </li>
                    );
                })}
            </ol>
        </>
    );
}

export default memo(Stepper);