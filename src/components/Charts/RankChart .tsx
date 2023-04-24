import type { FC } from 'react';
import styled from 'styled-components';
import { colorPalette } from '../../lib/colors';
import { Money } from '../Money';

interface Props {
  data: SummaryByTag[];
}

export const RankChart: FC<Props> = ({ data }) => {
  if (data.length === 0) {
    return (
      <div mt-16px flex flex-col gap-24px>
        <p text-center leading-72px color='#909399' text-14px>
          暂无数据
        </p>
      </div>
    );
  }

  // 排序
  data.sort((a, b) => b.amount - a.amount);
  // 计算总额
  let max = 0;
  const total = data.reduce((acc, cur) => {
    max = Math.max(max, cur.amount);
    return acc + cur.amount;
  }, 0);

  return (
    <div mt-16px flex flex-col gap-24px>
      {data.map(({ tag, amount }, index) => {
        return (
          <div
            key={tag.name}
            grid
            grid-rows-2
            grid-cols='[48px_1fr_1fr]'
            items-center
            px-12px
            gap-x-12px
            text-14px
          >
            <div
              style={{ gridArea: '1/1/3/2' }}
              w-48px
              h-48px
              bg='#0000000f'
              rounded-24px
              leading-48px
              text-center
              text-24px
            >
              {tag.sign}
            </div>
            <div style={{ gridArea: '1/2/2/3' }} color='#303133'>
              {tag.name} - {((amount / total) * 100).toFixed(1)}%
            </div>
            <div
              style={{ gridArea: '1/3/2/4' }}
              text-end
              text-16px
              font-bold
              color='#303133'
            >
              <Money value={amount} />
            </div>
            <ProgressBar
              style={{
                '--percent': `${(amount / max) * 100}%`,
                '--color1': colorPalette[index],
                '--color2': `${colorPalette[index]}66`,
              }}
            />
          </div>
        );
      })}
    </div>
  );
};

const ProgressBar = styled.div<{ style: any }>`
  grid-area: 2/2/3/4;
  background: #0000000f;
  border-radius: 6px;
  height: 12px;
  width: 100%;
  position: relative;
  overflow: hidden;

  &::before {
    position: absolute;
    content: '';
    display: block;
    height: 100%;
    width: var(--percent);
    border-radius: 6px;
    background: linear-gradient(90deg, var(--color1) 0%, var(--color2) 100%);
    animation: progress 1.2s ease-in-out;
  }

  @keyframes progress {
    0% {
      width: 0;
    }
    100% {
      width: var(--percent);
    }
  }
`;
