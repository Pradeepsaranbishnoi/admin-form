import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useMultiStepForm } from '../../hooks/useMultiStepForm';
import { ProgressBar } from '../../components/ui/ProgressBar';
import { RootState } from '../../lib/store';
import { resetForm } from '../../features/form/formSlice';
import BasicDetails from './steps/BasicDetails';
import AddressDetails from './steps/AddressDetails';
import SingleFileUpload from './steps/SingleFileUpload';
import MultiFileUpload from './steps/MultiFileUpload';
import Status from './steps/Status';

export default function MultiStepForm() {
  const dispatch = useDispatch();
  const { currentStep, totalSteps } = useMultiStepForm();
  const formState = useSelector((state: RootState) => state.form);

  useEffect(() => {
    return () => {
      dispatch(resetForm());
    };
  }, [dispatch]);

  const steps = [
    <BasicDetails key="basic" />,
    <AddressDetails key="address" />,
    <SingleFileUpload key="single-file" />,
    <MultiFileUpload key="multi-file" />,
    <Status key="status" />
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
            <div className="mt-8">
              {steps[currentStep - 1]}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}