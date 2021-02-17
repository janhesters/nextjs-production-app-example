import 'styles/colors.css';

import { ThemeProvider } from '@emotion/react';
import type { AppProps } from 'next/app';
import { appWithTranslation } from 'next-i18next';
import { Provider } from 'react-redux';
import { useStore } from 'redux/store';
import GlobalStyles from 'styles/global-styles';
import theme from 'styles/theme';

function MyApp({ Component, pageProps }: AppProps) {
  const store = useStore(pageProps.initialReduxState);

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <GlobalStyles />

        <Component {...pageProps} />
      </ThemeProvider>
    </Provider>
  );
}

export default appWithTranslation(MyApp);
