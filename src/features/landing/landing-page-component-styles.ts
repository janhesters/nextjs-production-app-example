import styled from '@emotion/styled';
import { rem } from 'polished';

const Anchor = styled.a`
  color: var(--primary);

  &:active,
  &:focus,
  &:hover {
    text-decoration: underline;
  }
`;

const Heading = styled.h1`
  border-radius: ${({ theme }) => theme.radius.medium};
  border: ${rem(1)} solid var(--primary-border);
  padding: ${({ theme }) => theme.padding.medium};
`;

const Main = styled.main`
  align-items: center;
  background: var(--primary-background);
  color: var(--primary-text);
  display: flex;
  flex-direction: column;
  flex: 1;
  justify-content: center;
  padding: ${({ theme }) => theme.padding.medium};
`;

export { Anchor, Heading, Main };
