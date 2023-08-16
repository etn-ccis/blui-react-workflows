import i18next from 'i18next';
import { RegistrationDictionaries } from './RegistrationDictionaries';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { SharedDictionaries } from '../SharedDictionaries';

export const i18nRegistrationInstance = 
    i18next
    .use(initReactI18next) // passes i18n down to react-i18next
    .use(LanguageDetector) // allows us to infer the language from browser language selection
    .init(
    {
        fallbackLng: 'en',
        ns: ['bluiRegistration', 'bluiCommon'],
        defaultNS: 'bluiRegistration',
        load: 'languageOnly',
        detection: {
            order: ['querystring', 'localStorage', 'navigator'],
            caches: ['localStorage'],
            lookupLocalStorage: 'blui-registration-i18nextLng',
            lookupQuerystring: 'lng',
        },
        react: { useSuspense: false },
        interpolation: { escapeValue: false },
        resources: {
            en: {
                bluiRegistration: {
                    ...RegistrationDictionaries.english.translation,
                },
                bluiCommon: {
                    ...SharedDictionaries.english.translation,
                },
            },
            fr: {
                bluiRegistration: {
                    ...RegistrationDictionaries.french.translation,
                },
                bluiCommon: {
                    ...SharedDictionaries.french.translation,
                },
            },
            es: {
                bluiRegistration: {
                    ...RegistrationDictionaries.spanish.translation,
                },
                bluiCommon: {
                    ...SharedDictionaries.spanish.translation,
                },
            },
            zh: {
                bluiRegistration: {
                    ...RegistrationDictionaries.chinese.translation,
                },
                bluiCommon: {
                    ...SharedDictionaries.chinese.translation,
                },
            },
            pt: {
                bluiRegistration: {
                    ...RegistrationDictionaries.portuguese.translation,
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
        if (err) {
            throw new Error(`i18nRegistrationInstance error: ${err}`);
        }
    }
);

export default i18nRegistrationInstance;
