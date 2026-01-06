import * as Localization from 'expo-localization';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import { DEFAULT_LANGUAGE, en, es, pt, SUPPORTED_LANGUAGES } from '@/locales';

const resources = {
  en: { translation: en },
  pt: { translation: pt },
  es: { translation: es },
};

/**
 * Get device language code, fallback to default if not supported
 */
function getDeviceLanguage(): string {
  const deviceLocale = Localization.getLocales()[0]?.languageCode || DEFAULT_LANGUAGE;
  const isSupported = SUPPORTED_LANGUAGES.includes(
    deviceLocale as (typeof SUPPORTED_LANGUAGES)[number]
  );
  return isSupported ? deviceLocale : DEFAULT_LANGUAGE;
}

i18n.use(initReactI18next).init({
  resources,
  lng: getDeviceLanguage(),
  fallbackLng: DEFAULT_LANGUAGE,
  compatibilityJSON: 'v4',
  interpolation: {
    escapeValue: false, // React already escapes values
  },
  react: {
    useSuspense: false, // Avoid suspense in React Native
  },
});

export default i18n;

/**
 * Change the current language
 */
export function changeLanguage(lang: (typeof SUPPORTED_LANGUAGES)[number]) {
  return i18n.changeLanguage(lang);
}

/**
 * Get the current language
 */
export function getCurrentLanguage() {
  return i18n.language as (typeof SUPPORTED_LANGUAGES)[number];
}
