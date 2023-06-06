import React, { useState } from 'react';
import {
    RegistrationWorkflow,
    WorkflowCard,
    WorkflowCardHeader,
    WorkflowCardBody,
    WorkflowCardActions,
    useRegistrationWorkflowContext,
} from '@brightlayer-ui/react-auth-workflow';
import TextField from '@mui/material/TextField';

const Screen1 = (): JSX.Element => {
    const regWorkflow = useRegistrationWorkflowContext();
    const { nextScreen, screenData } = regWorkflow;
    const [value, setValue] = useState(
        screenData['Other'] && screenData['Other']['TextField1'] ? screenData['Other']['TextField1'].test : ''
    );

    return (
        <WorkflowCard>
            <WorkflowCardHeader title="Screen 1" />
            <WorkflowCardBody>
                <TextField
                    variant="outlined"
                    /* @ts-ignore */
                    defaultValue={value}
                    placeholder="Please enter text here"
                    onChange={(event): void => setValue(event.target.value)}
                    onBlur={(event): void => setValue(event.target.value)}
                />
            </WorkflowCardBody>
            <WorkflowCardActions
                showNext
                nextLabel="Next"
                onNext={(): void => nextScreen({ screenId: 'TextField1', values: { test: value } })}
            />
        </WorkflowCard>
    );
};

const Screen2 = (): JSX.Element => {
    const regWorkflow = useRegistrationWorkflowContext();
    const { previousScreen, nextScreen, screenData } = regWorkflow;
    const [value, setValue] = useState(
        screenData['Other'] && screenData['Other']['TextField2'] ? screenData['Other']['TextField2'].test : ''
    );

    return (
        <WorkflowCard>
            <WorkflowCardHeader title="Screen 2" />
            <WorkflowCardBody>
                <TextField
                    variant="outlined"
                    placeholder="Please enter text here"
                    /* @ts-ignore */
                    defaultValue={value}
                    onChange={(event): void => setValue(event.target.value)}
                    onBlur={(event): void => setValue(event.target.value)}
                />
            </WorkflowCardBody>
            <WorkflowCardActions
                showNext
                showPrevious
                nextLabel="Next"
                previousLabel="Previous"
                onNext={(): void => nextScreen({ screenId: 'TextField2', values: { test: value } })}
                onPrevious={(): void => previousScreen({ screenId: 'TextField2', values: { test: value } })}
            />
        </WorkflowCard>
    );
};

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

export const RegistrationWorkflowScreen = (): JSX.Element => (
    <RegistrationWorkflow initialScreenIndex={0}>
        <Screen1 />
        <Screen2 />
        <Screen3 />
    </RegistrationWorkflow>
);
