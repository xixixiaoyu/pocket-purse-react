import React, { useEffect, useState } from 'react';
import { Input, Tab } from '../components';
import { time } from '../lib/time';
import type { Time } from '../lib/time';
import { usePopup } from './usePopup';

export type TimeRangeKeys =
  | 'thisMonth'
  | 'lastMonth'
  | 'pastThreeMonths'
  | 'thisYear'
  | 'custom';

type TimeRanges = {
  key: TimeRangeKeys;
  label: string;
}[];

export type TimeRangesParams = {
  key: Exclude<TimeRangeKeys, 'custom'>;
  label: string;
}[];

interface Options {
  ranges?: TimeRangesParams;
  custom?: boolean;
  rangeTimestamp?: number;
}

type UseTimeRange = (options: Options) => {
  start: Time;
  end: Time;
  TimeRangePicker: JSX.Element;
};

// 默认时间区间组
const defaultRanges: TimeRangesParams = [
  { key: 'thisMonth', label: '本月' },
  { key: 'lastMonth', label: '上月' },
  { key: 'pastThreeMonths', label: '近 90 天' },
  { key: 'thisYear', label: '本年' },
];

// 获取时间区间对应的时间范围
const getRanges = (key: TimeRangeKeys) => {
  let start = time();
  let end = time();
  switch (key) {
    case 'thisMonth':
      start = start.setDate({
        day: 1,
        hour: 0,
        minute: 0,
        second: 0,
        millisecond: 0,
      });
      break;
    case 'lastMonth':
      start = start.add(-1, 'month').setDate({
        day: 1,
        hour: 0,
        minute: 0,
        second: 0,
        millisecond: 0,
      });
      end = end.add(-1, 'month').lastDayOfMonth;
      break;
    case 'pastThreeMonths':
      start = start.add(-3, 'month');
      break;
    case 'thisYear':
      start = start.setDate({
        month: 1,
        day: 1,
        hour: 0,
        minute: 0,
        second: 0,
        millisecond: 0,
      });
      break;
    default:
      start = start.add(-1, 'month');
      break;
  }
  return { start, end };
};

export const useTimeRange: UseTimeRange = ({
  ranges = defaultRanges,
  custom = false,
  rangeTimestamp = 60 * 60 * 24 * 365 * 1000,
}) => {
  // 是否开启自定义时间
  const timeRanges: TimeRanges = [...ranges];
  if (custom) {
    timeRanges.push({ key: 'custom', label: '自定义时间' });
  }

  // 初始化时间范围
  const key = timeRanges[0].key;
  const [currentRange, setCurrentRange] = useState<TimeRangeKeys>(key);
  const [start, setStart] = useState<Time>(getRanges(key).start);
  const [end, setEnd] = useState<Time>(getRanges(key).end);

  const [customStart, setCustomStart] = useState<Time | null>(null);
  const [customEnd, setCustomEnd] = useState<Time | null>(null);
  const [outOfRange, setOutOfRange] = useState(false);
  const [canConfirm, setCanConfirm] = useState(false);

  // 限制时间范围
  useEffect(() => {
    if (!customStart || !customEnd) {
      setCanConfirm(false);
      setOutOfRange(false);
      return;
    }

    const diff =
      customEnd.setDate({ hour: 0, minute: 0, second: 0, millisecond: 0 })
        .timestamp -
      customStart.setDate({ hour: 0, minute: 0, second: 0, millisecond: 0 })
        .timestamp;
    if (Math.abs(diff) > rangeTimestamp + 86400000) {
      setOutOfRange(true);
      setCanConfirm(false);
    } else {
      setOutOfRange(false);
      setCanConfirm(true);
    }
  }, [customStart, customEnd, rangeTimestamp]);
  // 自定义时间弹窗
  const onConfirm = () => {
    setStart(customStart ?? time());
    setEnd(customEnd ?? time());
    close();
    setCurrentRange('custom');
    setCustomStart(null);
    setCustomEnd(null);
  };
  const { open, close, Popup } = usePopup({
    children: (
      <div bg-white p-16px rounded-12px w='72vw'>
        <h1 text-16px font-bold text-center mb-24px>
          请选择时间范围
        </h1>
        <Input
          type='date'
          placeholder='请选择开始日期'
          align='center'
          value={customStart ? customStart.date : customStart}
          onChange={(d) => {
            setCustomStart(time(d));
          }}
        />
        <Input
          type='date'
          placeholder='请选择结束日期'
          align='center'
          value={customEnd ? customEnd.date : customEnd}
          onChange={(d) => {
            setCustomEnd(time(d));
          }}
        />
        {outOfRange && (
          <p text-center color='#f56c6c' leading-32px mt='-32px' text-12px>
            时间范围最大为{rangeTimestamp / (60 * 60 * 24 * 1000)}天
          </p>
        )}
        <button pp-btn-primary onClick={onConfirm} disabled={!canConfirm}>
          确定
        </button>
      </div>
    ),
    position: 'center',
    closePointEvent: false,
    zIndex: 'var(--z-index-dialog)',
  });

  // 拦截 custom 选项，不立即修改 tab 选中项
  const changeCurrentRange = (key: TimeRangeKeys) => {
    if (key === 'custom') {
      open();
    } else {
      setCurrentRange(key);
    }
  };

  // 监听时间区间变化修改时间范围
  useEffect(() => {
    if (currentRange !== 'custom') {
      const { start: newStart, end: newEnd } = getRanges(currentRange);
      setStart(newStart);
      setEnd(newEnd);
    }
  }, [currentRange]);

  return {
    start,
    end,
    TimeRangePicker: (
      <>
        {Popup}
        <Tab
          items={timeRanges}
          value={currentRange}
          onChange={changeCurrentRange}
        />
      </>
    ),
  };
};
