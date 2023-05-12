import i18next from 'i18next';
import { dictionaries } from './dictionaries';
import LanguageDetector from 'i18next-browser-languagedetector';

export const i18nRegistrationInstance = i18next.createInstance(
    {
        lng: 'en',
        fallbackLng: 'en',
        ns: ['bluiRegistration'],
        defaultNS: 'bluiRegistration',
        load: 'languageOnly',
        detection: {
            order: ['querystring', 'localStorage', 'navigator'],
            caches: ['localStorage'],
            lookupLocalStorage: 'blui-registration-i18nextLng',
        },
        react: { useSuspense: false },
        interpolation: { escapeValue: false },
        resources: {
            en: {
                bluiRegistration: {
                    ...dictionaries.english.translation,
                    test: 'test',
                },
            },
            fr: {
                bluiRegistration: {
                    ...dictionaries.french.translation,
                    test: 'test, but french',
                },
            },
            es: {
                bluiRegistration: {
                    ...dictionaries.spanish.translation,
                    test: 'test',
                },
            },
            zh: {
                bluiRegistration: {
                    ...dictionaries.chinese.translation,
                    test: 'test',
                },
            },
            pt: {
                bluiRegistration: {
                    ...dictionaries.portuguese.translation,
                    test: 'test',
                },
            },
        },
    },
    // We must provide a function as second parameter, otherwise i18next errors
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    (err, _t) => {
        // @TODO: Handle this error state more graciously
        // eslint-disable-next-line no-console
        if (err) return console.log(err);
    }
);

export default { i18nRegistrationInstance };
