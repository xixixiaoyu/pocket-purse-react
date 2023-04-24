import { useEffect, useState } from 'react';
import type { FC, ReactNode } from 'react';
import styled from 'styled-components';
import { Icon } from '../../components';

type KeyboardKeys =
  | '1'
  | '2'
  | '3'
  | '4'
  | '5'
  | '6'
  | '7'
  | '8'
  | '9'
  | '0'
  | '.'
  | 'backspace';

const keysMap: { k: ReactNode; v: KeyboardKeys; area: string }[] = [
  { k: '1', v: '1', area: '1 / 1 / 2 / 2' },
  { k: '2', v: '2', area: '1 / 2 / 2 / 3' },
  { k: '3', v: '3', area: '1 / 3 / 2 / 4' },
  { k: '4', v: '4', area: '2 / 1 / 3 / 2' },
  { k: '5', v: '5', area: '2 / 2 / 3 / 3' },
  { k: '6', v: '6', area: '2 / 3 / 3 / 4' },
  { k: '7', v: '7', area: '3 / 1 / 4 / 2' },
  { k: '8', v: '8', area: '3 / 2 / 4 / 3' },
  { k: '9', v: '9', area: '3 / 3 / 4 / 4' },
  { k: '0', v: '0', area: '4 / 1 / 5 / 3' },
  { k: '.', v: '.', area: '4 / 3 / 5 / 4' },
  {
    k: <Icon name='delete' size='28px' color='#606266' />,
    v: 'backspace',
    area: '1 / 4 / 2 / 5',
  },
];

interface Props {
  calendar: ReactNode;
  value?: number;
  onChange?: (value: number) => void;
}

export const AccountInput: FC<Props> = ({ calendar, value, onChange }) => {
  // 设置金额
  const [output, _setOutput] = useState(value ? (value / 100).toString() : '0');
  const addNum = (num: KeyboardKeys) => {
    const [yuan, jiao] = output.split('.');

    // 如果正在输入小数
    if (jiao !== undefined) {
      _setOutput((prev) => prev + num);
    }
    // 如果正在输入整数
    else if (yuan.length < 9) {
      _setOutput((prev) => prev + num);
    }
  };
  const setOutput = (value: KeyboardKeys) => {
    // 限制小数点后两位
    if (value !== 'backspace') {
      if (output.includes('.') && output.length - output.indexOf('.') > 2)
        return;
    }

    switch (value) {
      case '0':
        if (output !== '0') addNum(value);
        break;
      case '.':
        _setOutput((prev) => (output.includes('.') ? prev : prev + value));
        break;
      case 'backspace':
        _setOutput((prev) => (output.length > 1 ? prev.slice(0, -1) : '0'));
        break;
      default:
        if (output === '0') {
          _setOutput(value);
        } else {
          addNum(value);
        }
    }
  };

  useEffect(() => {
    onChange?.(Number(output) * 100);
  }, [output]);

  return (
    <div>
      <div font-bold bg='#00000009' flex b-t-1 b-t='#00000009' b-t-solid>
        {calendar}
        <p
          text-20px
          color-black
          text-right
          overflow-auto
          font-mono
          p-16px
          flex-1
        >
          ¥{output}
        </p>
      </div>

      <div grid grid-rows='[repeat(4,56px)]' grid-cols-4 gap-1px bg='#00000006'>
        {keysMap.map(({ k, v, area }) => (
          <Button
            type='button'
            key={v}
            area={area}
            onClick={() => setOutput(v)}
          >
            {k}
          </Button>
        ))}
        <Button type='submit' area='2 / 4 / 5 / 5' font='18px' primary>
          提交
        </Button>
      </div>
    </div>
  );
};

const Button = styled.button<{
  area: string;
  font?: string;
  primary?: boolean;
}>`
  grid-area: ${({ area }) => area};
  font-size: ${({ font }) => font ?? '24px'};
  background: ${({ primary }) => (primary ? 'var(--color-primary)' : '#fff')};
  color: ${({ primary }) => (primary ? '#fffe' : '#404244')};
  font-weight: bold;
  border: none;
  font-family: 'Heebo', sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;

  &:active {
    background: ${({ primary }) => (!primary ? '#ffaa5a33' : '#ffaa5a99')};
  }
`;
