import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useDispatch, useSelector } from 'react-redux';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { Input } from '../../../components/ui/Input';
import { Button } from '../../../components/ui/Button';
import { useMultiStepForm } from '../../../hooks/useMultiStepForm';
import { basicDetailsSchema } from '../../../utils/validation';
import { setBasicDetails } from '../../../features/form/formSlice';
import type { RootState } from '../../../lib/store';
import type { z } from 'zod';

type BasicDetailsFormData = z.infer<typeof basicDetailsSchema>;

export default function BasicDetails() {
  const dispatch = useDispatch();
  const { next } = useMultiStepForm();
  const basicDetails = useSelector((state: RootState) => state.form.basicDetails);

  const { register, handleSubmit, formState: { errors }, control } = useForm<BasicDetailsFormData>({
    resolver: zodResolver(basicDetailsSchema),
    defaultValues: basicDetails,
  });

  const onSubmit = (data: BasicDetailsFormData) => {
    dispatch(setBasicDetails(data));
    next();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <Input
        label="Full Name"
        {...register('name')}
        error={errors.name?.message}
      />

      <Input
        label="Email Address"
        type="email"
        {...register('email')}
        error={errors.email?.message}
      />

      <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-700">
          Phone Number
        </label>
        <Controller
          name="phone"
          control={control}
          render={({ field }) => (
            <PhoneInput
              country="in"
              value={field.value} // Use the value from the field object
              onChange={(value: string) => field.onChange(value)} // Use the onChange from the field object
              inputProps={{
                className: 'w-full px-3 py-2 border rounded-lg'
              }}
              containerClass="phone-input"
            />
          )}
        />
        {errors.phone && (
          <p className="text-sm text-red-600">{errors.phone.message}</p>
        )}
      </div>

      <div className="flex justify-end">
        <Button type="submit">
          Next Step
        </Button>
      </div>
    </form>
  );
}
