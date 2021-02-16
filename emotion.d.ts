import type { SerializedStyles } from '@emotion/react';

declare module '@emotion/react' {
  export interface Theme {
    borderWidth: {
      medium: SerializedStyles;
    };

    padding: {
      medium: SerializedStyles;
    };

    radius: {
      medium: SerializedStyles;
    };

    size: {
      small: SerializedStyles;
      medium: SerializedStyles;
      large: SerializedStyles;
    };

    width: {
      large: SerializedStyles;
    };
  }
}
