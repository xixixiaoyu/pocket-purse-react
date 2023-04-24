import { useRef, useState } from 'react';
import type { FC } from 'react';
import styled from 'styled-components';
import { time } from '../lib/time';
import type { DateKind } from '../lib/time';
import { DatePickerColumn } from '../views/newItem/DatePickerColumn';

type ColumnKeys = 'year' | 'month' | 'day' | 'hour' | 'minute';
const titleMap: Record<ColumnKeys, string> = {
  year: '年',
  month: '月',
  day: '日',
  hour: '时',
  minute: '分',
};
interface Props {
  start?: Date;
  end?: Date;
  defaultValue?: Date;
  itemsHeight?: number;
  pickerHeight?: string;
  onConfirm?: (value: Date) => void;
  onCancel?: () => void;
  column?: ColumnKeys[];
}
export const DatePicker: FC<Props> = (props) => {
  const {
    start,
    end,
    pickerHeight = '38vh',
    defaultValue,
    onConfirm,
    onCancel,
    itemsHeight = 44,
    column = ['year', 'month', 'day'],
  } = props;

  // 获取三个时间的 Time 对象，默认年份往前推 5 年
  const startTime = start ? time(start) : time().add(-5, 'year');
  const endTime = end ? time(end) : time();
  // 保证 startTime < endTime
  if (startTime.timestamp > endTime.timestamp)
    throw new Error('startYear must be less than endYear');

  const [, update] = useState({});
  const valueTime = useRef(time(defaultValue ?? new Date()));
  const _onChange = (newValue: number, key: DateKind) => {
    // 如果日期变化，看日是否超出范围，超出则置为月份最后一天
    let maxDay = 31;
    if (key === 'month' || key === 'year') {
      const newDate = time();
      newDate.dateObject = {
        year: key === 'month' ? valueTime.current.year : newValue,
        month: key === 'year' ? valueTime.current.month : newValue,
        day: 1,
      };
      maxDay = newDate.lastDayOfMonth.day;
    }
    if (valueTime.current.day > maxDay) {
      valueTime.current.day = maxDay;
    }
    valueTime.current[key] = newValue;

    // 如果选择的时间晚于当前时间，置为当前时间
    if (valueTime.current.timestamp > endTime.timestamp) {
      valueTime.current.dateObject = endTime.dateObject;
    }

    update({});
  };

  // 计算年列表
  const yearList = Array.from(
    { length: endTime.year - startTime.year + 1 },
    (_, i) => i + startTime.year
  );

  // 计算月列表，今天之前
  let monthList: number[];
  if (valueTime.current.year === endTime.year) {
    monthList = Array.from({ length: endTime.month }, (_, i) => i + 1);
  } else {
    monthList = Array.from({ length: 12 }, (_, i) => i + 1);
  }

  // 计算日列表，今天之前
  let dayList: number[];
  if (
    valueTime.current.year === endTime.year &&
    valueTime.current.month === endTime.month
  ) {
    dayList = Array.from({ length: endTime.day }, (_, i) => i + 1);
  } else {
    dayList = Array.from(
      { length: valueTime.current.lastDayOfMonth.day },
      (_, i) => i + 1
    );
  }

  // 计算时列表，今天之前
  let hourList: number[];
  if (
    valueTime.current.year === endTime.year &&
    valueTime.current.month === endTime.month &&
    valueTime.current.day === endTime.day
  ) {
    hourList = Array.from({ length: endTime.hour + 1 }, (_, i) => i);
  } else {
    hourList = Array.from({ length: 24 }, (_, i) => i);
  }

  // 计算分列表，今天之前
  let minuteList: number[];
  if (
    valueTime.current.year === endTime.year &&
    valueTime.current.month === endTime.month &&
    valueTime.current.day === endTime.day &&
    valueTime.current.hour === endTime.hour
  ) {
    minuteList = Array.from({ length: endTime.minute + 1 }, (_, i) => i);
  } else {
    minuteList = Array.from({ length: 60 }, (_, i) => i);
  }

  const dataList = {
    year: yearList,
    month: monthList,
    day: dayList,
    hour: hourList,
    minute: minuteList,
  };

  return (
    <PickerWrapper style={{ '--panel-height': pickerHeight }}>
      <div
        text-14px
        grid
        grid-rows-1
        grid-cols='[auto_1fr_auto]'
        h-44px
        leading-44px
      >
        <span
          px-20px
          grid-row-start-1
          grid-col-start-1
          grid-row-end-1
          grid-col-end-2
          text-left
          color='#909399'
          onClick={onCancel}
        >
          取消
        </span>
        <span
          grid-row-start-1
          grid-col-start-2
          grid-row-end-1
          grid-col-end-3
          text-center
          font-bold
          text-16px
        >
          选择时间
        </span>
        <span
          px-20px
          grid-row-start-1
          grid-col-start-3
          grid-row-end-1
          grid-col-end-4
          text-right
          color='[var(--color-primary)]'
          onClick={() => onConfirm?.(valueTime.current.date)}
        >
          确认
        </span>
      </div>

      <ol
        flex
        text-center
        children-flex-1
        text-12px
        color='#c0c4cc'
        mt='[-6px]'
      >
        {column.map((key) => (
          <li key={key}>{titleMap[key]}</li>
        ))}
      </ol>

      <div flex grow-1 relative>
        <PickerMask />
        <Selector style={{ '--items-height': itemsHeight }} />
        {
          // 选择器
          column.map((key) => (
            <DatePickerColumn
              key={key}
              itemsHeight={itemsHeight}
              value={valueTime.current[key]}
              data={dataList[key]}
              onChange={(value) => _onChange(value, key)}
            />
          ))
        }
      </div>
    </PickerWrapper>
  );
};

// 选中高亮条
const Selector = styled.div<{ style: any }>`
  position: absolute;
  top: calc(50% - (var(--items-height) / 2) * 1px);
  background: #00000009;
  height: calc(var(--items-height) * 1px);
  left: 12px;
  right: 12px;
  border-radius: 12px;
`;

const PickerWrapper = styled.div<{ style: any }>`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 12px;
  height: var(--panel-height);
`;

const PickerMask = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 99;
  pointer-events: none;
  background: linear-gradient(
    0deg,
    #fff 0%,
    #fff9 35%,
    #fff0 45%,
    #fff0 50%,
    #fff0 55%,
    #fff9 65%,
    #fff 100%
  );
`;
