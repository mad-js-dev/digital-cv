import { createI18n } from 'vue-i18n'
import en from './locales/en.json'
import es from './locales/es.json'
import ca from './locales/ca.json'

const i18n = createI18n({
  legacy: false,
  locale: localStorage.getItem('lang') || 'en',
  fallbackLocale: 'en',
  globalInjection: true,
  messages: {
    en,
    es,
    ca
  }
}) as any; // Cast to any to bypass strict plugin type check for now

export default i18n
