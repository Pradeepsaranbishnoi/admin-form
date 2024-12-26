import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FormState {
  currentStep: number;
  basicDetails: {
    name: string;
    email: string;
    phone: string;
  };
  address: {
    line1: string;
    line2: string;
    city: string;
    state: string;
    pincode: string;
    country: string;
  };
  singleFile: File | null;
  multipleFiles: File[];
  geolocation: {
    latitude: number | null;
    longitude: number | null;
  };
}

const initialState: FormState = {
  currentStep: 1,
  basicDetails: {
    name: '',
    email: '',
    phone: '',
  },
  address: {
    line1: '',
    line2: '',
    city: '',
    state: '',
    pincode: '',
    country: '',
  },
  singleFile: null,
  multipleFiles: [],
  geolocation: {
    latitude: null,
    longitude: null,
  },
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    setStep: (state, action: PayloadAction<number>) => {
      state.currentStep = action.payload;
    },
    setBasicDetails: (state, action: PayloadAction<typeof initialState.basicDetails>) => {
      state.basicDetails = action.payload;
    },
    setAddress: (state, action: PayloadAction<typeof initialState.address>) => {
      state.address = action.payload;
    },
    setSingleFile: (state, action: PayloadAction<File | null>) => {
      state.singleFile = action.payload;
    },
    setMultipleFiles: (state, action: PayloadAction<File[]>) => {
      state.multipleFiles = action.payload;
    },
    setGeolocation: (state, action: PayloadAction<typeof initialState.geolocation>) => {
      state.geolocation = action.payload;
    },
    resetForm: () => initialState,
  },
});

export const {
  setStep,
  setBasicDetails,
  setAddress,
  setSingleFile,
  setMultipleFiles,
  setGeolocation,
  resetForm,
} = formSlice.actions;
export default formSlice.reducer;