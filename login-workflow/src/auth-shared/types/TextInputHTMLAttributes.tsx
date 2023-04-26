import { InputHTMLAttributes } from 'react';

/**
 * Extends InputHTMLAttributes by adding an `onChangeText` function so TS Linting doesn't complain in the tests.
 */
export type TextInputHTMLAttributes = InputHTMLAttributes<HTMLInputElement> & {
    // eslint-disable-next-line @typescript-eslint/ban-types
    onChangeText?: (((text: string) => void) & Function) | undefined;
};
