import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import common from '../../public/static/locales/en/common.json';
import landing from '../../public/static/locales/en/landing.json';

const resources = {
  en: {
    common,
    landing,
  },
};

i18n.use(initReactI18next).init({ fallbackLng: 'en', lng: 'en', resources });

export { i18n };
