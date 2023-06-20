import React from 'react';
import '@testing-library/jest-dom';
import { cleanup, fireEvent, render, screen, renderHook, act } from '@testing-library/react';
// import { act } from '@testing-library/react-hooks';
import { RegistrationWorkflow, RegistrationWorkflowProps } from './RegistrationWorkflow';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useRegistrationWorkflowContext } from '../../contexts';

afterEach(cleanup);

const defaultProps: RegistrationWorkflowProps = {
    initialScreenIndex: 0,
};

describe('RegistrationWorkflow', () => {
    it('renders without crashing', () => {
        render(<RegistrationWorkflow {...defaultProps}>Screen 1</RegistrationWorkflow>);
        expect(screen.getByText('Screen 1')).toBeInTheDocument();
    });

    it('should render the multiple screens', () => {
        render(
            <RegistrationWorkflow initialScreenIndex={0}>
                <Typography>Screen 1</Typography>
                <Typography>Screen 2</Typography>
            </RegistrationWorkflow>
        );
        expect(screen.getByText('Screen 1')).toBeInTheDocument();
    });

    it('should render the correct screen, when initialScreenIndex prop is passed', () => {
        render(
            <RegistrationWorkflow initialScreenIndex={1}>
                <Typography>Indexed Screen 1</Typography>
                <Typography>Indexed Screen 2</Typography>
            </RegistrationWorkflow>
        );
        expect(screen.queryByText('Indexed Screen 1')).toBeNull();
        expect(screen.getByText('Indexed Screen 2')).toBeInTheDocument();
    });

    it('should call nextScreen function', () => {
        const nextScreen = jest.fn();
        const { getByText } = render(
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
        );
        fireEvent.click(getByText('Next'));
        expect(nextScreen).toHaveBeenCalledWith({ screenId: 'Eula', values: { accepted: true } });
    });

    it('should set screen data for default registration workflow in the context', () => {
        const wrapper = ({ children }): JSX.Element => (
            <RegistrationWorkflow {...defaultProps}>{children}</RegistrationWorkflow>
        );
        const { result } = renderHook(() => useRegistrationWorkflowContext(), { wrapper });

        expect(result.current.screenData['Eula'].accepted).toBeFalsy();
        expect(result.current.screenData['CreateAccount'].emailAddress).toBe('');

        act(() => {
            result.current.nextScreen({ screenId: 'Eula', values: { accepted: true } });
        });
        act(() => {
            result.current.previousScreen({
                screenId: 'CreateAccount',
                values: { emailAddress: 'emailAddress@emailAddress.com' },
            });
        });

        expect(result.current.screenData['Eula'].accepted).toBeTruthy();
        expect(result.current.screenData['CreateAccount'].emailAddress).toBe('emailAddress@emailAddress.com');
    });

    it('should set screen data for custom registration workflow in the context', () => {
        const wrapper = ({ children }): JSX.Element => (
            <RegistrationWorkflow {...defaultProps}>{children}</RegistrationWorkflow>
        );
        const { result } = renderHook(() => useRegistrationWorkflowContext(), { wrapper });

        act(() => {
            result.current.nextScreen({ screenId: 'Screen1', values: { test: 'test' } });
        });
        act(() => {
            result.current.previousScreen({
                screenId: 'Screen2',
                values: { test2: 'test2' },
            });
        });
        /* @ts-ignore */
        expect(result.current.screenData['Other']['Screen1'].test).toBe('test');
        expect(result.current.screenData['Other']['Screen2'].test2).toBe('test2');
    });
});
