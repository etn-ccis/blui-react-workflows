/* eslint-disable @typescript-eslint/naming-convention */
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { translations } from '@pxblue/react-auth-shared';

void i18n
    .use(initReactI18next) // passes i18n down to react-i18next
    .use(LanguageDetector) // allows us to infer the language from browser language selection
    .init({
        load: 'languageOnly',
        detection: {
            order: ['querystring', 'localStorage', 'navigator'],
            caches: ['localStorage'],
            lookupLocalStorage: 'pxb-auth-i18nextLng',
        },
        whitelist: ['en', 'fr', 'es', 'zh'],
        ns: ['app', 'pxb'],
        defaultNS: 'app',
        fallbackNS: 'pxb',
        resources: {
            en: {
                pxb: translations.english.translation,
                app: {},
            },
            fr: {
                pxb: translations.french.translation,
                app: {},
            },
            es: {
                pxb: translations.spanish.translation,
                app: {},
            },
            zh: {
                pxb: translations.chinese.translation,
                app: {},
            },
        },
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false,
        },
    });

export default i18n;
