import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './en.json';
import uk from './uk.json';

i18n.use(initReactI18next).init({
  fallbackLng: 'en',
  lng: 'en',
  resources: {
    en: { translation: en },
    uk: { translation: uk },
  },
  interpolation: {
    escapeValue: false,
  },
});

document.documentElement.lang = i18n.language || 'en';

export default i18n;
