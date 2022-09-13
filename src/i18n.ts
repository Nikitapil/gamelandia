import i18n from 'i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .use(Backend)
  .init({
    supportedLngs: ['en', 'ru'],
    fallbackLng: 'en',
    detection: {
      order: ['cookie', 'localStorage', 'htmlTag', 'path'],
      caches: ['cookie']
    },
    interpolation: {
      escapeValue: false
    },
    keySeparator: false,
    backend: {
      loadPath: '/gamelandia/locales/{{lng}}/translation.json'
    }
  });
export default i18n;
