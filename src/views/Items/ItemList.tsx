import { useState } from 'react';
import type { FC } from 'react';
import useSWRInfinite from 'swr/infinite';
import { Icon } from '../../components';
import { useRequest } from '../../hooks';
import { time } from '../../lib/time';

interface BottomBlockProps {
  type: 'error' | 'next' | 'loading' | 'noMore' | 'noData';
  onClick?: () => void;
}
const BottomBlock: FC<BottomBlockProps> = ({ type, onClick }) => {
  return (
    <div px-16px pt-16px pb-32px onClick={onClick}>
      {type === 'next' && <button pp-btn-info>加载更多</button>}
      {type !== 'next' && (
        <p h-48px text-center text-14px leading-48px color='#909399'>
          {type === 'error' && '加载失败，点击重试'}
          {type === 'loading' && '加载数据中'}
          {type === 'noMore' && '没有更多了'}
          {type === 'noData' && '还没有账单数据，快去添加吧'}
        </p>
      )}
    </div>
  );
};

interface Props {
  start: string;
  end: string;
}
const getKey = (start: string, end: string) => (pageIndex: number) => {
  return `/api/v1/items?page=${
    pageIndex + 1
  }&limit=30&happened_after=${start}&happened_before=${end}`;
};
export const ItemList: FC<Props> = ({ start, end }) => {
  // 加载更多状态
  const [loadingMore, setLoadingMore] = useState(false);

  const { request } = useRequest();

  // 请求数据
  const { data, error, size, setSize, isLoading } = useSWRInfinite(
    getKey(start, end),
    async (path) => {
      return new Promise<APIResponse.Items>((resolve, reject) => {
        request
          .get<APIResponse.Items>(path)
          .then((res) => {
            resolve(res.data);
          })
          .catch((err) => reject(err))
          .finally(() => setLoadingMore(false));
      });
    },
    { revalidateAll: true }
  );

  // 加载数据
  const loadData = (key: 'refresh' | 'next') => {
    setLoadingMore(true);
    setSize(key === 'refresh' ? size : size + 1);
  };

  // 首次加载中
  if (isLoading) {
    return <BottomBlock type='loading' />;
  } else {
    // 首次加载即失败
    if (!data && error) {
      return <BottomBlock type='error' onClick={() => loadData('refresh')} />;
    }
    // 加载成功
    else if (data) {
      return (
        <>
          <ul flex flex-col px-16px>
            {data
              ?.map((page) => page.resources)
              .flat()
              ?.map((item) => (
                <li
                  key={item.id}
                  py-16px
                  grid
                  grid-cols='[auto_1fr_auto]'
                  grid-rows-2
                  items-center
                  gap-y-6px
                  gap-x-12px
                  b-b-1
                  b-b-solid // b-b={index === items.length - 1 ? 'transparent' : '#0000000a'}
                  b-b='#0000000a'
                >
                  <div
                    grid-row-start-1
                    grid-col-start-1
                    grid-row-end-3
                    grid-col-end-2
                    w-48px
                    h-48px
                    flex
                    items-center
                    justify-center
                    text-20px
                    bg='#00000009'
                    rounded-24px
                  >
                    {item.tags[0].sign}
                  </div>
                  <p
                    grid-row-start-1
                    grid-col-start-2
                    grid-row-end-2
                    grid-col-end-3
                    text-14px
                    leading-14px
                    color='#303133'
                  >
                    {item.tags[0].name}
                  </p>
                  <p
                    grid-row-start-2
                    grid-col-start-2
                    grid-row-end-3
                    grid-col-end-4
                    text-12px
                    leading-12px
                    color='#909399'
                  >
                    {time(item.happened_at).format('yyyy-MM-dd HH:mm')}
                  </p>
                  <p
                    grid-row-start-1
                    grid-col-start-3
                    grid-row-end-2
                    grid-col-end-4
                    text-16px
                    leading-16px
                    font-bold
                    color={'#303133'}
                    flex
                    items-center
                    gap-4px
                  >
                    {item.kind === 'expenses' ? (
                      <Icon name='minus' size='10px' />
                    ) : null}
                    <span ml='[-2px]'>{`${item.amount / 100}`}</span>
                  </p>
                </li>
              ))}
          </ul>

          {(() => {
            if (data.length < size) {
              // 非首次加载失败
              if (!loadingMore && error) {
                return (
                  <BottomBlock
                    type='error'
                    onClick={() => loadData('refresh')}
                  />
                );
              }
              // 非首次加载中
              else if (loadingMore) {
                return <BottomBlock type='loading' />;
              }
              return null;
            }
            // 非首次加载成功
            else {
              const { total, size: resSize, page } = data[size - 1].pager;
              if (total === 0) return <BottomBlock type='noData' />;
              // 有下一页
              return total >
                resSize * (page - 1) + data[size - 1].resources.length ? (
                <BottomBlock type='next' onClick={() => loadData('next')} />
              ) : (
                <BottomBlock type='noMore' />
              );
            }
          })()}
        </>
      );
    }
  }
  return null;
};
