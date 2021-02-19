import styled from '@emotion/styled';

const Heading = styled.h2`
  font-weight: 500;
  margin-bottom: 0;
`;

const Paragraph = styled.p``;

const Wrapper = styled.div`
  align-items: center;
  background-color: var(--primary-background);
  color: var(--primary-text);
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;
  text-align: center;
  width: 100%;

  > * {
    margin: ${({ theme }) => theme.padding.medium} 0;
  }
`;

export { Heading, Paragraph, Wrapper };
