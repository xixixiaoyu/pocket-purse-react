import { create } from 'zustand';

type ToastType = 'loading' | 'error' | 'success';
interface ToastStore {
  loading: {
    text: string;
    isOpen: boolean;
  };
  error: {
    text: string;
    isOpen: boolean;
  };
  success: {
    text: string;
    isOpen: boolean;
  };
  openToast: (options: {
    type: ToastType;
    text: string;
    duration?: number;
  }) => void;
  closeToast: (type: ToastType) => void;
}

export const useToastStore = create<ToastStore>((set, get) => ({
  loading: {
    text: '加载中...',
    isOpen: false,
  },
  error: {
    text: '出错了',
    isOpen: false,
  },
  success: {
    text: '成功',
    isOpen: false,
  },
  closeToast: (type) => {
    set((oldState) => ({
      ...oldState,
      [type]: { ...oldState[type], isOpen: false },
    }));
  },
  openToast: ({ type, text, duration = 2000 }) => {
    let timer: number | null = null;
    if (type !== 'loading') {
      timer = window.setTimeout(() => {
        timer !== null && clearTimeout(timer);
        get().closeToast(type);
      }, duration);
    }

    set((oldState) => ({
      ...oldState,
      [type]: {
        ...oldState[type],
        isOpen: true,
        text,
      },
    }));
  },
}));
