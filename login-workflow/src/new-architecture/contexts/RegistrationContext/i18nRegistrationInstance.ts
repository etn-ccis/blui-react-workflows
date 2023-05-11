import i18next from 'i18next';
import { dictionaries } from './dictionaries';

export const i18nRegistrationInstance = i18next.createInstance(
    {
        lng: 'en',
        fallbackLng: 'en',
        ns: ['bluiRegistration'],
        defaultNS: 'bluiRegistration',
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
        // eslint-disable-next-line no-console
        if (err) return console.log(err);
    }
);

export default { i18nRegistrationInstance };
