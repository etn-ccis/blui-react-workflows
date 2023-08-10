import React from 'react';
import '@testing-library/jest-dom';
import { render, cleanup, screen, fireEvent, RenderResult } from '@testing-library/react';
import { ContactSupportScreen } from './ContactSupportScreen';
import { ContactScreenProps } from './types';
import { AuthContextProvider } from '../../contexts';
import { BrowserRouter } from 'react-router-dom';
import { authContextProviderProps } from '../../testUtils';

afterEach(cleanup);

describe('ContactSupportScreen tests', () => {
    let mockOnNext: any;

    afterEach(() => {
        jest.clearAllMocks();
    });

    beforeEach(() => {
        mockOnNext = jest.fn();
    });
    const renderer = (props?: ContactScreenProps): RenderResult =>
        render(
            <AuthContextProvider {...authContextProviderProps}>
                <BrowserRouter>
                    <ContactSupportScreen {...props} />
                </BrowserRouter>
            </AuthContextProvider>
        );
    it('rendering the screen without any props', () => {
        renderer();

        expect(screen.getByText('Contact Us')).toBeInTheDocument();
    });

    it('should display default content', () => {
        renderer();
        expect(screen.getByText('Contact Us')).toBeInTheDocument();
        expect(screen.getByText('General Questions')).toBeInTheDocument();
        expect(screen.getByText('something@email.com')).toBeInTheDocument();
        expect(screen.getByText('Emergency Support')).toBeInTheDocument();
        expect(screen.getByText('1-800-123-4567')).toBeInTheDocument();
        expect(screen.getByText('Okay')).toBeInTheDocument();
        expect(screen.getByText(/Okay/i)).toBeEnabled();
    });

    it('calls onNext when the Okay button is clicked', () => {
        renderer({
            WorkflowCardActionsProps: {
                onNext: mockOnNext(),
                showNext: true,
                nextLabel: 'Next',
            },
        });

        const nextButton = screen.getByText('Okay');
        fireEvent.click(nextButton);

        expect(mockOnNext).toHaveBeenCalled();
    });
});
