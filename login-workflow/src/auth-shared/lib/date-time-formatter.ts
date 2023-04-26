import { formatDistance } from 'date-fns';
import { Clock } from '.';
import { dateLocale } from '../data/translations/i18n';

const formatDateTime = (dateTime: string | undefined | null, locales?: string | string[] | undefined): string =>
    dateTime ? new Date(dateTime).toLocaleString(locales) : '';

const formatMonthLong = (dateTime: string | undefined | null, locales?: string | string[] | undefined): string =>
    dateTime ? new Date(dateTime).toLocaleString(locales, { month: 'long' }) : '';

const formatDate = (dateTime: string | undefined | null, locales?: string | string[] | undefined): string =>
    dateTime ? new Date(dateTime).toLocaleDateString(locales) : '';

const formatDateShort = (dateTime: string | undefined | null, locales?: string | string[] | undefined): string =>
    dateTime
        ? new Date(dateTime).toLocaleDateString(locales, {
              month: '2-digit',
              day: '2-digit',
              year: '2-digit',
          })
        : '';

const formatTime = (dateTime: string | undefined | null, locales?: string | string[] | undefined): string =>
    dateTime ? new Date(dateTime).toLocaleTimeString(locales) : '';

const formatTimeShort = (dateTime: string | undefined | null, locales?: string | string[] | undefined): string =>
    dateTime
        ? new Date(dateTime).toLocaleTimeString(locales, {
              hour: '2-digit',
              minute: '2-digit',
          })
        : '';

const timeSince = (dateTime: string | undefined | null): string =>
    dateTime ? formatDistance(new Date(dateTime), Clock.now(), { locale: dateLocale, addSuffix: true }) : '';

export { formatDateTime, formatMonthLong, formatDate, formatDateShort, formatTime, formatTimeShort, timeSince };
