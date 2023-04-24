import styled from 'styled-components';

type TabLayout = 'full' | 'scroll';
interface TabProps<T> {
  items: {
    key: T;
    label: string;
  }[];
  value: T;
  onChange: (value: T) => void;
  layout?: TabLayout;
}

const TabOl = styled.ol<{ layout: TabLayout }>`
  display: flex;
  gap: 12px;
  color: #909399;
  margin-top: 8px;
  font-size: 16px;
  font-weight: bold;
  overflow-x: ${({ layout }) => (layout === 'scroll' ? 'scroll' : 'hidden')};
  width: 100%;
  flex-wrap: nowrap;

  > li {
    flex-shrink: 0;
    flex-grow: ${({ layout }) => (layout === 'scroll' ? 0 : 1)};
    text-align: center;
    padding: 12px;
  }
`;

export const Tab = <T extends string>({
  items,
  value,
  onChange,
  layout = 'scroll',
}: TabProps<T>) => {
  return (
    <TabOl layout={layout} className={'hide-scrollbar'}>
      {items.map((item) => (
        <li
          key={item.key}
          className={value === item.key ? 'tag-active' : ''}
          onClick={() => onChange(item.key)}
        >
          {item.label}
        </li>
      ))}
    </TabOl>
  );
};
