/** eslint-ignore */
import React, { useCallback, useEffect, useState } from 'react';
import { EulaScreenProps } from './types';
import { useNavigate } from 'react-router';
import { EulaScreenBase } from './EulaScreenBase';
import { useLanguageLocale } from '../../hooks';
import {useRegistrationContext} from '../../contexts/RegistrationContext/context';

// Constants
import { SAMPLE_EULA } from '../../../constants';
import { useRegistrationWorkflowContext } from '../../contexts';
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
    const regWorkflow = useRegistrationWorkflowContext();
    const { nextScreen, screenData } = regWorkflow;
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

    const [eulaAccepted, setEulaAccepted] = useState(screenData.Eula.accepted ?? false);
    const [eulaLoaded, setIsEulaLoaded] = useState(true);
    const [eula, setEula] = useState(eulaContent || '');    

    const loadAndCacheEula = useCallback(async (): Promise<string> => {
        // setEula('eulaText');
        try {
            const eulaData = await result.actions().loadEula(result.language);
            if (eulaData) {
                console.log(eulaData,'eulaData');
            }
            return eulaData;
        } catch {
            // do nothing
            setIsEulaLoaded(false);
        }
    }, [setEula, result.language]);

    useEffect(() => {
        loadAndCacheEula()
    }, []);

    return (
        <EulaScreenBase
            WorkflowCardHeaderProps={{title: title}}
            eulaContent={eula}
            WorkflowCardBaseProps={{
                loading: eulaLoaded,
            }}
            checkboxLabel={checkboxLabel}
            checkboxProps={{ disabled: false }}
            initialCheckboxValue={eulaAccepted}
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
                onNext:(): void =>{
                    nextScreen({
                        screenId: 'CreateAccount',
                        values: screenData['CreateAccount'],
                    })
                }
            }}
        />
    );
};
