import React from 'react';
import { render, screen, cleanup, renderHook } from '@testing-library/react';
import '@testing-library/jest-dom';
import { RegistrationWorkflowContextProps, useRegistrationWorkflowContext } from '.';
import { RegistrationWorkflowContextProvider } from './provider';
import Typography from '@mui/material/Typography';
import { registrationWorkflowContextProps } from '../../testUtils';

afterEach(cleanup);

describe('RegistrationWorkflowContext', () => {
    it('should render RegistrationWorkflowContextProvider without crashing', () => {
        render(
            <RegistrationWorkflowContextProvider {...registrationWorkflowContextProps}>
                Test
            </RegistrationWorkflowContextProvider>
        );
        expect(screen.getByText('Test')).toBeInTheDocument();
    });

    it('should set values in the context', async () => {
        let values: {
            result: { current: RegistrationWorkflowContextProps };
        };

        const RegisterComponent: React.FC<React.PropsWithChildren<any>> = () => (
            <RegistrationWorkflowContextProvider {...registrationWorkflowContextProps} />
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

    // TODO: Rewrite this test case to test error throw by hook
    // it('should throw error, when context value is null', () => {
    //     const { result } = renderHook(() => useRegistrationWorkflowContext());
    //     expect(result.error.message).toBe(
    //         'useRegistrationWorkflowContext must be used within an RegistrationContextProvider'
    //     );
    // });
});
