import React, { useState } from 'react';
import {
    RegistrationWorkflow,
    WorkflowCard,
    WorkflowCardHeader,
    WorkflowCardBody,
    WorkflowCardActions,
    useRegistrationWorkflowContext,
    i18nRegistrationInstance,
    RegistrationContextProvider,
    EulaScreen,
    CreatePasswordScreen,
} from '@brightlayer-ui/react-auth-workflow';
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../contexts/AppContextProvider';
import { ProjectRegistrationUIActions } from '../../actions/RegistrationUIActions';
import { routes } from '../../navigation/Routing';

const Screen3 = (): JSX.Element => {
    const regWorkflow = useRegistrationWorkflowContext();
    const { previousScreen, screenData } = regWorkflow;
    const [value, setValue] = useState(
        screenData['Other'] && screenData['Other']['TextField3'] ? screenData['Other']['TextField3'].test : ''
    );

    return (
        <WorkflowCard>
            <WorkflowCardHeader title="Screen 3" />
            <WorkflowCardBody>
                <TextField
                    variant="outlined"
                    /* @ts-ignore */
                    defaultValue={value}
                    onChange={(event): void => setValue(event.target.value)}
                    onBlur={(event): void => setValue(event.target.value)}
                />
            </WorkflowCardBody>
            <WorkflowCardActions
                showPrevious
                previousLabel="Previous"
                onPrevious={(): void => previousScreen({ screenId: 'TextField3', values: { test: value } })}
            />
        </WorkflowCard>
    );
};

export const RegistrationWorkflowScreen = (): JSX.Element => {
    const { language } = useApp();
    const navigate = useNavigate();
    // const securityContextActions = ();
    return (
        <RegistrationContextProvider
            i18n={i18nRegistrationInstance}
            language={language}
            routeConfig={routes}
            navigate={navigate}
            actions={ProjectRegistrationUIActions}
        >
            <RegistrationWorkflow initialScreenIndex={0}>
                <EulaScreen />
                <CreatePasswordScreen />
                <Screen3 />
            </RegistrationWorkflow>
        </RegistrationContextProvider>
    );
};
