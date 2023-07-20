import React from 'react';
import '@testing-library/jest-dom';
import { render, cleanup, screen, fireEvent } from '@testing-library/react';
import ErrorMessageBox from './ErrorMessageBox';

afterEach(cleanup);

describe('ErrorMessageBox', () => {
    it('renders without crashing', () => {
        render(<ErrorMessageBox errorMessage="Error Message" />);
        const messageBox = screen.getByText('Error Message');
        expect(messageBox).toBeInTheDocument();
    });

    it('dismisses when the Close icon is clicked', () => {
        const mockOnClose = jest.fn();
        render(<ErrorMessageBox errorMessage="Error Message" onClose={mockOnClose} />);
        const closeButton = screen.queryByTestId('error-message-box-close');
        expect(closeButton).toBeInTheDocument();
        fireEvent.click(closeButton);
        expect(mockOnClose).toHaveBeenCalledTimes(1);
    });

    it('does not render the Close icon when dismissible is false', () => {
        render(<ErrorMessageBox errorMessage="Error Message" dismissible={false} />);
        const closeButton = screen.queryByTestId('error-message-box-close');
        expect(closeButton).not.toBeInTheDocument();
    });
});
