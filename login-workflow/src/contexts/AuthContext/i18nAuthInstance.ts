import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { AuthDictionaries } from './AuthDictionaries';
import { SharedDictionaries } from '../SharedDictionaries';

export const i18nAuthInstance = 
    i18next
    .use(initReactI18next) // passes i18n down to react-i18next
    .use(LanguageDetector) // allows us to infer the language from browser language selection
    .init(
        {
            fallbackLng: 'en',
            ns: ['bluiAuth', 'bluiCommon'],
            defaultNS: 'bluiAuth',
            load: 'languageOnly',
            detection: {
                order: ['querystring', 'localStorage', 'navigator'],
                caches: ['localStorage'],
                lookupLocalStorage: 'blui-authentication-i18nextLng',
                lookupQuerystring: 'lng',
            },
            react: { useSuspense: false },
            interpolation: { escapeValue: false },
            resources: {
                en: {
                    bluiAuth: {
                        ...AuthDictionaries.english.translation,
                    },
                    bluiCommon: {
                        ...SharedDictionaries.english.translation,
                    },
                },
                fr: {
                    bluiAuth: {
                        ...AuthDictionaries.french.translation,
                    },
                    bluiCommon: {
                        ...SharedDictionaries.french.translation,
                    },
                },
                es: {
                    bluiAuth: {
                        ...AuthDictionaries.spanish.translation,
                    },
                    bluiCommon: {
                        ...SharedDictionaries.spanish.translation,
                    },
                },
                zh: {
                    bluiAuth: {
                        ...AuthDictionaries.chinese.translation,
                    },
                    bluiCommon: {
                        ...SharedDictionaries.chinese.translation,
                    },
                },
                pt: {
                    bluiAuth: {
                        ...AuthDictionaries.portuguese.translation,
                    },
                    bluiCommon: {
                        ...SharedDictionaries.portuguese.translation,
                    },
                },
            },
        },
        // We must provide a function as second parameter, otherwise i18next errors
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        (err, _t) => {
            // eslint-disable-next-line no-console
            if (err) return console.log(err);
        }
    );

export default i18nAuthInstance;
