import { animated, useSpring } from '@react-spring/web';
import { useState } from 'react';
import type { FC, ReactNode } from 'react';
import { createPortal } from 'react-dom';

interface PopupProps {
  isVisible: boolean;
  setVisible: (value: boolean) => void;
  children: ReactNode;
  position: 'center' | 'bottom';
  closeOnClickMask: boolean;
  closePointEvent?: boolean;
  zIndex: number | string;
}

const PopupElement: FC<PopupProps> = ({
  isVisible,
  setVisible,
  children,
  position,
  closeOnClickMask,
  closePointEvent,
  zIndex,
}) => {
  const panelAnimation = useSpring({
    opacity: isVisible ? 1 : 0,
    visibility: (isVisible ? 'visible' : 'hidden') as 'visible' | 'hidden',
    transform:
      position === 'bottom' ? `translateY(${isVisible ? '0%' : '100%'})` : '',
  });

  const maskAnimation = useSpring({
    opacity: isVisible ? 1 : 0,
    pointerEvents: (isVisible ? 'auto' : 'none') as 'auto' | 'none',
  });

  const panel = () => {
    if (position === 'bottom') {
      return (
        <animated.div
          style={{ ...panelAnimation, zIndex }}
          fixed
          bottom-0
          left-0
          bg-white
          w-full
          min-w-16em
          flex
          flex-col
          touch-none
          rounded-t-12px
          overflow-hidden
        >
          {children}
        </animated.div>
      );
    } else if (position === 'center') {
      return (
        <animated.div
          style={{
            ...panelAnimation,
            pointerEvents: closePointEvent ? 'none' : 'auto',
            zIndex,
          }}
          fixed
          top='50%'
          left='50%'
          translate-x='-50%'
          translate-y='-50%'
          rounded-t-12px
          overflow-hidden
        >
          {children}
        </animated.div>
      );
    }
  };

  return (
    <>
      {panel()}
      <animated.div
        style={{ ...maskAnimation, zIndex: `calc(${zIndex} - 1)` }}
        fixed
        top-0
        left-0
        w-full
        h-full
        className='bg-black:56'
        onClick={() => closeOnClickMask && setVisible(false)}
        touch-none
      />
    </>
  );
};

interface UsePopupProps {
  children: ReactNode;
  position?: 'center' | 'bottom';
  closeOnClickMask?: boolean;
  closePointEvent?: boolean;
  zIndex?: string | number;
}

export const usePopup = ({
  children,
  position = 'bottom',
  closeOnClickMask = true,
  closePointEvent = true,
  zIndex = 'var(--z-index-popup)',
}: UsePopupProps) => {
  const [isVisible, setVisible] = useState(false);
  const Popup = createPortal(
    <PopupElement
      position={position}
      isVisible={isVisible}
      setVisible={setVisible}
      closeOnClickMask={closeOnClickMask}
      closePointEvent={closePointEvent}
      zIndex={zIndex}
    >
      {children}
    </PopupElement>,
    document.body
  );

  const open = () => setVisible(true);
  const close = () => setVisible(false);
  const toggle = () => setVisible((value) => !value);

  return {
    Popup,
    open,
    close,
    toggle,
  };
};
