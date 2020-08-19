import React, { useState, useEffect, useCallback } from 'react';
import { MobileStepper, Button, CardHeader, Typography, CardContent, Divider, CardActions } from '@material-ui/core';
import { BrandedCardContainer } from '../components/BrandedCardContainer';
import {
    useLanguageLocale,
    useRegistrationUIActions,
    useRegistrationUIState,
    useInjectedUIContext,
    RegistrationActions,
    AccountDetailInformation,
} from '@pxblue/react-auth-shared';
import { useHistory } from 'react-router-dom';
import { useQueryString } from '../hooks/useQueryString';
import { CreateAccount as CreateAccountScreen } from './subScreens/CreateAccount';
import { AcceptEula } from './subScreens/AcceptEula';
import i18n from '../translations/i18n';
import { VerifyEmail as VerifyEmailScreen } from './subScreens/VerifyEmail';
import { CreatePassword as CreatePasswordScreen } from './subScreens/CreatePassword';
import { AccountDetails as AccountDetailsScreen } from './subScreens/AccountDetails';
import { RegistrationComplete } from './subScreens/RegistrationComplete';
import { useRoutes } from '../contexts/RoutingContext';

/* eslint-disable @typescript-eslint/naming-convention */
enum Pages {
    CreateAccount = 0,
    Eula,
    VerifyEmail,
    CreatePassword,
    AccountDetails,
    Complete,
    __LENGTH,
}
/* eslint-enable @typescript-eslint/naming-convention */

export const emptyAccountDetailInformation: AccountDetailInformation = {
    firstName: '',
    lastName: '',
    phone: '',
};

