import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import resources from './resources';
import { storage } from 'service';
import { STORAGE_KEY } from 'common';
import moment from 'moment';

const ns = Object.keys(Object.values(resources)[0]);
export const defaultNS = ns[0];

i18n.use(initReactI18next).init({
  ns,
  defaultNS,
  resources: {
    ...Object.entries(resources).reduce(
      (acc, [key, value]) => ({
        ...acc,
        [key]: value,
      }),
      {},
    ),
  },
  lng: storage.get(STORAGE_KEY.LANGUAGE) || 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false, // not needed for react as it escapes by default
  },
  compatibilityJSON: 'v3',
});

export default i18n;
