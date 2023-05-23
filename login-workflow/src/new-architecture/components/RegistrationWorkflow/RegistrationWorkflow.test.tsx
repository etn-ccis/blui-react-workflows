import React from 'react';
import '@testing-library/jest-dom';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { RegistrationWorkflow, RegistrationWorkflowProps } from './RegistrationWorkflow';
import Typography from '@mui/material/Typography';

afterEach(cleanup);

const defaultProps: RegistrationWorkflowProps = {
    initialScreenIndex: 0,
};

describe('RegistrationWorkflow', () => {
    it('renders without crashing', () => {
        render(<RegistrationWorkflow {...defaultProps}>Screen 1</RegistrationWorkflow>);
        expect(screen.getByText('Screen 1')).toBeInTheDocument();
    });

    it('should render the default screens', () => {
        render(
            <RegistrationWorkflow
                {...defaultProps}
                children={[<Typography>Default 1</Typography>, <Typography>Default 2</Typography>]}
            />
        );
        expect(screen.getByText('Default 1')).toBeInTheDocument();
    });

    it('should render the correct default screens, when initialScreenIndex prop is passed', () => {
        render(
            <RegistrationWorkflow
                initialScreenIndex={1}
                children={[<Typography>Indexed Default 1</Typography>, <Typography>Indexed Default 2</Typography>]}
            />
        );
        expect(screen.queryByText('Indexed Default 1')).toBeNull();
        expect(screen.getByText('Indexed Default 2')).toBeInTheDocument();
    });

    it('should render the custom screens', () => {
        render(
            <RegistrationWorkflow initialScreenIndex={0}>
                <Typography>Custom 1</Typography>
                <Typography>Custom 2</Typography>
            </RegistrationWorkflow>
        );
        expect(screen.getByText('Custom 1')).toBeInTheDocument();
    });

    it('should render the correct screen, when initialScreenIndex prop is passed', () => {
        render(
            <RegistrationWorkflow initialScreenIndex={1}>
                <Typography>Indexed Custom 1</Typography>
                <Typography>Indexed Custom 2</Typography>
            </RegistrationWorkflow>
        );
        expect(screen.queryByText('Indexed Custom 1')).toBeNull();
        expect(screen.getByText('Indexed Custom 2')).toBeInTheDocument();
    });
});