export const SelfRegistrationPager: React.FC = () => {
    const { t } = useLanguageLocale();

    const [eulaAccepted, setEulaAccepted] = useState(false);
    const [password, setPassword] = useState('');
    const [accountDetails, setAccountDetails] = useState<AccountDetailInformation | null>(null);
    // const [organization] = useState<string>(t('REGISTRATION.UNKNOWN_ORGANIZATION'));
    const [eulaContent, setEulaContent] = useState<string>();
    const [accountAlreadyExists, setAccountAlreadyExists] = useState<boolean>(false);
    const [hasAcknowledgedError, setHasAcknowledgedError] = useState(false);

    const [currentPage, setCurrentPage] = useState(0);

    // const navigation = useNavigation();
    const history = useHistory();
    const { routes } = useRoutes();
    // const viewPager = React.createRef<ViewPager>();
    const registrationActions = useRegistrationUIActions();
    const registrationState = useRegistrationUIState();
    const injectedUIContext = useInjectedUIContext();

    const { code, email: urlEmail } = useQueryString();
    const [verificationCode, setVerificationCode] = React.useState<string>(code ?? '');
    const [email, setEmail] = React.useState(urlEmail ?? '');

    useEffect(() => {
        if (typeof code === 'string') {
            setVerificationCode(code);
            if (typeof urlEmail === 'string') {
                setEmail(urlEmail);
            }
        }
    }, [code, urlEmail, setVerificationCode, setEmail]);

    // Network state (registration)
    const codeRequestTransit = registrationState.inviteRegistration.codeRequestTransit;
    const codeRequestIsInTransit = codeRequestTransit.transitInProgress;
    const hasCodeRequestTransitError = codeRequestTransit.transitErrorMessage !== null;
    const codeRequestTransitErrorMessage = codeRequestTransit.transitErrorMessage ?? t('MESSAGES.REQUEST_ERROR');
    const codeRequestSuccess = codeRequestTransit.transitSuccess;

    // If there is a code and it is not confirmed, go to the verify screen
    useEffect((): void => {
        if (verificationCode && !codeRequestSuccess) {
            setCurrentPage(Pages.VerifyEmail);
        }
    }, [codeRequestSuccess, verificationCode]);

    const requestCode = useCallback(async (): Promise<void> => {
        registrationActions.dispatch(RegistrationActions.requestRegistrationCodeReset());
        setHasAcknowledgedError(false);
        try {
            await registrationActions.actions.requestRegistrationCode(email);
        } catch {
            // do nothing
        }
    }, [registrationActions, setHasAcknowledgedError, email]);

    // Network state (registration)
    const registrationTransit = registrationState.inviteRegistration.registrationTransit;
    const registrationIsInTransit = registrationTransit.transitInProgress;
    const hasRegistrationTransitError = registrationTransit.transitErrorMessage !== null;
    const registrationTransitErrorMessage = registrationTransit.transitErrorMessage ?? t('MESSAGES.REQUEST_ERROR');
    const registrationSuccess = registrationTransit.transitSuccess;

    useEffect(() => {
        if (currentPage === Pages.AccountDetails && registrationSuccess) {
            setCurrentPage(Pages.Complete);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [registrationSuccess]);

    useEffect(() => {
        if (currentPage === Pages.Eula && codeRequestSuccess) {
            setCurrentPage(Pages.VerifyEmail);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [codeRequestSuccess]);

    // Network state (invite code validation)
    const isValidationInTransit = registrationState.inviteRegistration.validationTransit.transitInProgress;
    const validationTransitErrorMessage = registrationState.inviteRegistration.validationTransit.transitErrorMessage;
    const hasValidationTransitError =
        registrationState.inviteRegistration.validationTransit.transitErrorMessage !== null;
    const validationSuccess = registrationState.inviteRegistration.validationTransit.transitSuccess;

    const validateCode = useCallback(async (): Promise<void> => {
        setHasAcknowledgedError(false);
        try {
            const registrationComplete = await registrationActions.actions.validateUserRegistrationRequest(
                verificationCode,
                email
            );
            if (registrationComplete) {
                setAccountAlreadyExists(true);
            }
        } catch {
            // do nothing
        }
    }, [setHasAcknowledgedError, registrationActions, verificationCode, email, setAccountAlreadyExists]);

    // Reset registration and validation state on dismissal
    useEffect(() => {
        if (hasAcknowledgedError) {
            if (hasCodeRequestTransitError)
                registrationActions.dispatch(RegistrationActions.requestRegistrationCodeReset());
            if (hasValidationTransitError)
                registrationActions.dispatch(RegistrationActions.validateUserRegistrationReset());
            if (hasRegistrationTransitError) registrationActions.dispatch(RegistrationActions.registerUserReset());
            setHasAcknowledgedError(false);
        }
        return (): void => {
            registrationActions.dispatch(RegistrationActions.requestRegistrationCodeReset());
            registrationActions.dispatch(RegistrationActions.validateUserRegistrationReset());
            registrationActions.dispatch(RegistrationActions.registerUserReset());
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [hasAcknowledgedError]);

    useEffect(() => {
        if (currentPage === Pages.VerifyEmail && validationSuccess) {
            setCurrentPage(Pages.CreatePassword);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [validationSuccess]);

    // Network state (loading eula)
    const loadEulaTransitErrorMessage = registrationState.eulaTransit.transitErrorMessage;
    // Spinner - shows if either of registration of code validation are in progress
    const spinner =
        registrationIsInTransit || isValidationInTransit || codeRequestIsInTransit ? (
            <h1>Spinner</h1> /*<Spinner />*/
        ) : (
            <></>
        );

    // // View pager
    // useEffect(() => {
    //     if (currentPage === Pages.Complete) {
    //         // eslint-disable-next-line no-unused-expressions
    //         viewPager?.current?.setPageWithoutAnimation(currentPage);
    //     } else {
    //         // eslint-disable-next-line no-unused-expressions
    //         viewPager?.current?.setPage(currentPage);
    //     }
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [currentPage, viewPager, registrationSuccess]);

    // Styling
    // const containerStyles = makeContainerStyles(theme);
    // const styles = makeStyles();

    // Network state (loading eula)
    const errorBodyText =
        (hasCodeRequestTransitError && codeRequestTransitErrorMessage) ||
        (hasValidationTransitError && validationTransitErrorMessage) ||
        (hasRegistrationTransitError && registrationTransitErrorMessage) ||
        registrationTransitErrorMessage;
    const errorDialog = (
        <h1>Error Dialog</h1>
        // <SimpleDialog
        //     title={'Error'}
        //     bodyText={t(errorBodyText)}
        //     visible={
        //         !hasAcknowledgedError &&
        //         (hasRegistrationTransitError || hasValidationTransitError || hasCodeRequestTransitError)
        //     }
        //     onDismiss={(): void => {
        //         setHasAcknowledgedError(true);
        //     }}
        // />
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
                verificationCode,
                email
            );
        } catch {
            // do nothing
        }
    }, [setHasAcknowledgedError, registrationActions, password, accountDetails, verificationCode, email]);

    const canProgress = useCallback((): boolean => {
        switch (currentPage) {
            case Pages.CreateAccount:
                return email.length > 0;
            case Pages.Eula:
                return eulaAccepted;
            case Pages.VerifyEmail:
                return verificationCode.length > 0;
            case Pages.CreatePassword:
                return password.length > 0;
            case Pages.AccountDetails:
                return accountDetails !== null;
            case Pages.Complete:
                return true;
            default:
                return false;
        }
    }, [currentPage, email, eulaAccepted, verificationCode, password, accountDetails]);

    const canGoBackProgress = useCallback((): boolean => {
        switch (currentPage) {
            case Pages.VerifyEmail:
                return false;
            // case Pages.CreateAccount:
            //     return false;
            case Pages.CreatePassword:
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
                } else if (
                    currentPage === Pages.Eula &&
                    !codeRequestIsInTransit &&
                    canProgress() &&
                    (delta as number) > 0
                ) {
                    void requestCode();
                } else if (
                    currentPage === Pages.VerifyEmail &&
                    !isValidationInTransit &&
                    canProgress() &&
                    (delta as number) > 0
                ) {
                    void validateCode();
                } else {
                    setCurrentPage(currentPage + (delta as number));
                }
            }
        },
        [
            isFirstStep,
            isLastStep,
            history,
            currentPage,
            attemptRegistration,
            canProgress,
            codeRequestIsInTransit,
            isValidationInTransit,
            registrationSuccess,
            requestCode,
            validateCode,
            routes,
        ]
    );

    const pageTitle = (): string => {
        switch (currentPage) {
            case Pages.CreateAccount:
                return t('REGISTRATION.STEPS.CREATE_ACCOUNT');
            case Pages.Eula:
                return t('REGISTRATION.STEPS.LICENSE');
            case Pages.VerifyEmail:
                return t('REGISTRATION.STEPS.VERIFY_EMAIL');
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
            case Pages.CreateAccount:
                return <CreateAccountScreen initialEmail={email} onEmailChanged={setEmail} />;
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
            case Pages.VerifyEmail:
                return (
                    <VerifyEmailScreen
                        initialCode={verificationCode}
                        onVerifyCodeChanged={setVerificationCode}
                        onResendVerificationEmail={(): void => {
                            void requestCode();
                        }}
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
                return <h1>TODO ERROR</h1>;
        }
    }, [
        currentPage,
        setEmail,
        eulaAccepted,
        setEulaAccepted,
        loadAndCacheEula,
        injectedUIContext,
        loadEulaTransitErrorMessage,
        eulaContent,
        accountDetails,
        email,
        password,
        registrationState,
        requestCode,
        t,
        verificationCode,
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
        <BrandedCardContainer>
            <CardHeader
                title={
                    <Typography variant={'h6'} style={{ fontWeight: 600 }}>
                        {pageTitle()}
                    </Typography>
                }
            />
            <CardContent style={{ flex: '1 1 0px', overflow: 'auto', display: 'flex', flexDirection: 'column' }}>
                {getBody()}
            </CardContent>
            <Divider />
            <CardActions style={{ padding: 16, justifyContent: 'flex-end' }}>{buttonArea}</CardActions>
        </BrandedCardContainer>
    );
};
