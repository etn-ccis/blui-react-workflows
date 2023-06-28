import React, { useCallback, useState } from 'react';
import { VerifyCodeScreenBase } from './VerifyCodeScreenBase';
import { VerifyCodeScreenProps } from './types';
import { useLanguageLocale } from '../../hooks';
import { useRegistrationContext, useRegistrationWorkflowContext } from '../../contexts';

/**
 * Component that renders a screen that prompts a user to enter the confirmation code
 * that was sent to the email address that they used to register.
 *
 * @param codeValidator used to test the input for valid formatting
 * @param onResend function to call when the user clicks the 'resend code' button
 * @param resendInstructions text to display ahead of the resend link/button
 * @param resendLabel label for the resend link/button
 * @param initialValue code used to pre-populate the field
 *
 * @category Component
 */

export const VerifyCodeScreen: React.FC<VerifyCodeScreenProps> = (props) => {
    const { t } = useLanguageLocale();
    const regWorkflow = useRegistrationWorkflowContext();
    const { actions } = useRegistrationContext();
    const { nextScreen, previousScreen, screenData } = regWorkflow;

    const {
        codeValidator = (code: string): boolean | string =>
            code?.length > 0 ? true : t('bluiRegistration:SELF_REGISTRATION.VERIFY_EMAIL.CODE_VALIDATOR_ERROR'),
        onResend,
        resendInstructions = t('bluiRegistration:SELF_REGISTRATION.VERIFY_EMAIL.VERIFICATION_CODE_PROMPT'),
        resendLabel = t('bluiCommon:ACTIONS.RESEND'),
        verifyCodeInputLabel = t('bluiRegistration:SELF_REGISTRATION.VERIFY_EMAIL.VERIFICATION'),
        initialValue = screenData.VerifyCode.code,
    } = props;

    const [verifyCode, setVerifyCode] = useState(initialValue);
    const [isLoading, setIsLoading] = useState(false);

    const onNext = useCallback(() => {
        try {
            setIsLoading(true);
            void actions().validateUserRegistrationRequest(verifyCode);
            nextScreen({
                screenId: 'VerifyCode',
                values: { code: verifyCode },
            });
            setIsLoading(false);
        } catch {
            console.error('Error fetching validation code!');
        }
    }, [verifyCode, nextScreen, actions]);

    const onPrevious = useCallback(() => {
        previousScreen({
            screenId: 'VerifyCode',
            values: { code: verifyCode },
        });
    }, [verifyCode, previousScreen]);

    const {
        WorkflowCardBaseProps: workflowCardBaseProps = {
            loading: isLoading,
        },
        WorkflowCardHeaderProps: workflowCardHeaderProps = {
            title: t('bluiRegistration:REGISTRATION.STEPS.VERIFY_EMAIL'),
        },
        WorkflowCardInstructionProps: workflowCardInstructionProps = {
            instructions: t('bluiRegistration:SELF_REGISTRATION.VERIFY_EMAIL.MESSAGE'),
        },
        WorkflowCardActionsProps: workflowCardActionsProps = {
            showNext: true,
            nextLabel: t('bluiCommon:ACTIONS.NEXT'),
            showPrevious: true,
            previousLabel: t('bluiCommon:ACTIONS.BACK'),
            canGoPrevious: true,
            currentStep: 4,
            totalSteps: 6,
            onNext: (): void => {
                void onNext();
            },
            onPrevious: (): void => {
                void onPrevious();
            },
        },
    } = props;

    return (
        <VerifyCodeScreenBase
            WorkflowCardBaseProps={workflowCardBaseProps}
            WorkflowCardHeaderProps={workflowCardHeaderProps}
            WorkflowCardInstructionProps={workflowCardInstructionProps}
            WorkflowCardActionsProps={workflowCardActionsProps}
            resendInstructions={resendInstructions}
            resendLabel={resendLabel}
            verifyCodeInputLabel={verifyCodeInputLabel}
            initialValue={initialValue}
            onResend={onResend}
            codeValidator={codeValidator}
            updateCode={setVerifyCode}
        />
    );
};
