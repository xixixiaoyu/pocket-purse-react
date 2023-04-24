import { useEffect, useState } from 'react';
import type { FC } from 'react';
import styled from 'styled-components';

const ColumnWrapper = styled.div<{ style: any }>`
  height: 100%;
  font-size: 18px;
  position: relative;
  overflow: hidden;
  flex: 1;

  > .list-wrapper {
    position: absolute;
    width: 100%;
    top: calc(50% - var(--items-height) / 2 * 1px);
  }
`;
const ColumnList = styled.ol<{ style: any }>`
  transform: translateY(calc(var(--axis-y) * 1px));
  transition: transform calc(var(--duration) * 1s) linear;

  > li {
    text-align: center;
    line-height: calc(var(--items-height) * 1px);
  }
`;

interface Props {
  value: number;
  itemsHeight: number;
  data: number[];
  onChange: (value: number) => void;
}
export const DatePickerColumn: FC<Props> = ({
  data,
  onChange,
  value,
  itemsHeight,
}) => {
  // 通用控制变量
  const [duration, setDuration] = useState(0);
  const [isTouching, setIsTouching] = useState(false);

  // 计算初始位置，选中 value
  const initialIndex = data.findIndex((item) => item === value);
  const [oldY, setOldY] = useState(0);
  const [translateY, setTranslateY] = useState(-initialIndex * itemsHeight);

  useEffect(() => {
    // 选中 value
    const index = data.findIndex((item) => item === value);
    setTranslateY(-index * itemsHeight);
  }, [initialIndex, value, data]);

  return (
    <ColumnWrapper
      style={{
        '--items-height': itemsHeight,
        '--duration': duration,
      }}
      // 手指按下时，记录按下位置，设置动画时间为 0
      onTouchStart={(e) => {
        setDuration(0);
        setIsTouching(true);
        setOldY(e.touches[0].clientY);
      }}
      // 手指移动时，计算移动距离，设置 translateY 跟随滚动
      onTouchMove={(e) => {
        if (isTouching) {
          const deltaY = e.touches[0].clientY - oldY;
          setTranslateY((prev) => prev + deltaY);
          setOldY(e.touches[0].clientY);
        }
      }}
      // 核心滚动逻辑，手指离开时计算位置动画到最近的位置
      onTouchEnd={() => {
        // 滚动到最近的年份
        // 取余数，判断余数大于一半，就向上或向下滚动一格
        const reminder = translateY % itemsHeight;
        // 滚动到最近的上面一格
        let target = translateY - reminder;
        // 如果余数大于一半，就再向下滚动一格
        if (Math.abs(reminder) > itemsHeight / 2) {
          target += reminder > 0 ? itemsHeight : -itemsHeight;
        }

        // 限制滚动范围
        target = Math.min(target, 0);
        target = Math.max(target, -itemsHeight * (data.length - 1));

        // 设置滚动位置和动画时间
        setTranslateY(target);
        setDuration(0.08);
        setIsTouching(false);

        // 设置选中的值
        const index = Math.abs(target / itemsHeight);
        onChange(data[index]);
      }}
    >
      <div className='list-wrapper'>
        <ColumnList style={{ '--axis-y': translateY }}>
          {data.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ColumnList>
      </div>
    </ColumnWrapper>
  );
};
