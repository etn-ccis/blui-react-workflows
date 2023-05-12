import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';
import '@testing-library/jest-dom';
import { RegistrationWorkflowContextProps, useRegistrationWorkflowContext } from '.';
import { RegistrationWorkflowContextProvider } from './provider';
import Typography from '@mui/material/Typography';

afterEach(cleanup);

describe('RegistrationWorkflowContext', () => {
    const defaultProps: RegistrationWorkflowContextProps = {
        currentScreen: 0,
        totalScreens: 2,
        nextScreen: () => {},
        previousScreen: () => {},
        screenData: {
            Eula: { accepted: true },
            CreateAccount: { emailAddress: 'emailAddress@emailAddress.emailAddress' },
            VerifyCode: { code: '12345' },
            CreatePassword: { password: 'password', confirmPassword: 'confirmPassword' },
            AccountDetails: { firstName: 'firstName', lastName: 'lastName' },
        },
    };

    it('should render RegistrationWorkflowContextProvider without crashing', () => {
        render(<RegistrationWorkflowContextProvider {...defaultProps}>Test</RegistrationWorkflowContextProvider>);
        expect(screen.getByText('Test')).toBeInTheDocument();
    });

    it('should set values in the context', async () => {
        let values: {
            result: { current: RegistrationWorkflowContextProps };
        };

        const RegisterComponent: React.FC<React.PropsWithChildren<any>> = () => (
            <RegistrationWorkflowContextProvider {...defaultProps} />
        );

        const CustomFlow: React.FC = () => {
            const Screen1: React.FC = () => {
                // eslint-disable-next-line
                values = renderHook((): RegistrationWorkflowContextProps => useRegistrationWorkflowContext());
                return <Typography>Screen 1</Typography>;
            };

            return (
                <RegisterComponent>
                    <Screen1 />
                </RegisterComponent>
            );
        };

        render(<CustomFlow />);

        // eslint-disable-next-line
        await ((): void => expect(values.result.current.currentScreen).toBe(0));
        // eslint-disable-next-line
        await ((): void => expect(values.result.current.totalScreens).toBe(2));
        // eslint-disable-next-line
        await ((): void => expect(values.result.current.screenData['Eula'].accepted).toBeTruthy());
    });

    it('should throw error, when context value is null', () => {
        const { result } = renderHook(() => useRegistrationWorkflowContext());
        expect(result.error.message).toBe(
            'useRegistrationWorkflowContext must be used within an RegistrationContextProvider'
        );
    });
});
