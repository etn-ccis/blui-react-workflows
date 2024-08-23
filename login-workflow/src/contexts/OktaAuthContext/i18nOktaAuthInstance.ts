import i18next from 'i18next';
import { AuthDictionaries } from '../AuthContext/AuthDictionaries';
import { SharedDictionaries } from '../SharedDictionaries';
import { OktaAuthDictionaries } from './OktaAuthDictionaries';

export const i18nOktaAuthInstance = i18next.createInstance(
    {
        fallbackLng: 'en',
        ns: ['bluiAuth', 'bluiCommon', 'bluiOktaAuth'],
        defaultNS: 'bluiOktaAuth',
        load: 'languageOnly',
        detection: {
            order: ['querystring', 'localStorage', 'navigator'],
            caches: ['localStorage'],
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
                bluiOktaAuth: {
                    ...OktaAuthDictionaries.english.translation,
                },
            },
            fr: {
                bluiAuth: {
                    ...AuthDictionaries.french.translation,
                },
                bluiCommon: {
                    ...SharedDictionaries.french.translation,
                },
                bluiOktaAuth: {
                    ...OktaAuthDictionaries.french.translation,
                },
            },
            es: {
                bluiAuth: {
                    ...AuthDictionaries.spanish.translation,
                },
                bluiCommon: {
                    ...SharedDictionaries.spanish.translation,
                },
                bluiOktaAuth: {
                    ...OktaAuthDictionaries.spanish.translation,
                },
            },
            zh: {
                bluiAuth: {
                    ...AuthDictionaries.chinese.translation,
                },
                bluiCommon: {
                    ...SharedDictionaries.chinese.translation,
                },
                bluiOktaAuth: {
                    ...OktaAuthDictionaries.chinese.translation,
                },
            },
            pt: {
                bluiAuth: {
                    ...AuthDictionaries.portuguese.translation,
                },
                bluiCommon: {
                    ...SharedDictionaries.portuguese.translation,
                },
                bluiOktaAuth: {
                    ...OktaAuthDictionaries.portuguese.translation,
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

export default { i18nOktaAuthInstance };
