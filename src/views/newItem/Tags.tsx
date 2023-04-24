import { useState } from 'react';
import type { FC } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import useSWRInfinite from 'swr/infinite';
import { Icon } from '../../components';
import { LongPress } from '../../components/LongPress';
import { useRequest } from '../../hooks';

interface BottomBlockProps {
  type: 'error' | 'next' | 'loading' | 'noMore' | 'clickToAdd';
  onClick?: () => void;
}

const BottomBlock: FC<BottomBlockProps> = ({ type, onClick }) => {
  return (
    <div px-16px pt-16px pb-32px onClick={onClick}>
      {type === 'next' && <button pp-btn-info>加载更多标签</button>}
      {type !== 'next' && (
        <p h-48px text-center text-14px leading-48px color='#909399'>
          {type === 'error' && '加载失败，点击重试'}
          {type === 'loading' && '加载标签中'}
          {type === 'noMore' && '没有更多标签了'}
          {type === 'clickToAdd' && '还没有标签哦，点击加号创建一个吧'}
        </p>
      )}
    </div>
  );
};

const IconWrapper = styled.div<{ selected?: boolean }>`
  width: 56px;
  height: 56px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #0000000b;
  border-radius: 28px;
  font-size: 24px;
  text-align: center;
  border-width: 2px;
  border-style: solid;
  border-color: ${({ selected }) =>
    selected ? 'var(--color-primary)' : 'transparent'};
`;

interface Props {
  currentType: ItemModel['kind'];
  value?: ItemModel['tag_ids'];
  onChange?: (value: ItemModel['tag_ids']) => void;
}
export const Tags: FC<Props> = ({ currentType, value, onChange }) => {
  const { request } = useRequest();

  // 加载更多状态
  const [loadingMore, setLoadingMore] = useState(false);
  const getKey = (pageIndex: number) => {
    return `/api/v1/tags?page=${pageIndex + 1}&limit=20&kind=${currentType}`;
  };
  // 请求数据
  const { data, error, size, setSize, isLoading } = useSWRInfinite(
    getKey,
    async (path) => {
      return new Promise<APIResponse.Tags>((resolve, reject) => {
        request
          .get<APIResponse.Tags>(path)
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

  // 跳转编辑页面
  const nav = useNavigate();
  const toEditTag = (id: number) => {
    nav(`/tags/edit/${id}`);
  };

  // 首次加载中
  if (isLoading) {
    return (
      <div grow-1>
        <BottomBlock type='loading' />
      </div>
    );
  } else {
    // 首次加载即失败
    if (!data && error) {
      return (
        <div grow-1>
          <BottomBlock type='error' onClick={() => loadData('refresh')} />
        </div>
      );
    }
    // 加载成功
    else if (data) {
      return (
        <div grow-1 overflow-auto>
          <ol
            grid
            grid-cols='[repeat(auto-fit,56px)]'
            grid-rows='[repeat(auto-fit,74px)]'
            gap-x-28px
            gap-y-20px
            justify-center
            p-16px
            px-10px
          >
            <li w-56px>
              <Link to={`/tags/new?kind=${currentType}`}>
                <IconWrapper>
                  <Icon size='20px' color='var(--color-primary)' name='add' />
                </IconWrapper>
              </Link>
            </li>
            {data
              .map((page) => page.resources)
              .flat()
              ?.map((tag, i) => (
                <li w-56px key={i} onClick={() => onChange?.([tag.id])}>
                  <LongPress onEnd={() => toEditTag(tag.id)}>
                    <IconWrapper selected={value?.includes(tag.id)}>
                      {tag.sign}
                    </IconWrapper>
                    <p
                      text-12px
                      leading-12px
                      mt-6px
                      text-center
                      color='#606266'
                      max-w-56px
                    >
                      {tag.name}
                    </p>
                  </LongPress>
                </li>
              ))}
          </ol>

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
              if (total === 0) return <BottomBlock type='clickToAdd' />;
              // 有下一页
              return total >
                resSize * (page - 1) + data[size - 1].resources.length ? (
                <BottomBlock type='next' onClick={() => loadData('next')} />
              ) : (
                <BottomBlock type='noMore' />
              );
            }
          })()}
        </div>
      );
    }
  }

  return null;
};
