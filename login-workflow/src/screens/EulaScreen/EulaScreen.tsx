import React, { useCallback, useEffect, useState } from 'react';
import { EulaScreenProps } from './types';
import { EulaScreenBase } from './EulaScreenBase';
import { useLanguageLocale } from '../../hooks';
import { useRegistrationContext, useRegistrationWorkflowContext } from '../../contexts';
import { useErrorManager } from '../../contexts/ErrorContext/useErrorManager';

export const EulaScreen: React.FC<EulaScreenProps> = (props) => {
    const { t } = useLanguageLocale();
    const { actions, navigate, routeConfig, language } = useRegistrationContext();
    const { triggerError, errorManagerConfig } = useErrorManager();
    const regWorkflow = useRegistrationWorkflowContext();
    const { nextScreen, previousScreen, screenData, currentScreen, totalScreens, isInviteRegistration } = regWorkflow;
    const {
        WorkflowCardHeaderProps,
        WorkflowCardActionsProps,
        onEulaAcceptedChange = (accepted: boolean): boolean => accepted,
        eulaContent,
        checkboxLabel = t('bluiRegistration:REGISTRATION.EULA.AGREE_TERMS'),
        initialCheckboxValue,
        errorDisplayConfig = errorManagerConfig,
    } = props;

    const [eulaAccepted, setEulaAccepted] = useState(screenData.Eula.accepted ?? initialCheckboxValue);
    const [isLoading, setIsLoading] = useState(true);
    const [eulaData, setEulaData] = useState<string>();
    const [isError, setIsError] = useState(false);

    const loadAndCacheEula = useCallback(async (): Promise<void> => {
        setIsLoading(true);
        if (!eulaContent) {
            setEulaData(t('bluiRegistration:REGISTRATION.EULA.LOADING'));
            try {
                const eulaText = await actions().loadEula(language);
                setEulaData(eulaText);
                setIsLoading(false);
                setIsError(false);
            } catch (_error) {
                // @TODO: we need to handle this failure more gracefully. The user should be able to attempt to reload the EULA and forward progress should be blocked
                triggerError(_error as Error);
                // @TODO: replace this hardcoded string with a proper error text translation
                // setEulaData('End user license agreement failed to load');
                // setEulaData(t('bluiRegistration:REGISTRATION.FAILURE_MESSAGE'));
                setIsError(true);
                setIsLoading(false);
            } finally {
                setIsLoading(false);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [eulaContent, t, actions, language]);

    const onNext = useCallback(async (): Promise<void> => {
        setIsLoading(true);
        try {
            const acceptedEula = await actions()?.acceptEula?.();
            setEulaAccepted(acceptedEula);
            let isAccExist;
            if (isInviteRegistration) {
                isAccExist = await actions().validateUserRegistrationRequest(
                    screenData.VerifyCode.code,
                    screenData.CreateAccount.emailAddress
                );
            }
            void nextScreen({
                screenId: 'Eula',
                values: { accepted: acceptedEula },
                isAccountExist: isAccExist,
            });
        } catch (_error) {
            console.error(_error);
            console.error('Error while updating EULA acceptance...');
            triggerError(_error as Error);
        } finally {
            setIsLoading(false);
        }
    }, [actions, nextScreen, triggerError, isInviteRegistration, screenData]);

    const onPrevious = useCallback(async (): Promise<void> => {
        setIsLoading(true);
        try {
            const acceptedEula = await actions().acceptEula();
            setEulaAccepted(acceptedEula);
            previousScreen({
                screenId: 'Eula',
                values: { accepted: acceptedEula },
            });
        } catch (_error) {
            console.error('Error while updating EULA acceptance...');
            triggerError(_error as Error);
        } finally {
            setIsLoading(false);
        }
    }, [actions, previousScreen, triggerError]);

    useEffect(() => {
        void loadAndCacheEula();
    }, [loadAndCacheEula]);

    const {
        onRefetch = (): void => {
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
            checkboxProps={{ disabled: isError }}
            initialCheckboxValue={eulaAccepted}
            onEulaAcceptedChange={onEulaAcceptedChange}
            WorkflowCardActionsProps={workflowCardActionsProps}
            errorDisplayConfig={errorDisplayConfig}
            onRefetch={onRefetch}
        />
    );
};
