/**
 * @packageDocumentation
 * @module Hooks
 * @internal
 */

import React from 'react';
import { useTranslation } from 'react-i18next';
import * as DateTimeFormatter from '../lib/date-time-formatter';
import { TFunction } from 'i18next';
import { FirstArgument, ThirdArgument } from '../types/general';

type TFunctionWithNoDataDefault = (key: FirstArgument<TFunction>, options?: ThirdArgument<TFunction>) => string;

export const useLanguageLocale = (): {
    t: TFunctionWithNoDataDefault;
    formatDateTime: (dateTime: string | undefined | null) => string;
    formatMonthLong: (dateTime: string | undefined | null) => string;
    formatDate: (dateTime: string | undefined | null) => string;
    formatDateShort: (dateTime: string | undefined | null) => string;
    formatTime: (dateTime: string | undefined | null) => string;
    formatTimeShort: (dateTime: string | undefined | null) => string;
    timeSince: (dateTime: string | undefined | null) => string;
} => {
    const { t, i18n } = useTranslation();

    const tFunctionWithNoDataDefault: TFunctionWithNoDataDefault = React.useCallback(
        (key, options) => {
            if (typeof options === 'object' && options.count === undefined) {
                // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
                return t(`${key}_noData`, { defaultValue: t(key, options), ...options });
            }

            return t(key, options);
        },
        [t]
    );

    return React.useMemo(
        () => ({
            t: tFunctionWithNoDataDefault,
            formatDateTime: (dateTime: string | undefined | null): string =>
                DateTimeFormatter.formatDateTime(dateTime, i18n.language),

            formatMonthLong: (dateTime: string | undefined | null): string =>
                DateTimeFormatter.formatMonthLong(dateTime, i18n.language),

            formatDate: (dateTime: string | undefined | null): string =>
                DateTimeFormatter.formatDate(dateTime, i18n.language),

            formatDateShort: (dateTime: string | undefined | null): string =>
                DateTimeFormatter.formatDateShort(dateTime, i18n.language),

            formatTime: (dateTime: string | undefined | null): string =>
                DateTimeFormatter.formatTime(dateTime, i18n.language),

            formatTimeShort: (dateTime: string | undefined | null): string =>
                DateTimeFormatter.formatTimeShort(dateTime, i18n.language),

            timeSince: (dateTime: string | undefined | null): string => DateTimeFormatter.timeSince(dateTime),
        }),
        [tFunctionWithNoDataDefault, i18n]
    );
};

export type LanguageLocale = ReturnType<typeof useLanguageLocale>;
