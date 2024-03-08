import React from 'react';
import '@testing-library/jest-dom';
import { cleanup, render, screen, RenderResult, fireEvent, act, waitFor } from '@testing-library/react';
import { EulaScreen } from './EulaScreen';
import { RegistrationContextProvider } from '../../contexts';
import { EulaScreenProps } from './types';
import { RegistrationWorkflow } from '../../components';
import { registrationContextProviderProps } from '../../testUtils';

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

    const renderer = (props?: EulaScreenProps): RenderResult =>
        render(
            <RegistrationContextProvider {...registrationContextProviderProps}>
                <RegistrationWorkflow initialScreenIndex={0}>
                    <EulaScreen {...props} />
                </RegistrationWorkflow>
            </RegistrationContextProvider>
        );

    it('renders without crashing', async () => {
        renderer();
        await waitFor(() => expect(screen.getByText('License Agreement')).toBeInTheDocument);
    });

    it('should update values when passed as props', async () => {
        renderer({ WorkflowCardHeaderProps: { title: 'Test Title' } });
        await waitFor(() => {
            expect(screen.queryByText('License Agreement')).toBeNull();
            expect(screen.getByText('Test Title')).toBeInTheDocument();
        });
    });

    it('should update content of Eula Screen when eulaContent prop set ', () => {
        renderer({ eulaContent: 'Test Eula Content' });
        expect(screen.getByText('Test Eula Content')).toBeInTheDocument();
    });

    it('should show button when html prop is true', () => {
        renderer({ html: true, eulaContent: '<button>Submit</button>' });
        expect(
            screen.getByRole('button', {
                name: /Submit/i,
            })
        ).toBeVisible();
    });

    it('should show button element as as a string when html prop is true', () => {
        renderer({ html: false, eulaContent: '<button>Submit</button>' });
        expect(screen.getByText('<button>Submit</button>')).toBeInTheDocument();
    });

    it('should call onNext, when Next button clicked', async () => {
        const { getByLabelText } = renderer({
            WorkflowCardActionsProps: {
                onNext: mockOnNext(),
                showNext: true,
                nextLabel: 'Next',
            },
        });
        await waitFor(() => expect(screen.getByText('License Agreement')).toBeInTheDocument);
        const checkboxLabel = getByLabelText('I have read and agree to the Terms & Conditions');
        fireEvent.click(checkboxLabel);
        fireEvent.change(checkboxLabel, { target: { accepted: true } });

        const nextButton = screen.getByText('Next');
        expect(nextButton).toBeInTheDocument();
        await act(async () => {
            expect(await screen.findByText('Next')).toBeEnabled();
            fireEvent.click(nextButton);
        });
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
