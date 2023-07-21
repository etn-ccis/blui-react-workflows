import i18next from 'i18next';
import { AuthDictionaries } from './AuthDictionaries';
import { sharedDictionaries } from '../sharedDictionaries';

export const i18nAuthInstance = i18next.createInstance(
    {
        lng: 'en',
        fallbackLng: 'en',
        ns: ['bluiAuth', 'bluiCommon'],
        defaultNS: 'bluiAuth',
        load: 'languageOnly',
        detection: {
            order: ['querystring', 'localStorage', 'navigator'],
            caches: ['localStorage'],
            lookupLocalStorage: 'blui-authentication-i18nextLng',
        },
        react: { useSuspense: false },
        interpolation: { escapeValue: false },
        resources: {
            en: {
                bluiAuth: {
                    ...AuthDictionaries.english.translation,
                },
                bluiCommon: {
                    ...sharedDictionaries.english.translation,
                },
            },
            fr: {
                bluiAuth: {
                    ...AuthDictionaries.french.translation,
                },
                bluiCommon: {
                    ...sharedDictionaries.french.translation,
                },
            },
            es: {
                bluiAuth: {
                    ...AuthDictionaries.spanish.translation,
                },
                bluiCommon: {
                    ...sharedDictionaries.spanish.translation,
                },
            },
            zh: {
                bluiAuth: {
                    ...AuthDictionaries.chinese.translation,
                },
                bluiCommon: {
                    ...sharedDictionaries.chinese.translation,
                },
            },
            pt: {
                bluiAuth: {
                    ...AuthDictionaries.portuguese.translation,
                },
                bluiCommon: {
                    ...sharedDictionaries.portuguese.translation,
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

export default { i18nAuthInstance };
