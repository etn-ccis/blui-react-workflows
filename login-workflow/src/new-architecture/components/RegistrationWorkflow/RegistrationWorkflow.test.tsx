import React from 'react';
import '@testing-library/jest-dom';
import { cleanup, fireEvent, render, screen, renderHook, act, RenderResult } from '@testing-library/react';
import { RegistrationWorkflow, RegistrationWorkflowProps } from './RegistrationWorkflow';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import {
    i18nRegistrationInstance,
    RegistrationContextProvider,
    RegistrationContextProviderProps,
    useRegistrationWorkflowContext,
} from '../../contexts';

afterEach(cleanup);

const defaultProps: RegistrationWorkflowProps = {
    initialScreenIndex: 0,
};

export const registrationContextProviderProps: RegistrationContextProviderProps = {
    language: 'en',
    i18n: i18nRegistrationInstance,
    navigate: (): void => {},
    routeConfig: {},
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

    it('should set screen data for default registration workflow in the context', async () => {
        const wrapper = ({ children }): JSX.Element => (
            <RegistrationContextProvider {...registrationContextProviderProps}>
                <RegistrationWorkflow {...defaultProps}>{children}</RegistrationWorkflow>
            </RegistrationContextProvider>
        );
        const { result } = renderHook(() => useRegistrationWorkflowContext(), { wrapper });

        expect(result.current.screenData['Eula'].accepted).toBeFalsy();
        expect(result.current.screenData['CreateAccount'].emailAddress).toBe('');

        // eslint-disable-next-line
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
        // eslint-disable-next-line
        await (() =>
            expect(result.current.screenData['CreateAccount'].emailAddress).toBe('emailAddress@emailAddress.com'));
    });

    it('should set screen data for custom registration workflow in the context', async () => {
        const wrapper = ({ children }): JSX.Element => (
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
        /* @ts-ignore */
        expect(result.current.screenData['Other']['Screen1'].test).toBe('test');
        // eslint-disable-next-line
        await (() => expect(result.current.screenData['Other']['Screen2'].test2).toBe('test2'));
    });

    it('should check for lower bound of initialScreenIndex props', () => {
        renderer({ initialScreenIndex: -1 });
        expect(screen.getByText('Screen 1')).toBeInTheDocument();
    });

    it('should check for upper bound of initialScreenIndex props', () => {
        renderer({ initialScreenIndex: 2 });
        expect(screen.getByText('Screen 2')).toBeInTheDocument();
    });
});
