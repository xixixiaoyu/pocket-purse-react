import styled from 'styled-components';

export const TopNavGradient = styled.header<{ disableShadow?: boolean }>`
  --shadow-color: ${(props) => (props.disableShadow ? 'transparent' : '#0002')};
  flex-shrink: 0;
  flex-grow: 0;
  padding: 0 16px;
  background: linear-gradient(180deg, #ffefba 0%, #ffffff 100%);
  box-shadow: 0 0 24px 0 var(--shadow-color);
  z-index: var(--z-index-default);
`;

export const TopNavTransparent = styled.header`
  flex-shrink: 0;
  flex-grow: 0;
  padding: 0 16px;
  background: transparent;
`;
