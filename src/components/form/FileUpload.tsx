import { useRef, ChangeEvent } from 'react';
import { Upload } from 'lucide-react';
// import { Button } from '../ui/Button';

interface FileUploadProps {
  multiple?: boolean;
  maxFiles?: number;
  accept?: string;
  onChange: (files: File[]) => void;
  error?: string;
}

export function FileUpload({
  multiple = false,
  maxFiles = 5,
  accept = '.png,.pdf',
  onChange,
  error
}: FileUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (multiple && files.length > maxFiles) {
      alert(`Maximum ${maxFiles} files allowed`);
      return;
    }
    onChange(files);
  };

  return (
    <div className="space-y-2">
      <div
        className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-blue-500"
        onClick={() => inputRef.current?.click()}
      >
        <Upload className="mx-auto h-12 w-12 text-gray-400" />
        <p className="mt-2 text-sm text-gray-600">
          Click to upload or drag and drop
        </p>
        <p className="text-xs text-gray-500">
          PNG, PDF up to {multiple ? `${maxFiles} files` : '1 file'}
        </p>
      </div>
      <input
        ref={inputRef}
        type="file"
        className="hidden"
        accept={accept}
        multiple={multiple}
        onChange={handleFileChange}
      />
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
}