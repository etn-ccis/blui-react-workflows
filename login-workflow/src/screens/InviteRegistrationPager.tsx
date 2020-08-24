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
import { useHistory } from 'react-router-dom';
import { useRoutes } from '../contexts/RoutingContext';
import { useQueryString } from '../hooks/useQueryString';
import {
    Button,
    MobileStepper,
    CardHeader,
    Typography,
    CardContent,
    Divider,
    CardActions,
    makeStyles,
    createStyles,
    Theme,
    useTheme,
} from '@material-ui/core';
import { BrandedCardContainer, FinishState, SimpleDialog } from '../components';
import { emptyAccountDetailInformation } from './SelfRegistrationPager';
import { AcceptEula } from './subScreens/AcceptEula';
import { CreatePassword as CreatePasswordScreen } from './subScreens/CreatePassword';
import { AccountDetails as AccountDetailsScreen } from './subScreens/AccountDetails';
import { RegistrationComplete } from './subScreens/RegistrationComplete';
import { ExistingAccountComplete } from './subScreens/ExistingAccountComplete';
import { Error } from '@material-ui/icons';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        cardContent: {
            flex: '1 1 0px',
            overflow: 'auto',
            display: 'flex',
            flexDirection: 'column',
        },
        cardActions: {
            padding: theme.spacing(2),
            justifyContent: 'flex-end',
        },
        stepper: {
            background: 'transparent',
            width: '100%',
            padding: 0,
        },
    })
);

/* eslint-disable @typescript-eslint/naming-convention */
enum Pages {
    Eula = 0,
    CreatePassword,
    AccountDetails,
    Complete,
    __LENGTH,
}
/* eslint-enable @typescript-eslint/naming-convention */

/**
 * Container component that manages the transition between screens for the
 * invite-based registration (i.e., via email) workflow.
 *
 * @category Component
 */
export const InviteRegistrationPager: React.FC = () => {
    const { t } = useLanguageLocale();
    const history = useHistory();
    const { routes } = useRoutes();
    const classes = useStyles();
    const theme = useTheme();
    const registrationState = useRegistrationUIState();
    const registrationActions = useRegistrationUIActions();
    const injectedUIContext = useInjectedUIContext();

    const { code, email } = useQueryString();
    const validationCode = code ?? 'NoCodeEntered';
    const validationEmail = email;

    // Local State
    const [hasAcknowledgedError, setHasAcknowledgedError] = useState(false);
    const [eulaAccepted, setEulaAccepted] = useState(false);
    const [password, setPassword] = useState('');
    const [accountDetails, setAccountDetails] = useState<AccountDetailInformation | null>(null);
    const [eulaContent, setEulaContent] = useState<string>();
    const [currentPage, setCurrentPage] = useState(Pages.Eula);
    const [accountAlreadyExists, setAccountAlreadyExists] = React.useState<boolean>(false);

    // Network state (registration)
    const registrationTransit = registrationState.inviteRegistration.registrationTransit;
    const registrationIsInTransit = registrationTransit.transitInProgress;
    const hasRegistrationTransitError = registrationTransit.transitErrorMessage !== null;
    const registrationTransitErrorMessage = registrationTransit.transitErrorMessage ?? t('MESSAGES.REQUEST_ERROR');
    const registrationSuccess = registrationState.inviteRegistration.registrationTransit.transitSuccess;

    // Network state (invite code validation)
    const isValidationInTransit = registrationState.inviteRegistration.validationTransit.transitInProgress;
    const validationTransitErrorMessage = registrationState.inviteRegistration.validationTransit.transitErrorMessage;
    const validationSuccess = registrationState.inviteRegistration.validationTransit.transitSuccess;
    const validationComplete = registrationState.inviteRegistration.validationTransit.transitComplete;

    // Network state (loading eula)
    const loadEulaTransitErrorMessage = registrationState.eulaTransit.transitErrorMessage;

    // Pages
    const isLastStep = currentPage === Pages.__LENGTH - 1;
    const isFirstStep = currentPage === 0;

    // Reset registration and validation state on dismissal
    useEffect(
        () => (): void => {
            registrationActions.dispatch(RegistrationActions.registerUserReset());
            registrationActions.dispatch(RegistrationActions.validateUserRegistrationReset());
        },
        [] // eslint-disable-line react-hooks/exhaustive-deps
    );

    // If we successfully register, move to the success screen
    useEffect(() => {
        if (currentPage === Pages.AccountDetails && registrationSuccess) {
            setCurrentPage(Pages.Complete);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [registrationSuccess]);

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

    // Validate the email verification code
    useEffect(() => {
        if (!isValidationInTransit && !validationComplete && validationCode.length > 0) {
            void validateCode();
        }
    }, [registrationState.inviteRegistration.validationTransit, validationCode, validateCode, validationEmail]); // eslint-disable-line react-hooks/exhaustive-deps

    // Load the Eula if we don't have it yet
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

    // Make the call to the register API
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

    // Screen transition logic
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

    // Screen content logic
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

    // Screen actions content
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
                className={classes.stepper}
            />
        );
    }

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
                    <CardContent className={classes.cardContent}>{getBody()}</CardContent>
                    <Divider />
                    <CardActions className={classes.cardActions}>{buttonArea}</CardActions>
                </>
            ) : accountAlreadyExists ? (
                <>
                    <CardContent className={classes.cardContent}>
                        <ExistingAccountComplete />
                    </CardContent>
                    <Divider />
                    <CardActions className={classes.cardActions}>
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
                <FinishState
                    icon={<Error color={'error'} style={{ fontSize: 100, marginBottom: theme.spacing(2) }} />}
                    title={t('MESSAGES.FAILURE')}
                    description={validationTransitErrorMessage}
                />
            )}
        </BrandedCardContainer>
    );
};
