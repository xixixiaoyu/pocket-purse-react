import type { FC } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import useSWR from 'swr';
import { useRequest, useTitle } from '../../hooks';
import { useLocalStorageStore } from '../../stores';
import noDataSvg from '../../assets/images/home/no_data.svg';

const EmptyView: FC = () => {
  const nav = useNavigate();
  return (
    <main pp-page-wrapper items-center justify-center px-16px gradient-primary>
      <img w-180px src={noDataSvg} alt='no data' />
      <h1 mt-32px font-bold text='#000a'>
        Welcome!
      </h1>
      <button pp-btn-primary mt-48px onClick={() => nav('/items/new')}>
        记一笔
      </button>
    </main>
  );
};

export const Home: FC = () => {
  const { request } = useRequest();
  const { hasRead, setHasRead } = useLocalStorageStore();
  if (!hasRead) {
    setHasRead(true);
  }

  useTitle('首页');

  const { data: userData, isLoading: userLoading } = useSWR('user', () =>
    request.get<APIResponse.User>('/api/v1/me', {
      loading: true,
      handleError: false,
    })
  );

  const { data: itemsData, isLoading: itemsLoading } = useSWR(
    userData?.data ? 'items' : null,
    () =>
      request.get<APIResponse.Items>('/api/v1/items', {
        loading: true,
        handleError: false,
      })
  );

  if (userLoading || itemsLoading) return null;
  if (itemsData?.data.resources && itemsData.data.resources.length > 0) {
    return <Navigate to='/items' />;
  }

  return <EmptyView />;
};
