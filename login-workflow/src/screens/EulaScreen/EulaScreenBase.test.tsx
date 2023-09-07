import React from 'react';
import '@testing-library/jest-dom';
import { cleanup, render, screen, fireEvent, RenderResult } from '@testing-library/react';
import { EulaScreenBase } from './EulaScreenBase';
import { RegistrationContextProvider } from '../../contexts';
import { EulaScreenProps } from './types';
import { RegistrationWorkflow } from '../../components';
import { registrationContextProviderProps } from '../../testUtils';
// Constants
import { SAMPLE_EULA } from '../../constants/index';

afterEach(cleanup);

const renderer = (props?: EulaScreenProps): RenderResult =>
    render(
        <RegistrationContextProvider {...registrationContextProviderProps}>
            <RegistrationWorkflow initialScreenIndex={0}>
                <EulaScreenBase {...props} />
            </RegistrationWorkflow>
        </RegistrationContextProvider>
    );

describe('Eula Screen Base', () => {
    renderer();
    it('renders without crashing', () => {
        render(
            <EulaScreenBase
                WorkflowCardHeaderProps={{ title: 'License Agreement' }}
                eulaContent={SAMPLE_EULA}
                checkboxLabel={'I have read and agree to the Terms & Conditions'}
                initialCheckboxValue={false}
                onEulaAcceptedChange={(accepted: boolean): boolean => accepted}
                WorkflowCardActionsProps={{
                    showNext: true,
                    nextLabel: 'Next',
                    canGoNext: true,
                    showPrevious: true,
                    previousLabel: 'Back',
                    canGoPrevious: true,
                    currentStep: 0,
                    totalSteps: 6,
                }}
            />
        );
        expect(screen.getByText('License Agreement')).toBeInTheDocument();
        expect(screen.getByText('I have read and agree to the Terms & Conditions')).toBeInTheDocument();
        expect(screen.getByText('Next')).toBeInTheDocument();
        expect(screen.getByText('Back')).toBeInTheDocument();
        expect(screen.getByText(/Back/i)).toBeEnabled();
    });

    it('next button is disabled when eula not accepted', () => {
        render(
            <EulaScreenBase
                WorkflowCardHeaderProps={{ title: 'License Agreement' }}
                eulaContent={SAMPLE_EULA}
                checkboxLabel={'I have read and agree to the Terms & Conditions'}
                initialCheckboxValue={false}
                onEulaAcceptedChange={(accepted: boolean): boolean => accepted}
                WorkflowCardActionsProps={{
                    showNext: true,
                    nextLabel: 'Next',
                    canGoNext: true,
                    showPrevious: true,
                    previousLabel: 'Back',
                    canGoPrevious: true,
                    currentStep: 0,
                    totalSteps: 6,
                }}
            />
        );
        expect(screen.getByText('Next')).toBeInTheDocument();
        expect(screen.getByText('Next')).not.toBeEnabled();
    });

    it('next button is enabled when eula accepted', () => {
        const { getByLabelText, rerender } = render(
            <EulaScreenBase
                WorkflowCardHeaderProps={{ title: 'License Agreement' }}
                eulaContent={SAMPLE_EULA}
                checkboxLabel={'I have read and agree to the Terms & Conditions'}
                initialCheckboxValue={false}
                onEulaAcceptedChange={(accepted: boolean): boolean => accepted}
                WorkflowCardActionsProps={{
                    showNext: true,
                    nextLabel: 'Next',
                    canGoNext: true,
                    showPrevious: true,
                    previousLabel: 'Back',
                    canGoPrevious: true,
                    currentStep: 0,
                    totalSteps: 6,
                }}
            />
        );

        // Rerender to ensure state changes have taken effect
        rerender(
            <EulaScreenBase
                WorkflowCardHeaderProps={{ title: 'License Agreement' }}
                eulaContent={SAMPLE_EULA}
                checkboxLabel={'I have read and agree to the Terms & Conditions'}
                initialCheckboxValue={false}
                onEulaAcceptedChange={(accepted: boolean): boolean => accepted}
                WorkflowCardActionsProps={{
                    showNext: true,
                    nextLabel: 'Next',
                    canGoNext: true,
                    showPrevious: true,
                    previousLabel: 'Back',
                    canGoPrevious: true,
                    currentStep: 0,
                    totalSteps: 6,
                }}
            />
        );

        const checkboxLabel = getByLabelText('I have read and agree to the Terms & Conditions');
        fireEvent.click(checkboxLabel);
        fireEvent.change(checkboxLabel, { target: { accepted: true } });

        expect(screen.getByText('Next')).toBeInTheDocument();
        expect(screen.getByText('Next')).toBeEnabled();
    });
});
