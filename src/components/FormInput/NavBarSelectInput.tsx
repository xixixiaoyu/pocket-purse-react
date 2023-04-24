import type { FC } from 'react';
import styled from 'styled-components';
import { Icon } from '../Icon';

type SelectInputOptions = { value: string; label: string }[];
export interface SelectInputProps {
  options: SelectInputOptions;
  value?: string;
  onChange?: (value: string) => void;
}

export const NavBarSelectInput: FC<SelectInputProps> = ({
  value,
  onChange,
  options,
}) => {
  return (
    <div
      flex
      gap-4px
      justify-center
      items-center
      color='[var(--color-primary)]'
    >
      <NavBarSelector
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
      >
        {options.map(({ value, label }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </NavBarSelector>

      <span rotate-90>
        <Icon name='arrow_right' size='14px' />
      </span>
    </div>
  );
};

const NavBarSelector = styled.select`
  border: none;
  outline: none;
  background: transparent;
  font-size: 16px;
  line-height: 100%;
  width: 100%;
  height: 100%;
  color: inherit;
  padding: 4px 0;
  font-weight: bold;

  -moz-appearance: none;
  -webkit-appearance: none;
  appearance: none;
`;
