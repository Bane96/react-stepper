import { useState } from "react";
import {Step} from '../components/stepper/steps';

export function useStepper(steps: Step[]) {
	const [currentStep, setCurrentStep] = useState(0);

	const handleNextStep = () => {
		setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
	};

	return {
		currentStep,
		handleNextStep,
		isLastStep: currentStep === steps.length - 1,
	};
}
