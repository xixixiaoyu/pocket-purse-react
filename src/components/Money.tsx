import type { FC } from 'react';

interface Props {
  value: number;
}

export const Money: FC<Props> = ({ value }) => {
  return <span>¥{(value / 100).toFixed(2)}</span>;
};
