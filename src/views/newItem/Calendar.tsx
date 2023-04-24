import type { FC } from 'react';
import styled from 'styled-components';
import { Icon } from '../../components';
import { usePopup } from '../../hooks';
import { time } from '../../lib/time';
import { DatePicker } from '../../components/DatePicker';

interface Props {
  value?: Date;
  onChange?: (value: string) => void;
}

export const Calendar: FC<Props> = ({ value, onChange }) => {
  const { Popup, open, close } = usePopup({
    children: (
      <DatePicker
        defaultValue={value}
        onConfirm={(v) => {
          onChange?.(v.toISOString());
          close();
        }}
        onCancel={() => close()}
        column={['year', 'month', 'day', 'hour', 'minute']}
      />
    ),
  });

  return (
    <>
      {Popup}
      <CalendarWrapper onClick={open}>
        <Icon name='calendar' size='16px' color='[var(--color-primary)]' />
        <span>{time(value).format('yyyy-MM-dd HH:mm')}</span>
        <Icon name='arrow_right' size='16px' color='#c0c4cc' />
      </CalendarWrapper>
    </>
  );
};

const CalendarWrapper = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  font-size: 14px;
  margin: 8px 12px;
  padding: 0 12px;
  color: #303133;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 0 10px 0 #0000000c;
`;
