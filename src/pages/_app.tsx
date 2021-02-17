import 'styles/colors.css';

import { ThemeProvider } from '@emotion/react';
import type { AppProps } from 'next/app';
import { appWithTranslation } from 'next-i18next';
import { DefaultSeo } from 'next-seo';
import { Fragment } from 'react';
import { Provider } from 'react-redux';
import { useStore } from 'redux/store';
import GlobalStyles from 'styles/global-styles';
import theme from 'styles/theme';

import SEO from '../../next-seo.config';

function MyApp({ Component, pageProps }: AppProps) {
  const store = useStore(pageProps.initialReduxState);

  return (
    <Fragment>
      <DefaultSeo {...SEO} />

      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <GlobalStyles />

          <Component {...pageProps} />
        </ThemeProvider>
      </Provider>
    </Fragment>
  );
}

export default appWithTranslation(MyApp);
