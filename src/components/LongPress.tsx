import { useRef } from 'react';
import type { FC, ReactNode, TouchEventHandler } from 'react';

interface Props {
  className?: string;
  children?: ReactNode;
  onEnd?: Function;
}
export const LongPress: FC<Props> = ({ children, className, onEnd }) => {
  const startPointer = useRef<{ x: number; y: number } | null>(null);
  const timer = useRef<number | null>(null);
  const onTouchStart: TouchEventHandler<HTMLDivElement> = (e) => {
    const { clientX, clientY } = e.touches[0];
    startPointer.current = { x: clientX, y: clientY };
    timer.current = window.setTimeout(() => {
      onEnd?.();
    }, 900);
  };
  const onTouchMove: TouchEventHandler<HTMLDivElement> = (e) => {
    if (!startPointer.current) return;

    const { clientX, clientY } = e.touches[0];
    const distance = Math.sqrt(
      (clientY - startPointer.current.y) ** 2 +
        (clientX - startPointer.current.x) ** 2
    );

    // 如果移动距离超过 10px，则视为拖动 取消长按
    if (distance > 10) {
      startPointer.current = null;
      timer.current && window.clearTimeout(timer.current);
      timer.current = null;
    }
  };
  const onTouchEnd: TouchEventHandler<HTMLDivElement> = () => {
    if (timer.current) {
      window.clearTimeout(timer.current);
      timer.current = null;
    }
    startPointer.current = null;
  };

  return (
    <div
      className={className}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {children}
    </div>
  );
};
