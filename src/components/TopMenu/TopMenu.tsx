import { animated, useSpring } from '@react-spring/web';
import type { FC } from 'react';
import { useMenuStore } from '../../stores';
import { Menu } from './Menu';
import { UserInfo } from './UserInfo';

export const TopMenu: FC = () => {
  const { isVisible, setVisible } = useMenuStore();

  const menuAnimation = useSpring({
    opacity: isVisible ? 1 : 0,
    transform: `translateX(${isVisible ? '0%' : '-100%'})`,
  });

  const maskAnimation = useSpring({
    opacity: isVisible ? 1 : 0,
    pointerEvents: (isVisible ? 'auto' : 'none') as 'auto' | 'none',
  });

  return (
    <>
      <animated.div
        style={menuAnimation}
        fixed
        bg-white
        h-full
        w='2/3'
        min-w-16em
        flex
        flex-col
        p-16px
        z='[var(--z-index-menu)]'
      >
        <UserInfo className='grow-0 shrink-0' />
        <Menu className='grow-1 shrink-1' />
      </animated.div>
      <animated.div
        style={maskAnimation}
        fixed
        top-0
        left-0
        w-full
        h-full
        className='bg-black:56'
        z='[calc(var(--z-index-menu)-1)]'
        onClick={() => setVisible(false)}
      />
    </>
  );
};
