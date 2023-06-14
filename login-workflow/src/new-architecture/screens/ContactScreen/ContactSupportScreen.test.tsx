import React from 'react';
import '@testing-library/jest-dom';
import { render, cleanup, screen, fireEvent } from '@testing-library/react';
import { ContactSupportScreen } from './ContactSupportScreen';

afterEach(cleanup);

describe('ContactSupportScreen tests', () => {
    let mockOnNext: any;

    afterEach(() => {
        jest.clearAllMocks();
    });

    beforeEach(() => {
        mockOnNext = jest.fn();
    });
    it('rendering the screen without any props', () => {
        render(<ContactSupportScreen />);
    });

    it('should display default content', () => {
        render(<ContactSupportScreen />);
        expect(screen.getByText('Contact Us')).toBeInTheDocument();
        expect(screen.getByText('General Questions')).toBeInTheDocument();
        expect(screen.getByText('something@email.com')).toBeInTheDocument();
        expect(screen.getByText('Emergency Support')).toBeInTheDocument();
        expect(screen.getByText('1-800-123-4567')).toBeInTheDocument();
        expect(screen.getByText('Okay')).toBeInTheDocument();
        expect(screen.getByText(/Okay/i)).toBeEnabled();
    });
    it('calls onNext when the Okay button is clicked', () => {
        const { getByText } = render(
            <ContactSupportScreen
                WorkflowCardActionsProps={{
                    onNext: mockOnNext(),
                    showNext: true,
                    nextLabel: 'Okay',
                }}
            />
        );

        const nextButton = getByText('Okay');
        fireEvent.click(nextButton);

        expect(mockOnNext).toHaveBeenCalled();
    });
});
