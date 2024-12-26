import { useEffect, useState } from 'react';
import { MapPin } from 'lucide-react';

interface GeolocationStatusProps {
  onLocationUpdate: (coords: { latitude: number; longitude: number }) => void;
}

export function GeolocationStatus({ onLocationUpdate }: GeolocationStatusProps) {
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [error, setError] = useState<string>('');

  useEffect(() => {
    if (!navigator.geolocation) {
      setStatus('error');
      setError('Geolocation is not supported by your browser');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        onLocationUpdate({ latitude, longitude });
        setStatus('success');
      },
      (error) => {
        setStatus('error');
        setError(error.message);
      }
    );
  }, [onLocationUpdate]);

  return (
    <div className="flex items-center space-x-2 text-sm">
      <MapPin className="h-4 w-4" />
      {status === 'loading' && <span>Getting location...</span>}
      {status === 'success' && <span className="text-green-600">Location recorded</span>}
      {status === 'error' && <span className="text-red-600">{error}</span>}
    </div>
  );
}