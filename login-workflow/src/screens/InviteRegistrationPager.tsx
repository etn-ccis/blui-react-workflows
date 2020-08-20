import React, { useState, useEffect, useCallback } from 'react';
import {
    useLanguageLocale,
    useRegistrationUIState,
    useRegistrationUIActions,
    useInjectedUIContext,
    AccountDetailInformation,
    RegistrationActions,
} from '@pxblue/react-auth-shared';
import i18n from '../translations/i18n';
import {
    makeStyles,
    Button,
    MobileStepper,
    CardHeader,
    Typography,
    CardContent,
    Divider,
    CardActions,
    createStyles,
} from '@material-ui/core';
import { emptyAccountDetailInformation } from './SelfRegistrationPager';
import { useHistory } from 'react-router-dom';
import { useQueryString } from '../hooks/useQueryString';
import { BrandedCardContainer } from '../components/BrandedCardContainer';
import { AcceptEula } from './subScreens/AcceptEula';
import { CreatePassword as CreatePasswordScreen } from './subScreens/CreatePassword';
import { AccountDetails as AccountDetailsScreen } from './subScreens/AccountDetails';
import { RegistrationComplete } from './subScreens/RegistrationComplete';
import { EmptyState } from '@pxblue/react-components';
import { Error } from '@material-ui/icons';
import { useRoutes } from '../contexts/RoutingContext';
import { SimpleDialog } from '../components';
import { ExistingAccountComplete } from './subScreens/ExistingAccountComplete';

/* eslint-disable @typescript-eslint/naming-convention */

enum Pages {
    Eula = 0,
    CreatePassword,
    AccountDetails,
    Complete,
    __LENGTH,
}
/* eslint-enable @typescript-eslint/naming-convention */

const useStyles = makeStyles(() =>
    createStyles({
        description: {
            color: 'inherit',
        },
    })
);

