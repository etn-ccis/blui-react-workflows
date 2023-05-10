import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import { renderHook } from '@testing-library/react';
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
        const CustomFlow = () => {
            const Screen1 = () => {
                values = renderHook(() => useRegistrationWorkflowContext());
                return <Typography>Screen 1</Typography>;
            };

            return (
                <RegisterComp>
                    <Screen1 />
                </RegisterComp>
            );
        };

        const RegisterComp: React.FC<React.PropsWithChildren<any>> = () => (
            <RegistrationWorkflowContextProvider {...defaultProps} />
        );
        render(<CustomFlow />);

        await (() => expect(values.result.current.currentScreen).toBe(0));
        await (() => expect(values.result.current.totalScreens).toBe(2));
        await (() => expect(values.result.current.screenData['Eula'].accepted).toBeTruthy());
    });
});
