import type { FC, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '../Icon';

interface Props {
  title?: string;
  leftIcon?: ReactNode;
  color?: string;
  rightElement?: ReactNode;
}

export const TopNav: FC<Props> = ({
  title = import.meta.env.VITE_APP_NAME,
  leftIcon,
  color,
  rightElement,
}) => {
  const nav = useNavigate();
  const goBack = () => {
    nav(-1);
  };
  return (
    <div flex items-center py-16px color={color ?? '[var(--color-primary)]'}>
      <span
        w-24px
        h-24px
        flex
        justify-center
        items-center
        children-w-24px
        children-h-24px
      >
        {leftIcon || <Icon name='arrow_left' size='24px' onClick={goBack} />}
      </span>
      <h1 ml-8px text-18px font-bold>
        {title}
      </h1>

      {rightElement && <div ml-auto>{rightElement}</div>}
    </div>
  );
};
