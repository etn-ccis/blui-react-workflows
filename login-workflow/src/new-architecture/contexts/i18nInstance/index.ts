import i18next from 'i18next';
import { translations } from '../../../auth-shared';

// export const i18n = i18next.createInstance(
//     {
//         lng: 'en',
//         fallbackLng: 'en',
//         ns: ['translation'],
//         defaultNS: 'translation',
//         react: { useSuspense: false },
//         interpolation: { escapeValue: false },
//         resources: {
//             en: { translation: require('./locales/en/translation.json') },
//             fr: { translation: require('./locales/fr/translation.json') },
//         },
//     },
//     // We must provide a function as second parameter, otherwise i18next errors
//     // eslint-disable-next-line @typescript-eslint/no-unused-vars
//     (err, _t) => {
//         // @TODO handle error
//         // eslint-disable-next-line no-console
//         if (err) return console.log(err);
//     }
// );

export const i18nRegistrationInstance = i18next.createInstance(
    {
        lng: 'en',
        fallbackLng: 'en',
        ns: ['translation'],
        defaultNS: 'translation',
        react: { useSuspense: false },
        interpolation: { escapeValue: false },
        resources: {
            en: {
                registration: {
                    test: 'Test',
                },
                blui: translations.english.translation,
                app: {},
            },
            fr: {
                registration: {
                    test: 'Test, but Im french',
                },
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
);
