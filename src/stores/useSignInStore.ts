import type { Partial } from '@react-spring/web';
import { create } from 'zustand';
import type { FormErrors } from '../lib/validate';

interface SignInStore {
  data: SignInData;
  errors: FormErrors<SignInData>;
  setData: (data: Partial<SignInData>) => void;
  setErrors: (errors: Partial<FormErrors<SignInData>>) => void;
}

export const useSignInStore = create<SignInStore>((set) => ({
  data: {
    email: '',
    authCode: '',
  },
  errors: {
    email: [],
    authCode: [],
  },
  setData: (data) => {
    set((oldState) => ({
      ...oldState,
      data: { ...oldState.data, ...data },
    }));
  },
  setErrors: (errors) => {
    set((oldState) => ({
      ...oldState,
      errors: { ...oldState.errors, ...errors },
    }));
  },
}));
