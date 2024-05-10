import i18n from 'i18next';
import { fr, enUS, es, zhCN, ptBR, Locale } from 'date-fns/locale';

// for getting the device's language locale
// 'en' is default deviceLocale

const getDateLocale = (): Locale => {
    switch (i18n.language) {
        case 'fr':
        case 'fr_US':
        case 'fr_FR':
        case 'fr_CA':
            return fr;
        case 'es':
        case 'es_US':
        case 'es_MX':
        case 'es_ES':
            return es;
        case 'zh':
        case 'zh_CN':
        case 'zh_TW':
            return zhCN;
        case 'pt':
        case 'pt_BR':
            return ptBR;
        default:
            return enUS;
    }
};

export const dateLocale = getDateLocale();
