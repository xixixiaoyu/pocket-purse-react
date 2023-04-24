import type { Partial } from '@react-spring/web';
import { create } from 'zustand';
import type { FormErrors } from '../lib/validate';

interface EditTagStore {
  data: Partial<TagModel>;
  errors: Partial<FormErrors<TagModel>>;
  setData: (data: Partial<TagModel>) => void;
  setErrors: (errors: FormErrors<Partial<TagModel>>) => void;
  resetData: () => void;
}

export const useEditTagStore = create<EditTagStore>((set) => ({
  data: {
    name: '',
    sign: '',
    kind: 'expenses',
  },
  errors: {
    name: [],
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
  resetData: () => {
    set((oldState) => ({
      ...oldState,
      data: {
        name: '',
        sign: '',
        kind: 'expenses',
      },
    }));
  },
}));
