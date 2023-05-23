import React from 'react';
import '@testing-library/jest-dom';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { RegistrationWorkflow, RegistrationWorkflowProps } from './RegistrationWorkflow';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

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
});
