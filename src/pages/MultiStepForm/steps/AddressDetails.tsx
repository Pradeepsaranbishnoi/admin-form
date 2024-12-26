import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useDispatch, useSelector } from 'react-redux';
import { Input } from '../../../components/ui/Input';
import { Button } from '../../../components/ui/Button';
import { useMultiStepForm } from '../../../hooks/useMultiStepForm';
import { addressSchema } from '../../../utils/validation';
import { setAddress } from '../../../features/form/formSlice';
import type { RootState } from '../../../lib/store';
import type { z } from 'zod';

type AddressFormData = z.infer<typeof addressSchema>;

export default function AddressDetails() {
  const dispatch = useDispatch();
  const { next, back } = useMultiStepForm();
  const address = useSelector((state: RootState) => state.form.address);

  const { register, handleSubmit, formState: { errors } } = useForm<AddressFormData>({
    resolver: zodResolver(addressSchema),
    defaultValues: address
  });

  const onSubmit = (data: AddressFormData) => {
    dispatch(setAddress(data));
    next();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <Input
        label="Address Line 1"
        {...register('line1')}
        error={errors.line1?.message}
      />

      <Input
        label="Address Line 2 (Optional)"
        {...register('line2')}
        error={errors.line2?.message}
      />

      <div className="grid grid-cols-2 gap-4">
        <Input
          label="City"
          {...register('city')}
          error={errors.city?.message}
        />

        <Input
          label="State"
          {...register('state')}
          error={errors.state?.message}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Pincode"
          {...register('pincode')}
          error={errors.pincode?.message}
        />

        <Input
          label="Country"
          {...register('country')}
          error={errors.country?.message}
        />
      </div>

      <div className="flex justify-between">
        <Button type="button" variant="outline" onClick={back}>
          Previous
        </Button>
        <Button type="submit">
          Next Step
        </Button>
      </div>
    </form>
  );
}