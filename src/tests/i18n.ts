import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import common from '../../public/locales/en/common.json';
import darkMode from '../../public/locales/en/dark-mode.json';
import errorBoundary from '../../public/locales/en/error-boundary.json';
import landing from '../../public/locales/en/landing.json';

const resources = {
  en: {
    common,
    'dark-mode': darkMode,
    'error-boundary': errorBoundary,
    landing,
  },
};

i18n.use(initReactI18next).init({ fallbackLng: 'en', lng: 'en', resources });

export { i18n };