export const InviteRegistrationPager: React.FC = () => {
    const { t } = useLanguageLocale();
    const history = useHistory();
    const { routes } = useRoutes();
    const classes = useStyles();
    const registrationState = useRegistrationUIState();
    const registrationActions = useRegistrationUIActions();
    const injectedUIContext = useInjectedUIContext();

    const [hasAcknowledgedError, setHasAcknowledgedError] = useState(false);

    const [eulaAccepted, setEulaAccepted] = useState(false);
    const [password, setPassword] = useState('');
    const [accountDetails, setAccountDetails] = useState<AccountDetailInformation | null>(null);
    const [eulaContent, setEulaContent] = useState<string>();
    const [currentPage, setCurrentPage] = useState(Pages.Eula);
    const [accountAlreadyExists, setAccountAlreadyExists] = React.useState<boolean>(false);

    const { code, email } = useQueryString();
    const validationCode = code ?? 'NoCodeEntered';
    const validationEmail = email;

    // Reset registration and validation state on dismissal
    useEffect(
        () => (): void => {
            registrationActions.dispatch(RegistrationActions.registerUserReset());
            registrationActions.dispatch(RegistrationActions.validateUserRegistrationReset());
        },
        [] // eslint-disable-line react-hooks/exhaustive-deps
    );

    // Network state (registration)
    const registrationTransit = registrationState.inviteRegistration.registrationTransit;
    const registrationIsInTransit = registrationTransit.transitInProgress;
    const hasRegistrationTransitError = registrationTransit.transitErrorMessage !== null;
    const registrationTransitErrorMessage = registrationTransit.transitErrorMessage ?? t('MESSAGES.REQUEST_ERROR');
    const registrationSuccess = registrationState.inviteRegistration.registrationTransit.transitSuccess;

    useEffect(() => {
        if (currentPage === Pages.AccountDetails && registrationSuccess) {
            setCurrentPage(Pages.Complete);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [registrationSuccess]);

    // Network state (invite code validation)
    const isValidationInTransit = registrationState.inviteRegistration.validationTransit.transitInProgress;
    const validationTransitErrorMessage = registrationState.inviteRegistration.validationTransit.transitErrorMessage;
    const validationSuccess = registrationState.inviteRegistration.validationTransit.transitSuccess;
    const validationComplete = registrationState.inviteRegistration.validationTransit.transitComplete;

    // Network state (loading eula)
    const loadEulaTransitErrorMessage = registrationState.eulaTransit.transitErrorMessage;

    const validateCode = useCallback(async (): Promise<void> => {
        setHasAcknowledgedError(false);
        try {
            const registrationComplete = await registrationActions.actions.validateUserRegistrationRequest(
                validationCode,
                validationEmail
            );
            if (registrationComplete) {
                setAccountAlreadyExists(true);
            }
        } catch {
            // do nothing
        }
    }, [setHasAcknowledgedError, registrationActions, validationCode, validationEmail, setAccountAlreadyExists]);

    useEffect(() => {
        if (!isValidationInTransit && !validationComplete && validationCode.length > 0) {
            void validateCode();
        }
    }, [registrationState.inviteRegistration.validationTransit, validationCode, validateCode, validationEmail]); // eslint-disable-line react-hooks/exhaustive-deps

    const errorDialog = (
        <SimpleDialog
            title={t('MESSAGES.ERROR')}
            body={t(registrationTransitErrorMessage)}
            open={hasRegistrationTransitError && !hasAcknowledgedError}
            onClose={(): void => {
                setHasAcknowledgedError(true);
            }}
        />
    );

    const loadAndCacheEula = useCallback(async (): Promise<void> => {
        if (!eulaContent) {
            try {
                const eulaText = await registrationActions.actions.loadEULA(i18n.language);
                setEulaContent(eulaText);
            } catch {
                // do nothing
            }
        }
    }, [eulaContent, setEulaContent, registrationActions]);

    // Pages
    const isLastStep = currentPage === Pages.__LENGTH - 1;
    const isFirstStep = currentPage === 0;

    const attemptRegistration = useCallback(async (): Promise<void> => {
        setHasAcknowledgedError(false);
        try {
            await registrationActions.actions.completeRegistration(
                {
                    password: password,
                    accountDetails: accountDetails ?? emptyAccountDetailInformation,
                },
                validationCode,
                validationEmail
            );
        } catch {
            // do nothing
        }
    }, [registrationActions, setHasAcknowledgedError, accountDetails, password, validationCode, validationEmail]);

    const canProgress = useCallback((): boolean => {
        switch (currentPage) {
            case Pages.Eula:
                return eulaAccepted;
            case Pages.CreatePassword:
                return password.length > 0;
            case Pages.AccountDetails:
                return accountDetails !== null;
            case Pages.Complete:
                return true;
            default:
                return false;
        }
    }, [currentPage, accountDetails, eulaAccepted, password]);

    const canGoBackProgress = useCallback((): boolean => {
        switch (currentPage) {
            case Pages.Eula:
                return false;
            case Pages.Complete:
                return false;
            default:
                return true;
        }
    }, [currentPage]);

    const advancePage = useCallback(
        (delta = 0): void => {
            if (delta === 0) {
                return;
            } else if (isFirstStep && delta < 0) {
                history.push(routes.LOGIN);
            } else if (isLastStep && delta > 0) {
                history.push(routes.LOGIN);
            } else {
                // If this is the last user-entry step of the invite flow, it is time to make a network call
                // Check > 0 so advancing backwards does not risk going into the completion block
                if (currentPage === Pages.AccountDetails && !registrationSuccess && canProgress() && delta > 0) {
                    void attemptRegistration();
                } else {
                    setCurrentPage(currentPage + (delta as number));
                }
            }
        },
        [
            routes,
            isFirstStep,
            history,
            isLastStep,
            currentPage,
            registrationSuccess,
            canProgress,
            attemptRegistration,
            setCurrentPage,
        ]
    );

    const pageTitle = (): string => {
        if (isValidationInTransit) {
            return t('MESSAGES.LOADING');
        } else if (validationTransitErrorMessage !== null) {
            return t('MESSAGES.ERROR');
        } else if (accountAlreadyExists) {
            return t('REGISTRATION.STEPS.COMPLETE');
        }
        switch (currentPage) {
            case Pages.Eula:
                return t('REGISTRATION.STEPS.LICENSE');
            case Pages.CreatePassword:
                return t('REGISTRATION.STEPS.PASSWORD');
            case Pages.AccountDetails:
                return t('REGISTRATION.STEPS.ACCOUNT_DETAILS');
            case Pages.Complete:
                return t('REGISTRATION.STEPS.COMPLETE');
            default:
                return '';
        }
    };

    const getBody = useCallback(() => {
        switch (currentPage) {
            case Pages.Eula:
                return (
                    <AcceptEula
                        eulaAccepted={eulaAccepted}
                        onEulaChanged={setEulaAccepted}
                        loadEula={loadAndCacheEula}
                        htmlEula={injectedUIContext.htmlEula ?? false}
                        eulaError={loadEulaTransitErrorMessage}
                        eulaContent={eulaContent}
                    />
                );
            case Pages.CreatePassword:
                return <CreatePasswordScreen onPasswordChanged={setPassword} initialPassword={password} />;
            case Pages.AccountDetails:
                return <AccountDetailsScreen onDetailsChanged={setAccountDetails} initialDetails={accountDetails} />;
            case Pages.Complete:
                return (
                    <RegistrationComplete
                        firstName={accountDetails?.firstName ?? ''}
                        lastName={accountDetails?.lastName ?? ''}
                        email={registrationState.inviteRegistration.email ?? t('REGISTRATION.UNKNOWN_EMAIL')}
                        organization={
                            registrationState.inviteRegistration.organizationName ??
                            t('REGISTRATION.UNKNOWN_ORGANIZATION')
                        }
                    />
                );
            default:
                return <></>;
        }
    }, [
        currentPage,
        eulaAccepted,
        setEulaAccepted,
        loadAndCacheEula,
        injectedUIContext,
        loadEulaTransitErrorMessage,
        eulaContent,
        accountDetails,
        password,
        registrationState,
        t,
    ]);

    let buttonArea: JSX.Element;
    if (isLastStep) {
        buttonArea = (
            <Button variant={'contained'} color={'primary'} onClick={(): void => advancePage(1)}>
                {t('ACTIONS.CONTINUE')}
            </Button>
        );
    } else {
        buttonArea = (
            <MobileStepper
                variant={'dots'}
                position={'static'}
                steps={Pages.__LENGTH}
                activeStep={currentPage}
                backButton={
                    <Button
                        variant="outlined"
                        color="primary"
                        disabled={!canGoBackProgress()}
                        onClick={(): void => advancePage(-1)}
                        style={{ width: 100 }}
                    >
                        {t('ACTIONS.BACK')}
                    </Button>
                }
                nextButton={
                    <Button
                        variant="contained"
                        color="primary"
                        disabled={!canProgress()}
                        onClick={(): void => advancePage(1)}
                        style={{ width: 100 }}
                    >
                        {t('ACTIONS.NEXT')}
                    </Button>
                }
                style={{ background: 'transparent', width: '100%', padding: 0 }}
            />
        );
    }

    return (
        <BrandedCardContainer loading={registrationIsInTransit || isValidationInTransit}>
            {errorDialog}
            <CardHeader
                title={
                    <Typography variant={'h6'} style={{ fontWeight: 600 }}>
                        {pageTitle()}
                    </Typography>
                }
            />
            {!accountAlreadyExists && validationSuccess && !isValidationInTransit ? (
                <>
                    <CardContent
                        style={{ flex: '1 1 0px', overflow: 'auto', display: 'flex', flexDirection: 'column' }}
                    >
                        {getBody()}
                    </CardContent>
                    <Divider />
                    <CardActions style={{ padding: 16, justifyContent: 'flex-end' }}>{buttonArea}</CardActions>
                </>
            ) : accountAlreadyExists ? (
                <>
                    <CardContent
                        style={{ flex: '1 1 0px', overflow: 'auto', display: 'flex', flexDirection: 'column' }}
                    >
                        <ExistingAccountComplete />
                    </CardContent>
                    <Divider />
                    <CardActions style={{ padding: 16, justifyContent: 'flex-end' }}>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={(): void => history.push(routes.LOGIN)}
                            style={{ width: 100 }}
                        >
                            {t('ACTIONS.CONTINUE')}
                        </Button>
                    </CardActions>
                </>
            ) : !validationComplete ? (
                <></>
            ) : (
                <div style={{ display: 'flex', flex: '1 1 0%', justifyContent: 'center', height: '100%' }}>
                    <EmptyState
                        icon={<Error color={'error'} style={{ fontSize: 100, marginBottom: 16 }} />}
                        title={t('MESSAGES.FAILURE')}
                        description={validationTransitErrorMessage}
                        classes={{
                            description: classes.description,
                        }}
                    />
                </div>
            )}
        </BrandedCardContainer>
    );
};
