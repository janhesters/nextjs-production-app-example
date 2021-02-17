import { ThemeProvider } from '@emotion/react';
import { configureStore } from '@reduxjs/toolkit';
import { render } from '@testing-library/react';
import { ComponentType, ReactElement } from 'react';
import { I18nextProvider } from 'react-i18next';
import { Provider } from 'react-redux';
import { rootReducer, rootState } from 'redux/root-reducer';
import theme from 'styles/theme';

import { i18n as index18n } from './i18n';

const customRender = (ui: ReactElement, { reduxState = rootState } = {}) => {
  const store = configureStore({
    reducer: rootReducer,
    preloadedState: reduxState,
  });

  const AllTheProviders: ComponentType = ({ children }) => (
    <I18nextProvider i18n={index18n}>
      <Provider store={store}>
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
      </Provider>
    </I18nextProvider>
  );

  return render(ui, { wrapper: AllTheProviders });
};

export default customRender;
