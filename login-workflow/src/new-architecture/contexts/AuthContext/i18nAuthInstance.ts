import i18next from 'i18next';
import { dictionaries } from './dictionaries';

export const i18nAuthInstance = i18next.createInstance(
    {
        lng: 'en',
        fallbackLng: 'en',
        ns: ['bluiAuth'],
        defaultNS: 'bluiAuth',
        react: { useSuspense: false },
        interpolation: { escapeValue: false },
        resources: {
            en: {
                bluiAuth: {
                    ...dictionaries.english.translation,
                },
            },
            fr: {
                bluiAuth: {
                    ...dictionaries.french.translation,
                },
            },
            es: {
                bluiAuth: {
                    ...dictionaries.spanish.translation,
                },
            },
            zh: {
                bluiAuth: {
                    ...dictionaries.chinese.translation,
                },
            },
            pt: {
                bluiAuth: {
                    ...dictionaries.portuguese.translation,
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
