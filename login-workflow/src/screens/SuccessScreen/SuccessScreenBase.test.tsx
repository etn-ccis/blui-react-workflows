import React from 'react';
import '@testing-library/jest-dom';
import { render, cleanup, screen, fireEvent } from '@testing-library/react';
import { SuccessScreenBase } from './SuccessScreenBase';
import { Circle } from '@mui/icons-material';

afterEach(cleanup);

describe('SuccessScreenBase tests', () => {
    let mockOnDismiss: any;

    afterEach(() => {
        jest.clearAllMocks();
    });

    beforeEach(() => {
        mockOnDismiss = jest.fn();
    });

    it('rendering the screen without any props', () => {
        render(<SuccessScreenBase icon={<Circle />} />);
    });

    it('renders without crashing', () => {
        render(
            <SuccessScreenBase
                WorkflowCardHeaderProps={{ title: 'Test' }}
                WorkflowCardActionsProps={{
                    canGoNext: true,
                    showNext: true,
                    nextLabel: 'Continue',
                    onNext: (): void => {},
                }}
                icon={<Circle />}
                messageTitle="Welcome"
                message="This is welcome page"
                onDismiss={mockOnDismiss}
            />
        );

        expect(screen.getByText('Test')).toBeInTheDocument();
        const continueButton = screen.getByTestId('BluiWorkflowCardActions-nextButton');
        fireEvent.click(continueButton);
    });
});
