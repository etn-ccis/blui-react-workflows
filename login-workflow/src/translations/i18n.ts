/* eslint-disable @typescript-eslint/naming-convention */
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { translations } from '@brightlayer-ui/react-auth-shared';

void i18n
    .use(initReactI18next) // passes i18n down to react-i18next
    .use(LanguageDetector) // allows us to infer the language from browser language selection
    .init({
        load: 'languageOnly',
        detection: {
            order: ['querystring', 'localStorage', 'navigator'],
            caches: ['localStorage'],
            lookupLocalStorage: 'blui-auth-i18nextLng',
        },
        whitelist: ['en', 'fr', 'es', 'zh'],
        ns: ['app', 'blui'],
        defaultNS: 'app',
        fallbackNS: 'blui',
        resources: {
            en: {
                blui: translations.english.translation,
                app: {},
            },
            fr: {
                blui: translations.french.translation,
                app: {},
            },
            es: {
                blui: translations.spanish.translation,
                app: {},
            },
            zh: {
                blui: translations.chinese.translation,
                app: {},
            },
        },
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false,
        },
    });

export default i18n;
