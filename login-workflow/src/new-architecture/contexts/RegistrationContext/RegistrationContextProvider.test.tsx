import React from 'react';
import { render, cleanup, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { RegistrationContextProvider } from './provider';
import i18next from 'i18next';
import { dictionaries } from './dictionaries';
import { useRegistrationContext } from './context';
import { RegistrationContextProviderProps } from './types';
import { renderHook } from '@testing-library/react-hooks';

afterEach(cleanup);

const i18nRegistrationInstance = i18next.createInstance(
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
        // @TODO: Handle this error state more graciously
        // eslint-disable-next-line no-console
        if (err) return console.log(err);
    }
);

describe('RegistrationContextProvider', () => {
    const defaultProps = {
        language: 'en',
        i18n: i18nRegistrationInstance,
        navigate: (): void => {},
        routeConfig: {},
    };

    it('should render RegistrationContextProvider without crashing', () => {
        render(<RegistrationContextProvider {...defaultProps}>Hello Registration</RegistrationContextProvider>);

        expect(screen.getByText('Hello Registration')).toBeInTheDocument();
    });

    it('should set values in the context', async () => {
        let values: {
            result: { current: RegistrationContextProviderProps };
        };

        const RegisterComponent: React.FC<React.PropsWithChildren<any>> = () => (
            <RegistrationContextProvider {...defaultProps} />
        );

        const CustomFlow: React.FC = () => {
            const Screen1: React.FC = () => {
                // eslint-disable-next-line
                values = renderHook((): RegistrationContextProviderProps => useRegistrationContext());
                return <div>Screen 1</div>;
            };

            return (
                <RegisterComponent>
                    <Screen1 />
                </RegisterComponent>
            );
        };

        render(<CustomFlow />);
        // eslint-disable-next-line
        await ((): void => expect(values.result.current.language).toBe('en'));
    });

    it('should read values from the context', async () => {
        let values: {
            result: { current: RegistrationContextProviderProps };
        };

        const RegisterComponent: React.FC<React.PropsWithChildren<any>> = () => (
            <RegistrationContextProvider {...defaultProps} />
        );

        const CustomFlow: React.FC = () => {
            const Screen1: React.FC = () => {
                // eslint-disable-next-line
                values = renderHook((): RegistrationContextProviderProps => useRegistrationContext());
                return <div>Screen 1</div>;
            };

            return (
                <RegisterComponent>
                    <Screen1 />
                </RegisterComponent>
            );
        };

        render(<CustomFlow />);
        // eslint-disable-next-line
        await ((): void => expect(values.result.current.language).toBe('en'));
    });

    it('should render multiple children', () => {
        render(
            <RegistrationContextProvider {...defaultProps}>
                <div>Child 1</div>
                <div>Child 2</div>
            </RegistrationContextProvider>
        );

        expect(screen.getByText('Child 1')).toBeInTheDocument();
        expect(screen.getByText('Child 2')).toBeInTheDocument();
    });
});
