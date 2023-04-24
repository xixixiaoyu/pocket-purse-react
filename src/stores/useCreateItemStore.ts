import type { Partial } from '@react-spring/web';
import { create } from 'zustand';
import type { FormErrors } from '../lib/validate';

interface EditCreateItemStore {
  data: CreateItem;
  errors: FormErrors<CreateItem>;
  setData: (data: Partial<CreateItem>) => void;
  setErrors: (errors: FormErrors<Partial<CreateItem>>) => void;
  resetData: () => void;
}

export const useCreateItemStore = create<EditCreateItemStore>((set) => ({
  data: {
    kind: 'expenses',
    tag_ids: [],
    happen_at: new Date().toISOString(),
    amount: 0,
  },
  errors: {
    kind: [],
    tag_ids: [],
    happen_at: [],
    amount: [],
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
        kind: 'expenses',
        tag_ids: [],
        happen_at: new Date().toISOString(),
        amount: 0,
      },
    }));
  },
}));
