import React, { useEffect } from 'react';
import type { FC } from 'react';
import { usePopup } from '../hooks';
import { useToastStore } from '../stores';
import { Icon } from './Icon';

interface Props {
  type: 'loading' | 'error' | 'success';
  text: string;
}

const ToastElement: FC<Props> = ({ type, text }) => {
  return (
    <div
      w-36vw
      aspect-square
      bg='#0009'
      rounded-12px
      flex
      flex-col
      items-center
      justify-center
      p-12px
      className={type === 'loading' ? 'pp-loading-wrapper' : ''}
    >
      <Icon name={type} color='#fffd' size='44px' />
      <p mt-16px color='#fffd' text-14px text-center>
        {text}
      </p>
    </div>
  );
};

// 全局 Toast
export const Toast = () => {
  const { loading, error, success } = useToastStore();
  const {
    open: loadingOpen,
    close: LoadingClose,
    Popup: LoadingPopup,
  } = usePopup({
    children: <ToastElement text={loading.text} type='loading' />,
    position: 'center',
    closeOnClickMask: false,
  });
  const {
    open: errorOpen,
    close: errorClose,
    Popup: errorPopup,
  } = usePopup({
    children: <ToastElement text={error.text} type='error' />,
    position: 'center',
    closeOnClickMask: false,
  });
  const {
    open: successOpen,
    close: successClose,
    Popup: successPopup,
  } = usePopup({
    children: <ToastElement text={success.text} type='success' />,
    position: 'center',
    closeOnClickMask: false,
  });

  useEffect(() => {
    loading.isOpen ? loadingOpen() : LoadingClose();
  }, [loading.isOpen]);

  useEffect(() => {
    error.isOpen ? errorOpen() : errorClose();
  }, [error.isOpen]);

  useEffect(() => {
    success.isOpen ? successOpen() : successClose();
  }, [success.isOpen]);

  return (
    <>
      {LoadingPopup} {errorPopup}
      {successPopup}
    </>
  );
};
