import i18next from 'i18next';
import { RegistrationDictionaries } from './RegistrationDictionaries';
import { SharedDictionaries } from '../SharedDictionaries';

export const i18nRegistrationInstance = i18next.createInstance(
    {
        fallbackLng: 'en',
        ns: ['bluiRegistration', 'bluiCommon'],
        defaultNS: 'bluiRegistration',
        load: 'languageOnly',
        detection: {
            order: ['querystring', 'localStorage', 'navigator'],
            caches: ['localStorage'],
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
        // eslint-disable-next-line no-console
        if (err) return console.log(err);
    }
);

export default { i18nRegistrationInstance };
