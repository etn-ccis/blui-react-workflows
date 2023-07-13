import React, { useCallback, useEffect, useState } from 'react';
import { EulaScreenProps } from './types';
import { EulaScreenBase } from './EulaScreenBase';
import { useLanguageLocale } from '../../hooks';
import { useRegistrationContext, useRegistrationWorkflowContext } from '../../contexts';

export const EulaScreen: React.FC<EulaScreenProps> = (props) => {
    const { t } = useLanguageLocale();
    const { actions, navigate, routeConfig, language } = useRegistrationContext();
    const regWorkflow = useRegistrationWorkflowContext();
    const { nextScreen, previousScreen, screenData } = regWorkflow;
    const {
        WorkflowCardHeaderProps,
        WorkflowCardActionsProps,
        onEulaAcceptedChange = (accepted: boolean): boolean => accepted,
        eulaContent,
        checkboxLabel = t('bluiRegistration:REGISTRATION.EULA.AGREE_TERMS'),
        initialCheckboxValue,
    } = props;

    const [eulaAccepted, setEulaAccepted] = useState(screenData.Eula.accepted ?? initialCheckboxValue);
    const [eulaLoaded, setEulaLoaded] = useState(true);
    const [eulaData, setEulaData] = useState<string>();

    const loadAndCacheEula = useCallback(async (): Promise<void> => {
        if (!eulaContent) {
            setEulaData(t('bluiRegistration:REGISTRATION.EULA.LOADING'));
            try {
                const eulaText = await actions().loadEula(language);
                setEulaData(eulaText);
                setEulaLoaded(false);
            } catch {
                setEulaLoaded(false);
                // TODO - Need better way to handle WorflowCard Error
                console.error(t('bluiRegistration:REGISTRATION.FAILURE_MESSAGE'));
            }
        }
    }, [eulaContent, language, actions, setEulaData, setEulaLoaded, t]);

    const onNext = useCallback(async (): Promise<void> => {
        setEulaLoaded(true);
        try {
            const acceptedEula = await actions().acceptEula();
            setEulaAccepted(acceptedEula);
            nextScreen({
                screenId: 'Eula',
                values: { accepted: acceptedEula },
            });
        } catch {
            console.error('Error while updating EULA acceptance...');
        }
        setEulaLoaded(false);
    }, [actions, nextScreen, setEulaAccepted, setEulaLoaded]);

    const onPrevious = useCallback(async (): Promise<void> => {
        setEulaLoaded(true);
        try {
            const acceptedEula = await actions().acceptEula();
            setEulaAccepted(acceptedEula);
            previousScreen({
                screenId: 'Eula',
                values: { accepted: acceptedEula },
            });
        } catch {
            console.error('Error while updating EULA acceptance...');
        }
        setEulaLoaded(false);
    }, [actions, previousScreen, setEulaAccepted, setEulaLoaded]);

    useEffect(() => {
        void loadAndCacheEula();
    }, [loadAndCacheEula]);

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
        currentStep: 0,
        totalSteps: 6,
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
                loading: eulaLoaded,
            }}
            checkboxLabel={checkboxLabel}
            checkboxProps={{ disabled: false }}
            initialCheckboxValue={eulaAccepted}
            onEulaAcceptedChange={onEulaAcceptedChange}
            WorkflowCardActionsProps={workflowCardActionsProps}
        />
    );
};
