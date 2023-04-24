import type { FC } from 'react';
import { useParams } from 'react-router-dom';
import saveMoney from '../../assets/images/welcome/save_money.svg';
import timeReminder from '../../assets/images/welcome/time_reminder.svg';
import dataChart from '../../assets/images/welcome/data_chart.svg';
import cloudBackup from '../../assets/images/welcome/cloud_backup.svg';

const contentMap: Record<Welcome.pageNum, Welcome.pageData> = {
  1: {
    title: '会挣钱',
    subTitle: '还要会省钱',
    pic: saveMoney,
    alt: 'save money',
  },
  2: {
    title: '每日提醒',
    subTitle: '不会遗漏每一笔账单',
    pic: timeReminder,
    alt: 'time reminder',
  },
  3: {
    title: '数据可视化',
    subTitle: '收支一目了然',
    pic: dataChart,
    alt: 'data chart',
  },
  4: {
    title: '云备份',
    subTitle: '再也不怕数据丢失',
    pic: cloudBackup,
    alt: 'cloud backup',
  },
};

export const Welcome: FC = () => {
  const { num } = useParams();
  const current = contentMap[num as Welcome.pageNum];
  return (
    <div>
      <img
        w-200px
        aspect-square
        src={current.pic}
        alt={current.alt}
        opacity-92
      />
      <h2
        flex
        flex-col
        items-center
        mt-36px
        text='[var(--color-black)]'
        text-xl
      >
        <span mb-8px>{current.title}</span>
        <span>{current.subTitle}</span>
      </h2>
    </div>
  );
};
