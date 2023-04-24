import type { FC } from 'react';
import { Link } from 'react-router-dom';
import useSWR from 'swr';
import { useApi } from '../../api/useApi';

import logo from '../../assets/images/logo.svg';

interface Props {
  className?: string;
}
export const UserInfo: FC<Props> = ({ className }) => {
  const { api } = useApi();
  const { data } = useSWR('user', () => api.user.getUser());
  return (
    <Link
      to='/sign_in'
      className={className}
      pb-24px
      b-b-1
      b-b-solid
      b-b='#0001'
      flex
      gap-12px
      items-center
    >
      <div
        w-48px
        h-48px
        rounded-24px
        overflow-hidden
        b-2px
        b-solid
        b='[var(--color-primary)]'
      >
        <img w-full h-full src={logo} alt='' />
      </div>
      <div>
        <h1 text-18px font-bold color='#303133'>
          {data ? data.data.resource.name || '无名大侠' : '未登录用户'}
        </h1>
        <p text-14px color='#909399'>
          {data ? data.data.resource.email : '点击登录'}
        </p>
      </div>
    </Link>
  );
};
