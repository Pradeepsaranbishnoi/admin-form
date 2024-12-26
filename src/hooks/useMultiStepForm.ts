import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../lib/store';
import { setStep } from '../features/form/formSlice';

export function useMultiStepForm() {
  const dispatch = useDispatch();
  const { currentStep } = useSelector((state: RootState) => state.form);
  const totalSteps = 5;

  const next = () => {
    if (currentStep < totalSteps) {
      dispatch(setStep(currentStep + 1));
    }
  };

  const back = () => {
    if (currentStep > 1) {
      dispatch(setStep(currentStep - 1));
    }
  };

  const goTo = (step: number) => {
    if (step >= 1 && step <= totalSteps) {
      dispatch(setStep(step));
    }
  };

  return {
    currentStep,
    totalSteps,
    next,
    back,
    goTo,
    isFirstStep: currentStep === 1,
    isLastStep: currentStep === totalSteps
  };
}