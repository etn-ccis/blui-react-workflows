import React, { useCallback, useEffect, useState } from 'react';
import { EulaScreenProps } from './types';
import { EulaScreenBase } from './EulaScreenBase';
import { useLanguageLocale } from '../../hooks';
import { useRegistrationContext, useRegistrationWorkflowContext } from '../../contexts';
import { useErrorManager } from '../../contexts/ErrorContext/useErrorManager';

/**
 * Component that renders a screen displaying the EULA and requests acceptance via a checkbox.
 *
 * @param eulaContent the content to render for the EULA. Can be a plain string or HTML
 * @param html true if the EULA should be rendered as HTML
 * @param checkboxLabel label for the EULA checkbox
 * @param initialCheckboxValue used to pre-populate the checked/unchecked checkbox when the screen loads
 * @param checkboxProps used to set checkbox props
 * @param onEulaAcceptedChange used to test eula checkbox accepted
 * @param WorkflowCardBaseProps props that will be passed to the WorkflowCard component
 * @param WorkflowCardHeaderProps props that will be passed to the WorkflowCardHeader component
 * @param WorkflowCardInstructionProps props that will be passed to the WorkflowCardInstructions component
 * @param WorkflowCardActionsProps props that will be passed to the WorkflowCardActions component
 * @param errorDisplayConfig configuration for customizing how errors are displayed
 *
 * @category Component
 */

export const EulaScreen: React.FC<EulaScreenProps> = (props) => {
    const { t } = useLanguageLocale();
    const { actions, navigate, routeConfig, language } = useRegistrationContext();
    const { triggerError, errorManagerConfig } = useErrorManager();
    const errorDisplayConfig = {
        ...errorManagerConfig,
        ...props.errorDisplayConfig,
        onClose: (): void => {
            if (props.errorDisplayConfig && props.errorDisplayConfig.onClose) props.errorDisplayConfig.onClose();
            if (errorManagerConfig.onClose) errorManagerConfig?.onClose();
        },
    };
    const regWorkflow = useRegistrationWorkflowContext();
    const { nextScreen, previousScreen, screenData, currentScreen, totalScreens, isInviteRegistration } = regWorkflow;
    const {
        WorkflowCardHeaderProps,
        WorkflowCardActionsProps,
        onEulaAcceptedChange = (accepted: boolean): boolean => accepted,
        eulaContent,
        checkboxLabel = t('bluiRegistration:REGISTRATION.EULA.AGREE_TERMS'),
        html,
        initialCheckboxValue,
    } = props;
    const [eulaAccepted, setEulaAccepted] = useState(
        initialCheckboxValue ? initialCheckboxValue : screenData.Eula.accepted
    );
    const [isLoading, setIsLoading] = useState(true);
    const [eulaData, setEulaData] = useState<string | JSX.Element>();
    const [eulaFetchError, setEulaFetchError] = useState(false);

    const loadAndCacheEula = useCallback(async (): Promise<void> => {
        setIsLoading(true);
        if (!eulaContent) {
            setEulaData(t('bluiRegistration:REGISTRATION.EULA.LOADING'));
            try {
                const eulaText = await actions().loadEula(language);
                setEulaData(eulaText);
                setIsLoading(false);
            } catch (_error) {
                triggerError(_error as Error);
                setEulaFetchError(true);
                setIsLoading(false);
            } finally {
                setIsLoading(false);
            }
        } else {
            setIsLoading(false);
            setEulaData(eulaContent);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [eulaContent, t, actions, language]);

    const onNext = useCallback(async (): Promise<void> => {
        setIsLoading(true);
        try {
            await actions()?.acceptEula?.();
            setEulaAccepted(true);
            let isAccExist;
            if (isInviteRegistration) {
                isAccExist = await actions().validateUserRegistrationRequest(
                    screenData.VerifyCode.code,
                    screenData.CreateAccount.emailAddress
                );
            }
            void nextScreen({
                screenId: 'Eula',
                values: { accepted: true },
                isAccountExist: isAccExist,
            });
        } catch (_error) {
            triggerError(_error as Error);
        } finally {
            setIsLoading(false);
        }
    }, [actions, nextScreen, triggerError, isInviteRegistration, screenData]);

    const onPrevious = useCallback((): void => {
        setIsLoading(true);
        try {
            previousScreen({
                screenId: 'Eula',
                values: { accepted: eulaAccepted },
            });
        } catch (_error) {
            triggerError(_error as Error);
        } finally {
            setIsLoading(false);
        }
    }, [previousScreen, triggerError, eulaAccepted]);

    useEffect(() => {
        void loadAndCacheEula();
    }, [loadAndCacheEula]);

    const {
        checkboxProps = { ...props.checkboxProps, disabled: eulaFetchError },
        onRefetch = (): void => {
            setEulaFetchError(false);
            void loadAndCacheEula();
        },
    } = props;

    const workflowCardHeaderProps = {
        title: t('bluiRegistration:REGISTRATION.STEPS.LICENSE'),
        ...WorkflowCardHeaderProps,
    };

    const workflowCardActionsProps = {
        showNext: true,
        nextLabel: t('bluiCommon:ACTIONS.NEXT'),
        canGoNext: true,
        showPrevious: true,
        previousLabel: t('bluiCommon:ACTIONS.BACK'),
        canGoPrevious: true,
        currentStep: currentScreen,
        totalSteps: totalScreens,
        ...WorkflowCardActionsProps,
        onNext: (): void => {
            void onNext();
            WorkflowCardActionsProps?.onNext?.();
        },
        onPrevious: (): void => {
            void onPrevious();
            navigate(routeConfig.LOGIN);
            WorkflowCardActionsProps?.onPrevious?.();
        },
    };

    return (
        <EulaScreenBase
            WorkflowCardHeaderProps={workflowCardHeaderProps}
            eulaContent={eulaData}
            WorkflowCardBaseProps={{
                loading: isLoading,
            }}
            checkboxLabel={checkboxLabel}
            checkboxProps={checkboxProps}
            html={html}
            initialCheckboxValue={eulaAccepted}
            onEulaAcceptedChange={onEulaAcceptedChange}
            WorkflowCardActionsProps={workflowCardActionsProps}
            errorDisplayConfig={errorDisplayConfig}
            onRefetch={onRefetch}
        />
    );
};
