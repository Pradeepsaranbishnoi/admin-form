import { useDispatch, useSelector } from 'react-redux';
import { FileUpload } from '../../../components/form/FileUpload';
import { Button } from '../../../components/ui/Button';
import { useMultiStepForm } from '../../../hooks/useMultiStepForm';
import { setSingleFile } from '../../../features/form/formSlice';
import type { RootState } from '../../../lib/store';

export default function SingleFileUpload() {
  const dispatch = useDispatch();
  const { next, back } = useMultiStepForm();
  const singleFile = useSelector((state: RootState) => state.form.singleFile);

  const handleFileChange = (files: File[]) => {
    dispatch(setSingleFile(files[0]));
  };

  const handleNext = () => {
    if (singleFile) {
      next();
    }
  };

  return (
    <div className="space-y-6">
      <FileUpload
        onChange={handleFileChange}
        error={!singleFile ? 'Please upload a file' : undefined}
      />

      <div className="flex justify-between">
        <Button type="button" variant="outline" onClick={back}>
          Previous
        </Button>
        <Button
          onClick={handleNext}
          disabled={!singleFile}
        >
          Next Step
        </Button>
      </div>
    </div>
  );
}