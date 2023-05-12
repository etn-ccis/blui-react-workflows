import i18next from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import { translations } from './translations';

export const i18nBluiInstance = i18next
    .createInstance(
        {
            lng: 'en',
            detection: {
                order: ['querystring', 'localStorage', 'navigator'],
                caches: ['localStorage'],
                lookupLocalStorage: 'blui-auth-i18nextLng',
            },
            fallbackLng: 'en',
            ns: ['blui', 'app'],
            defaultNS: 'app',
            fallbackNS: 'blui',
            react: { useSuspense: false },
            interpolation: { escapeValue: false },
            resources: {
                en: {
                    blui: translations.english.translation,
                    app: {},
                },
                fr: {
                    blui: translations.french.translation,
                    app: {},
                },
                es: { blui: translations.spanish.translation },
                app: {},

                zh: {
                    blui: translations.chinese.translation,
                    app: {},
                },
                pt: {
                    blui: translations.portuguese.translation,
                    app: {},
                },
            },
        },
        // We must provide a function as second parameter, otherwise i18next errors
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        (err, _t) => {
            // eslint-disable-next-line no-console
            if (err) return console.log(err);
        }
    )
    .use(initReactI18next)
    .use(LanguageDetector);

export default { i18nBluiInstance };
