'use client';

import {
  FormEvent,
  useState,
} from 'react';

interface UseFormProps {
  steps: JSX.Element[];
}

export function useForm({ steps }: UseFormProps) {
  const [currentStep, setCurrentStep] = useState(0);

  function changeStep(current: number, event?: FormEvent) {
    if (event) event.preventDefault();

    if (current < 0 || current >= steps.length) return;

    setCurrentStep(current);
  }

  return {
    currentStep,
    currentComponent: steps[currentStep],
    changeStep,
    isFirstStep: currentStep === 0 ? true : false,
    isSecondStep: currentStep === 1 ? true : false,
    isLastStep: currentStep === 2 ? true : false
  }
}

