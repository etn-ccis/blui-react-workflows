/** eslint-ignore */
import React, { useCallback, useEffect, useState } from 'react';
import { EulaScreenProps } from './types';
import { useNavigate } from 'react-router';
import { EulaScreenBase } from './EulaScreenBase';
import { useLanguageLocale } from '../../hooks';
import { RegistrationUIActions, RegistrationContextProviderProps } from '../../contexts/RegistrationContext/types';
import {useRegistrationContext} from '../../contexts/RegistrationContext/context';

// Constants
import { SAMPLE_EULA } from '../../../constants';
// import { useRegistrationUIActions } from '../../../auth-shared';
const sleep = (ms: number): Promise<void> => new Promise((resolve) => setTimeout(resolve, ms));


type EulaFullScreenProps = EulaScreenProps &  {
    // the content to render for the title.
    title?: string;
};


export const EulaScreen: React.FC<EulaFullScreenProps> = (props) => {
    const navigate = useNavigate();
    const { t } = useLanguageLocale();
    const result = useRegistrationContext();
    // const UIActions = useRegistrationUIActions();
    const {
        title = t('bluiRegistration:REGISTRATION.STEPS.LICENSE'),
        onEulaAcceptedChange = (accepted: boolean): boolean => accepted,
        eulaContent,
        checkboxLabel = t('bluiRegistration:REGISTRATION.EULA.AGREE_TERMS'),
        htmlEula,
        initialCheckboxValue,
        checkboxProps,
    } = props;

    const [eulaAccepted, setEulaAccepted] = useState(onEulaAcceptedChange(initialCheckboxValue) ?? false);
    const [eulaLoaded, setIsEulaLoaded] = useState(true);
    const [eula, setEula] = useState(eulaContent || '');

    // const loadEula = useCallback(async (): Promise<void> => {
    //     if (!eulaContent) {
    //         setEula(t('blui:REGISTRATION.EULA.LOADING'));
    //         await sleep(800);
    //         setEula(SAMPLE_EULA);
    //         setIsEulaLoaded(false);
    //     }
    // }, [eulaContent, setEula, t]);

    // Load the Eula if we don't have it yet
    const loadAndCacheEula = useCallback(async (): Promise<void> => {
        // if (!eulaContent) {
            // setEula(t('bluiRegistration:REGISTRATION.EULA.LOADING'));
            // try {
                console.log('esult.actions()', result.actions());
                const eulaText = await result.actions().loadEula(result.language);
                console.log('eula', eulaText)
                setEula(eulaText);
                setIsEulaLoaded(true);
            // } catch {
            //     // setEula(eulaError);
            // }
        // }
    }, [eulaContent, setEula, t]);

    useEffect(() => {
        void loadAndCacheEula();
    }, []);

    const handleEulaAcceptedChecked = useCallback(
        (accepted: boolean) => {
            setEulaAccepted(onEulaAcceptedChange(accepted));
        },
        [onEulaAcceptedChange]
    );

    return (
        <EulaScreenBase
            WorkflowCardHeaderProps={{title: title}}
            eulaContent={eula}
            WorkflowCardBaseProps={{
                loading: eulaLoaded,
            }}
            checkboxLabel={checkboxLabel}
            checkboxProps={{ disabled: false }}
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
};
