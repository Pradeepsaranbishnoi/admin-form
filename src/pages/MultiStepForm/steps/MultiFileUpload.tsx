import { useDispatch, useSelector } from 'react-redux';
import { FileUpload } from '../../../components/form/FileUpload';
import { GeolocationStatus } from '../../../components/form/GeolocationStatus';
import { Button } from '../../../components/ui/Button';
import { useMultiStepForm } from '../../../hooks/useMultiStepForm';
import { setMultipleFiles, setGeolocation } from '../../../features/form/formSlice';
import type { RootState } from '../../../lib/store';

export default function MultiFileUpload() {
  const dispatch = useDispatch();
  const { next, back } = useMultiStepForm();
  const { multipleFiles, geolocation } = useSelector((state: RootState) => state.form);

  const handleFileChange = (files: File[]) => {
    dispatch(setMultipleFiles(files));
  };

  const handleLocationUpdate = (coords: { latitude: number; longitude: number }) => {
    dispatch(setGeolocation(coords));
  };

  const handleNext = () => {
    if (multipleFiles.length > 0 && geolocation.latitude && geolocation.longitude) {
      next();
    }
  };

  return (
    <div className="space-y-6">
      <FileUpload
        multiple
        onChange={handleFileChange}
        error={multipleFiles.length === 0 ? 'Please upload at least one file' : undefined}
      />

      <GeolocationStatus onLocationUpdate={handleLocationUpdate} />

      <div className="flex justify-between">
        <Button type="button" variant="outline" onClick={back}>
          Previous
        </Button>
        <Button
          onClick={handleNext}
          disabled={multipleFiles.length === 0 || !geolocation.latitude || !geolocation.longitude}
        >
          Next Step
        </Button>
      </div>
    </div>
  );
}