import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const Root = styled.div<{ small: boolean }>`
  animation: ${spin} 0.55s linear infinite;
  border-color: var(--primary-border);
  border-radius: 50%;
  border-style: solid;
  border-top-color: var(--primary);
  border-width: ${({ theme }) => theme.borderWidth.medium};
  height: ${({ small, theme }) => theme.size[small ? 'small' : 'medium']};
  width: ${({ small, theme }) => theme.size[small ? 'small' : 'medium']};
`;

export { Root };
