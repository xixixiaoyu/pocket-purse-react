import type { FC } from 'react';
import useSWR from 'swr';
import { useApi } from '../../api/useApi';

interface Props {
  start: string;
  end: string;
}

const getMoney = (money?: number) => {
  if (money === undefined) return '-';

  const sign = money >= 0 ? '' : '-';

  const yuan = Math.abs(money / 100);
  // 是整数
  if (yuan === parseInt(`${yuan}`)) {
    return `${sign}¥${yuan}`;
  } else {
    return `${sign}¥${yuan.toFixed(2)}`;
  }
};

export const ItemsSummary: FC<Props> = ({ start, end }) => {
  const { api } = useApi();
  const { data } = useSWR(`balance_${start}_${end}`, () =>
    api.item.getBalance(start, end)
  );

  return (
    <ul
      flex
      justify-between
      mx-16px
      my-24px
      py-16px
      px-36px
      rounded-12px
      bg='#0000000a'
      children-flex
      children-flex-col
      children-gap-8px
      children-justify-center
      children-items-center
    >
      <li>
        <h3 text-14px color='#909399'>
          收入
        </h3>
        <p text-20px color='#22ba58' font-bold>
          {getMoney(data?.data.income)}
        </p>
      </li>
      <li>
        <h3 text-14px color='#909399'>
          支出
        </h3>
        <p text-20px font-bold color='#dd400f'>
          {getMoney(data?.data.expenses)}
        </p>
      </li>
      <li>
        <h3 text-14px color='#909399'>
          结余
        </h3>
        <p text-20px font-bold color='#606266'>
          {getMoney(data?.data.balance)}
        </p>
      </li>
    </ul>
  );
};
