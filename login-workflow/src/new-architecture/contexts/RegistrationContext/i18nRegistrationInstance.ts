import i18next from 'i18next';
import { dictionaries } from './dictionaries';

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
                },
            },
            fr: {
                bluiRegistration: {
                    ...dictionaries.french.translation,
                },
            },
            es: {
                bluiRegistration: {
                    ...dictionaries.spanish.translation,
                },
            },
            zh: {
                bluiRegistration: {
                    ...dictionaries.chinese.translation,
                },
            },
            pt: {
                bluiRegistration: {
                    ...dictionaries.portuguese.translation,
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

export default { i18nRegistrationInstance };
