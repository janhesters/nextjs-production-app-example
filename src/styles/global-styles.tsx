import { css, Global } from '@emotion/react';
import useToggleOutline from 'hooks/use-toggle-outline';
import { rem } from 'polished';

function GlobalStyles() {
  const hideOutline = useToggleOutline();

  return (
    <Global
      styles={css`
        html {
          box-sizing: border-box;
        }
        *,
        *:before,
        *:after {
          box-sizing: inherit;
        }

        html,
        body,
        #__next {
          height: 100vh;
        }

        body {
          margin: ${rem(0)};
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
            Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        }

        #__next {
          display: flex;
          flex-direction: column;
        }

        a {
          text-decoration: none;
        }

        ul {
          list-style: none;
          margin: ${rem(0)};
          padding: ${rem(0)};
        }

        h1,
        h2,
        h3,
        h4,
        h5,
        h6,
        p {
          margin: ${rem(0)};
        }

        ${hideOutline &&
        css`
          outline: none;
        `}
      `}
    />
  );
}

export default GlobalStyles;
