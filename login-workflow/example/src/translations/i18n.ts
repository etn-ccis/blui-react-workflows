import i18next from 'i18next';
import { AppDictionaries } from './dictionary';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

void i18next
    .use(initReactI18next) // passes i18n down to react-i18next
    .use(LanguageDetector) // allows us to infer the language from browser language selection
    .init(
        {
            fallbackLng: 'en',
            ns: ['app'],
            defaultNS: 'app',
            load: 'languageOnly',
            detection: {
                order: ['querystring', 'localStorage', 'navigator'],
                caches: ['localStorage'],
                lookupLocalStorage: 'app-i18nextLng',
                lookupQuerystring: 'lng',
            },
            react: { useSuspense: false },
            interpolation: { escapeValue: false },
            resources: {
                en: {
                    app: {
                        ...AppDictionaries.english.translation,
                    },
                },
                fr: {
                    app: {
                        ...AppDictionaries.french.translation,
                    },
                },
                es: {
                    app: {
                        ...AppDictionaries.spanish.translation,
                    },
                },
                zh: {
                    app: {
                        ...AppDictionaries.chinese.translation,
                    },
                },
                pt: {
                    app: {
                        ...AppDictionaries.portuguese.translation,
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

export default i18next;
