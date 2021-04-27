/* eslint-disable @typescript-eslint/naming-convention */
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { translations } from '@pxblue/react-auth-shared';

void i18n
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
        resources: {
            // English
            en: translations.english,
            // French
            fr: translations.french,
            fr_US: translations.french,
            fr_CA: translations.french,
            fr_FR: translations.french,
            // Spanish
            es: translations.spanish,
            es_US: translations.spanish,
            es_MX: translations.spanish,
            es_ES: translations.spanish,
        },
        lng: 'es', // TODO get the device locale for the default
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false,
        },
    });

export default i18n;
