import React from 'react';
import '@testing-library/jest-dom';
import { cleanup, fireEvent, render, screen, renderHook, act, RenderResult } from '@testing-library/react';
import { RegistrationWorkflow, RegistrationWorkflowProps } from './RegistrationWorkflow';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { RegistrationContextProvider, useRegistrationWorkflowContext } from '../../contexts';
import Box from '@mui/material/Box';
import { CreateAccountScreen } from '../../screens';
import { registrationContextProviderProps } from '../../testUtils';

afterEach(cleanup);

const defaultProps: RegistrationWorkflowProps = {
    initialScreenIndex: 0,
};

const renderer = (props = defaultProps): RenderResult =>
    render(
        <RegistrationContextProvider {...registrationContextProviderProps}>
            <RegistrationWorkflow {...props}>
                <Typography>Screen 1</Typography>
                <Typography>Screen 2</Typography>
            </RegistrationWorkflow>
        </RegistrationContextProvider>
    );

describe('RegistrationWorkflow', () => {
    it('renders without crashing', () => {
        renderer();
        expect(screen.getByText('Screen 1')).toBeInTheDocument();
    });

    it('should render the multiple screens', () => {
        renderer();
        expect(screen.getByText('Screen 1')).toBeInTheDocument();
    });

    it('should render the correct screen, when initialScreenIndex prop is passed', () => {
        renderer({ initialScreenIndex: 1 });
        expect(screen.queryByText('Screen 1')).toBeNull();
        expect(screen.getByText('Screen 2')).toBeInTheDocument();
    });

    it('should call nextScreen function', () => {
        const nextScreen = jest.fn();
        const { getByText } = render(
            <RegistrationContextProvider {...registrationContextProviderProps}>
                <RegistrationWorkflow>
                    <>
                        <Typography>Indexed Screen 1</Typography>
                        <Button
                            onClick={(): void => {
                                nextScreen({ screenId: 'Eula', values: { accepted: true } });
                            }}
                        >
                            Next
                        </Button>
                    </>
                    <Typography>Indexed Screen 2</Typography>
                </RegistrationWorkflow>
            </RegistrationContextProvider>
        );
        fireEvent.click(getByText('Next'));
        expect(nextScreen).toHaveBeenCalledWith({ screenId: 'Eula', values: { accepted: true } });
    });

    it('should set screen data for default registration workflow in the context', () => {
        const wrapper = ({ children }: any): JSX.Element => (
            <RegistrationContextProvider {...registrationContextProviderProps}>
                <RegistrationWorkflow {...defaultProps}>{children}</RegistrationWorkflow>
            </RegistrationContextProvider>
        );
        const { result } = renderHook(() => useRegistrationWorkflowContext(), { wrapper });

        expect(result.current.screenData['Eula'].accepted).toBeFalsy();
        expect(result.current.screenData['CreateAccount'].emailAddress).toBe('');

        act(() => {
            void result.current.nextScreen({ screenId: 'Eula', values: { accepted: true } });
        });
        act(() => {
            result.current.previousScreen({
                screenId: 'CreateAccount',
                values: { emailAddress: 'emailAddress@emailAddress.com' },
            });
        });

        expect(result.current.screenData['Eula'].accepted).toBeTruthy();

        void ((): void =>
            expect(result.current.screenData['CreateAccount'].emailAddress).toBe('emailAddress@emailAddress.com'));
    });

    it('should set screen data for custom registration workflow in the context', () => {
        const wrapper = ({ children }: any): JSX.Element => (
            <RegistrationContextProvider {...registrationContextProviderProps}>
                <RegistrationWorkflow {...defaultProps}>{children}</RegistrationWorkflow>
            </RegistrationContextProvider>
        );
        const { result } = renderHook(() => useRegistrationWorkflowContext(), { wrapper });

        act(() => {
            void result.current.nextScreen({ screenId: 'Screen1', values: { test: 'test' } });
        });
        act(() => {
            result.current.previousScreen({
                screenId: 'Screen2',
                values: { test2: 'test2' },
            });
        });
        expect(result.current.screenData['Other']['Screen1'].test).toBe('test');

        void ((): void => expect(result.current.screenData['Other']['Screen2'].test2).toBe('test2'));
    });

    it('should check for lower bound of initialScreenIndex props', () => {
        renderer({ initialScreenIndex: -1 });
        expect(screen.getByText('Screen 1')).toBeInTheDocument();
    });

    it('should check for upper bound of initialScreenIndex props', () => {
        renderer({ initialScreenIndex: 2 });
        expect(screen.getByText('Screen 2')).toBeInTheDocument();
    });

    it('should render custom success screen', () => {
        const props = defaultProps;
        defaultProps.successScreen = <Box>Success</Box>;
        const { getByLabelText, getByText } = render(
            <RegistrationContextProvider {...registrationContextProviderProps}>
                <RegistrationWorkflow {...props}>
                    <CreateAccountScreen />
                </RegistrationWorkflow>
            </RegistrationContextProvider>
        );
        const verifyEmailInput = getByLabelText('Email Address');
        fireEvent.change(verifyEmailInput, { target: { value: 'test@test.net' } });
        fireEvent.blur(verifyEmailInput);
        const nextButton = getByText('Next');
        expect(screen.getByText(/Next/i)).toBeEnabled();
        fireEvent.click(nextButton);

        void ((): void => expect(screen.getByText('Success')).toBeInTheDocument());
    });
});
