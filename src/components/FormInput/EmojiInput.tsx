import { useEffect, useRef, useState } from 'react';
import type { FC } from 'react';
import styled from 'styled-components';
import { emojis } from '../../lib/emojis';

export interface EmojiInputProps {
  value?: string;
  defaultTab?: string;
  onChange?: (emoji: string) => void;
}

export const EmojiInput: FC<EmojiInputProps> = ({
  value,
  defaultTab,
  onChange,
}) => {
  const [currentTab, setCurrentTab] = useState(defaultTab ?? emojis[0].key);
  const emojisPanel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    emojisPanel.current?.scrollTo({
      top: 0,
    });
  }, [currentTab]);

  return (
    <div
      flex-1
      overflow-auto
      flex
      flex-col
      b-1
      b-solid
      b='[var(--color-primary)]'
      rounded-12px
    >
      <ol
        flex
        overflow-auto
        className={'hide-scrollbar'}
        b-1
        b-b-solid
        b-b='#0000000f'
      >
        {emojis.map(({ key, name }) => (
          <TabItem
            key={key}
            onClick={() => setCurrentTab(key)}
            className={currentTab === key ? 'selected' : ''}
          >
            {name}
          </TabItem>
        ))}
      </ol>

      <div
        px-12px
        overflow-auto
        flex-1
        pt-8px
        pb-24px
        className={'hide-scrollbar'}
        grid
        grid-cols='[repeat(auto-fit,36px)]'
        grid-rows='[repeat(auto-fit,36px)]'
        gap-4px
        ref={emojisPanel}
        text-24px
      >
        {emojis
          .find(({ key }) => key === currentTab)
          ?.signs.map((sign) => (
            <EmojiItem
              key={sign}
              onClick={() => onChange?.(sign)}
              className={value === sign ? 'selected' : ''}
            >
              {sign}
            </EmojiItem>
          ))}
      </div>
    </div>
  );
};

const TabItem = styled.div`
  white-space: nowrap;
  padding: 8px 12px;
  border-bottom: 2px solid transparent;
  text-align: center;
  font-weight: bold;
  font-size: 14px;
  color: #909399;

  &.selected {
    border-color: var(--color-primary);
    color: var(--color-primary);
  }
`;

const EmojiItem = styled.span`
  border: 2px solid transparent;
  height: 36px;
  width: 36px;
  line-height: 32px;
  text-align: center;

  &.selected {
    border-color: var(--color-primary);
    background-color: #00000016;
    border-radius: 8px;
  }
`;
