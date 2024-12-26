import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { CheckCircle, XCircle } from 'lucide-react';
import { Button } from '../../../components/ui/Button';
import { useMultiStepForm } from '../../../hooks/useMultiStepForm';
import { api } from '../../../lib/api';
import type { RootState } from '../../../lib/store';

export default function Status() {
  const { back } = useMultiStepForm();
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const formData = useSelector((state: RootState) => state.form);
  const token = useSelector((state: RootState) => state.auth.token);
  
useEffect(() => {
  const submitForm = async () => {
    if (status === 'idle') {
      setStatus('loading');
      try {
        const data = new FormData();

        // Flatten basicDetails keys
        Object.entries(formData.basicDetails).forEach(([key, value]) => {
          data.append(`basicDetails${key}`, value as string);
        });

        // Flatten address keys
        Object.entries(formData.address).forEach(([key, value]) => {
          if (value) data.append(`address${key}`, value as string);
        });

        // Append single file
        if (formData.singleFile) {
          data.append('singleFile', formData.singleFile);
        }

        // Append multiple files with correct indexing
        formData.multipleFiles.forEach((file, index) => {
          data.append(`multipleFiles${index}`, file);
        });

        // Append geolocation
        data.append('geolocation', JSON.stringify(formData.geolocation));

        // Send the data to the API
        await api.submitForm(data, token!);
        setStatus('success');
      } catch (error) {
        setStatus('error');
      }
    }
  };

  submitForm();
}, [formData, token]);


  return (
    <div className="text-center space-y-6">
      {status === 'loading' && (
        <div className="animate-pulse">
          <p className="text-lg">Submitting form...</p>
        </div>
      )}

      {status === 'success' && (
        <div className="space-y-4">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto" />
          <h3 className="text-xl font-semibold text-gray-900">Form Submitted Successfully!</h3>
          <p className="text-gray-600">Thank you for completing the form.</p>
        </div>
      )}

      {status === 'error' && (
        <div className="space-y-4">
          <XCircle className="h-16 w-16 text-red-500 mx-auto" />
          <h3 className="text-xl font-semibold text-gray-900">Submission Failed</h3>
          <p className="text-gray-600">There was an error submitting your form. Please try again.</p>
          <Button variant="outline" onClick={back}>
            Go Back
          </Button>
        </div>
      )}
    </div>
  );
}