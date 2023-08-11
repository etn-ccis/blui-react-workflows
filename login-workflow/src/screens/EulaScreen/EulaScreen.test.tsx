import React from 'react';
import '@testing-library/jest-dom';
import { cleanup, render, screen, RenderResult, fireEvent } from '@testing-library/react';
import { EulaScreen } from './EulaScreen';
import { RegistrationContextProvider } from '../../contexts';
import { EulaScreenProps } from './types';
import { RegistrationWorkflow } from '../../components';
import { registrationContextProviderProps } from '../../testUtils';

type EulaFullScreenProps = EulaScreenProps & {
    title?: string;
};
afterEach(cleanup);

describe('Eula Screen', () => {
    let mockOnNext: any;
    let mockOnPrevious: any;

    afterEach(() => {
        jest.clearAllMocks();
    });

    beforeEach(() => {
        mockOnNext = jest.fn();
        mockOnPrevious = jest.fn();
    });

    const renderer = (props?: EulaFullScreenProps): RenderResult =>
        render(
            <RegistrationContextProvider {...registrationContextProviderProps}>
                <RegistrationWorkflow initialScreenIndex={0}>
                    <EulaScreen {...props} />
                </RegistrationWorkflow>
            </RegistrationContextProvider>
        );

    it('renders without crashing', () => {
        renderer();

        expect(screen.getByText('License Agreement')).toBeInTheDocument();
    });

    it('should update values when passed as props', () => {
        renderer({ WorkflowCardHeaderProps: { title: 'Test Title' } });

        expect(screen.queryByText('License Agreement')).toBeNull();
        expect(screen.getByText('Test Title')).toBeInTheDocument();
    });

    it('should show loader, when loading prop is passed to WorkflowCardBaseProps', () => {
        renderer({ WorkflowCardBaseProps: { loading: true } });

        expect(screen.getByText('Loading End User License Agreement...')).toBeInTheDocument();
    });

    it('should call onNext, when Next button clicked', () => {
        const { getByLabelText } = renderer({
            WorkflowCardActionsProps: {
                onNext: mockOnNext(),
                showNext: true,
                nextLabel: 'Next',
            },
        });

        const checkboxLabel = getByLabelText('I have read and agree to the Terms & Conditions');
        fireEvent.click(checkboxLabel);
        fireEvent.change(checkboxLabel, { target: { accepted: true } });

        const nextButton = screen.getByText('Next');
        expect(nextButton).toBeInTheDocument();
        expect(screen.getByText(/Next/i)).toBeEnabled();
        fireEvent.click(nextButton);
        expect(mockOnNext).toHaveBeenCalled();
    });

    it('should call onPrevious, when Back button clicked', () => {
        renderer({
            WorkflowCardActionsProps: {
                onPrevious: mockOnPrevious(),
                showPrevious: true,
                previousLabel: 'Back',
            },
        });

        const backButton = screen.getByText('Back');
        expect(backButton).toBeInTheDocument();
        expect(screen.getByText(/Back/i)).toBeEnabled();
        fireEvent.click(backButton);
        expect(mockOnPrevious).toHaveBeenCalled();
    });
});
