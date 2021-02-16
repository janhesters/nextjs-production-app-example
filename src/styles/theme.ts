import { css, Theme } from '@emotion/react';
import { rem } from 'polished';

const borderWidth = {
  medium: css`
    ${rem(4)}
  `,
};

const padding = {
  medium: css`
    ${rem(16)}
  `,
};

const radius = {
  medium: css`
    ${rem(4)}
  `,
};

const size = {
  small: css`
    ${rem(16)};
  `,
  medium: css`
    ${rem(32)}
  `,
  large: css`
    ${rem(64)}
  `,
};

const width = {
  large: css`
    ${rem(1080)}
  `,
};

const theme: Theme = {
  borderWidth,
  padding,
  radius,
  size,
  width,
};

export default theme;
