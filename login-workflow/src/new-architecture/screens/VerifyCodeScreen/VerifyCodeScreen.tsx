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
    const { emailAddress } = screenData.CreateAccount;

    const [verifyCode, setVerifyCode] = useState(screenData.VerifyCode.code);
    const [isLoading, setIsLoading] = useState(false);

    const requestResendCode = useCallback(async (): Promise<void> => {
        try {
            setIsLoading(true);
            await actions().requestRegistrationCode(emailAddress ? emailAddress : '');
        } catch {
            console.error('Error fetching resend verification code!');
        } finally {
            setIsLoading(false);
        }
    }, [emailAddress, actions]);

    const {
        codeValidator = (code: string): boolean | string =>
            code?.length > 0 ? true : t('bluiRegistration:SELF_REGISTRATION.VERIFY_EMAIL.CODE_VALIDATOR_ERROR'),
        onResend = (): void => {
            void requestResendCode();
        },
        resendInstructions = t('bluiRegistration:SELF_REGISTRATION.VERIFY_EMAIL.VERIFICATION_CODE_PROMPT'),
        resendLabel = t('bluiCommon:ACTIONS.RESEND'),
        verifyCodeInputLabel = t('bluiRegistration:SELF_REGISTRATION.VERIFY_EMAIL.VERIFICATION'),
        initialValue = verifyCode,
    } = props;

    const handleOnNext = useCallback(
        async (code: string) => {
            try {
                setIsLoading(true);
                await actions().validateUserRegistrationRequest(code);
                nextScreen({
                    screenId: 'VerifyCode',
                    values: { code: code },
                });
            } catch {
                console.error('Error fetching validation code!');
            } finally {
                setIsLoading(false);
            }
        },
        [nextScreen, actions]
    );

    const onPrevious = (code: string): void => {
        previousScreen({
            screenId: 'VerifyCode',
            values: { code },
        });
    };

    const { WorkflowCardBaseProps, WorkflowCardHeaderProps, WorkflowCardInstructionProps, WorkflowCardActionsProps } =
        props;

    const workflowCardBaseProps = {
        loading: isLoading,
        ...WorkflowCardBaseProps,
    };

    const workflowCardHeaderProps = {
        title: t('bluiRegistration:REGISTRATION.STEPS.VERIFY_EMAIL'),
        ...WorkflowCardHeaderProps,
    };

    const workflowCardInstructionProps = {
        instructions: t('bluiRegistration:SELF_REGISTRATION.VERIFY_EMAIL.MESSAGE'),
        ...WorkflowCardInstructionProps,
    };

    const workflowCardActionsProps = {
        showNext: true,
        nextLabel: t('bluiCommon:ACTIONS.NEXT'),
        showPrevious: true,
        previousLabel: t('bluiCommon:ACTIONS.BACK'),
        canGoPrevious: true,
        currentStep: 1,
        totalSteps: 6,
        ...WorkflowCardActionsProps,
        onNext: (data: any): void => {
            setVerifyCode(data.code);
            void handleOnNext(data.code);
            WorkflowCardActionsProps?.onNext?.();
        },
        onPrevious: (data: any): void => {
            void onPrevious(data.code);
            WorkflowCardActionsProps?.onPrevious();
        },
    };

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
        />
    );
};
