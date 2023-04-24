import { useEffect, useState } from 'react';
import type { RefObject } from 'react';

type Direction = 'left' | 'right' | 'up' | 'down' | null;
interface Options {
  onTouchStart?: (e: TouchEvent) => void;
  onTouchMove?: (e: TouchEvent) => void;
  onTouchEnd?: (e: TouchEvent) => void;
}
type UseSwipe = (
  refEl: RefObject<HTMLElement | null>,
  options?: Options
) => {
  direction: Direction;
};

export const useSwipe: UseSwipe = (refEl, options) => {
  const [direction, setDirection] = useState<Direction>(null);

  useEffect(() => {
    if (!refEl || !refEl.current) return;

    const el = refEl.current;
    const handleTouchStart = (e: TouchEvent) => {
      options?.onTouchStart?.(e);
      const touch = e.touches[0];
      const startX = touch.clientX;
      const startY = touch.clientY;

      const handleTouchMove = (e: TouchEvent) => {
        options?.onTouchMove?.(e);
        const touch = e.touches[0];
        const endX = touch.clientX;
        const endY = touch.clientY;

        const deltaX = endX - startX;
        const deltaY = endY - startY;

        if (Math.abs(deltaX) < 20 && Math.abs(deltaY) < 20) return;

        if (Math.abs(deltaX) > Math.abs(deltaY)) {
          setDirection(deltaX > 0 ? 'right' : 'left');
        }
        if (Math.abs(deltaY) > Math.abs(deltaX)) {
          setDirection(deltaY > 0 ? 'down' : 'up');
        }
      };

      const handleTouchEnd = () => {
        options?.onTouchEnd?.(e);
        el.removeEventListener('touchmove', handleTouchMove);
        el.removeEventListener('touchend', handleTouchEnd);
        setDirection(null);
      };

      el.addEventListener('touchmove', handleTouchMove);
      el.addEventListener('touchend', handleTouchEnd);
    };

    el.addEventListener('touchstart', handleTouchStart);

    return () => {
      el.removeEventListener('touchstart', handleTouchStart);
    };
  }, []);

  return { direction };
};
