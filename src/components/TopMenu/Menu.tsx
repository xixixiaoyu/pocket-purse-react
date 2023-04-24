import type { FC } from 'react';
import { NavLink } from 'react-router-dom';
import { useToastStore } from '../../stores';
import { Icon } from '../Icon';

interface Props {
  className?: string;
}

const icons = [
  // {
  //   name: 'custom_tag',
  //   label: '记账',
  //   to: '/tags',
  // },
  {
    name: 'charts',
    label: '统计图表',
    to: '/statistics',
    isComingSoon: false,
  },
  {
    name: 'export_data',
    label: '导出数据',
    to: '/export',
    isComingSoon: true,
  },
  {
    name: 'account_reminder',
    label: '记账提醒',
    to: '/reminder',
    isComingSoon: true,
  },
];

export const Menu: FC<Props> = ({ className }) => {
  const { openToast } = useToastStore();
  const comingSoon = () => {
    openToast({
      text: '敬请期待',
      type: 'error',
    });
  };

  // TODO：确认对话框里
  const logout = () => {
    localStorage.removeItem('token');
    window.location.reload();
  };

  return (
    <ul className={className} py-24px flex flex-col>
      {icons.map(({ name, label, to, isComingSoon }) => (
        <li key={name}>
          <div onClick={isComingSoon ? comingSoon : undefined}>
            <NavLink
              to={isComingSoon ? '' : to}
              grid
              gap-12px
              items-center
              grid-rows-1
              grid-cols='[auto_1fr_auto]'
              py-16px
            >
              <Icon key={name} name={name} size='28px' color='#909399' />
              <p text-16px text='[var(--color-black)]'>
                {label}
              </p>
              <Icon
                name='arrow_right'
                size='20px'
                color='#c0c4cc'
                className='justify-self-end'
              />
            </NavLink>
          </div>
        </li>
      ))}

      <li
        mt-auto
        text-center
        color='#c0c4cc'
        flex
        flex-col
        gap-6px
        items-center
        onClick={logout}
      >
        <Icon name='power_off' size='20px' />
        <p text-14px>退出登录</p>
      </li>
    </ul>
  );
};
