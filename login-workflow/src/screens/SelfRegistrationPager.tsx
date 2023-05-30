import React, { useState, useEffect, useCallback, ComponentType } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQueryString } from '../hooks/useQueryString';
import { useRoutes } from '../contexts/RoutingContext';
import Button from '@mui/material/Button';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import MobileStepper from '@mui/material/MobileStepper';
import { BrandedCardContainer, SimpleDialog } from '../components';
import { CreateAccount as CreateAccountScreen } from './subScreens/CreateAccount';
import { ViewEulaSubscreen } from './subScreens/ViewEulaSubscreen';
import { VerifyEmail as VerifyEmailScreen } from './subScreens/VerifyEmail';
import { CreatePassword as CreatePasswordScreen } from './subScreens/CreatePassword';
import { AccountDetails as AccountDetailsScreen, AccountDetailsWrapper } from './subScreens/AccountDetails';
import { RegistrationComplete } from './subScreens/RegistrationComplete';
import { ExistingAccountComplete } from './subScreens/ExistingAccountComplete';
import { CustomRegistrationDetailsGroup, RegistrationPage } from '../types';
import {
    DialogButtonStyles,
    DialogActionsStyles,
    DialogContentStyles,
    DialogTitleStyles,
    StepperDotStyles,
    StepperStyles,
    TextFieldStyles,
} from '../styles';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import {
    AccountDetailInformation,
    AccountDetailsFormProps,
    CustomAccountDetails,
    CustomRegistrationForm,
    RegistrationActions,
    useInjectedUIContext,
    useLanguageLocale,
    useRegistrationUIActions,
    useRegistrationUIState,
} from '../auth-shared';

export const emptyAccountDetailInformation: AccountDetailInformation = {
    firstName: '',
    lastName: '',
};

/**
 * Container component that manages the transition between screens for the
 * self-registration (i.e., Create Account) workflow.
 *
 * @category Component
 */
export const SelfRegistrationPager: React.FC<React.PropsWithChildren<React.PropsWithChildren>> = () => {
    const { t } = useLanguageLocale();
    const navigate = useNavigate();
    const { routes } = useRoutes();
    const registrationActions = useRegistrationUIActions();
    const registrationState = useRegistrationUIState();
    const injectedUIContext = useInjectedUIContext();
    const { code, email: urlEmail } = useQueryString();
    const theme = useTheme();

    // Local State
    const [currentPage, setCurrentPage] = useState(0);
    const [eulaAccepted, setEulaAccepted] = useState(false);
    const [password, setPassword] = useState('');
    const [accountDetails, setAccountDetails] = useState<(AccountDetailInformation & { valid: boolean }) | null>(null);
    const [customAccountDetails, setCustomAccountDetails] = useState<CustomRegistrationDetailsGroup | null>({});
    const [accountAlreadyExists, setAccountAlreadyExists] = useState<boolean>(false);
    const [hasAcknowledgedError, setHasAcknowledgedError] = useState(false);

    const [verificationCode, setVerificationCode] = useState<string>(code ?? '');
    const [email, setEmail] = useState(urlEmail ?? '');

    // Pages
    // const isLastStep = currentPage === Pages.__LENGTH - 1;
    // const isFirstStep = currentPage === 0;

    // Network state (verify code)
    const codeRequestTransit = registrationState.inviteRegistration.codeRequestTransit;
    const codeRequestIsInTransit = codeRequestTransit.transitInProgress;
    const hasCodeRequestTransitError = codeRequestTransit.transitErrorMessage !== null;
    const codeRequestTransitErrorMessage = codeRequestTransit.transitErrorMessage ?? t('blui:MESSAGES.REQUEST_ERROR');
    const codeRequestSuccess = codeRequestTransit.transitSuccess;

    // Network state (registration)
    const registrationTransit = registrationState.inviteRegistration.registrationTransit;
    const registrationIsInTransit = registrationTransit.transitInProgress;
    const hasRegistrationTransitError = registrationTransit.transitErrorMessage !== null;
    const registrationTransitErrorMessage = registrationTransit.transitErrorMessage ?? t('blui:MESSAGES.REQUEST_ERROR');
    const registrationSuccess = registrationTransit.transitSuccess;

    // Network state (invite code validation)
    const isValidationInTransit = registrationState.inviteRegistration.validationTransit.transitInProgress;
    const validationTransitErrorMessage = registrationState.inviteRegistration.validationTransit.transitErrorMessage;
    const hasValidationTransitError =
        registrationState.inviteRegistration.validationTransit.transitErrorMessage !== null;
    const validationSuccess = registrationState.inviteRegistration.validationTransit.transitSuccess;

    // Network state (loading eula)
    const loadEulaTransitErrorMessage = registrationState.eulaTransit.transitErrorMessage;

    // Custom Registration Success Screens
    const customSuccess = injectedUIContext.registrationSuccessScreen;
    const customAccountAlreadyExists = injectedUIContext.accountAlreadyExistsScreen;

    const errorBodyText =
        (hasCodeRequestTransitError && codeRequestTransitErrorMessage) ||
        (hasValidationTransitError && validationTransitErrorMessage) ||
        (hasRegistrationTransitError && registrationTransitErrorMessage) ||
        registrationTransitErrorMessage;

    // pre-populate fields if they are present in the url
    useEffect(() => {
        if (typeof code === 'string') {
            setVerificationCode(code);
            if (typeof urlEmail === 'string') {
                setEmail(urlEmail);
            }
        }
    }, [code, urlEmail, setVerificationCode, setEmail]);

    // Send the verification email
    const requestCode = useCallback(async (): Promise<void> => {
        registrationActions.dispatch(RegistrationActions.requestRegistrationCodeReset());
        setHasAcknowledgedError(false);
        try {
            await registrationActions.actions.requestRegistrationCode(email);
        } catch {
            // do nothing
        }
    }, [registrationActions, setHasAcknowledgedError, email]);

    // Validate the code entered by the user
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [hasAcknowledgedError]);

    useEffect(
        () => (): void => {
            registrationActions.dispatch(RegistrationActions.requestRegistrationCodeReset());
            registrationActions.dispatch(RegistrationActions.validateUserRegistrationReset());
            registrationActions.dispatch(RegistrationActions.registerUserReset());
        },
        [] // eslint-disable-line react-hooks/exhaustive-deps
    );

    // Call the API to finish registration
    const attemptRegistration = useCallback(async (): Promise<void> => {
        setHasAcknowledgedError(false);

        let flattenedDetails = {};
        Object.keys(customAccountDetails).forEach((key) => {
            flattenedDetails = { ...flattenedDetails, ...customAccountDetails[parseInt(key, 10)].values };
        });

        try {
            await registrationActions.actions.completeRegistration(
                {
                    password: password,
                    accountDetails: { ...(accountDetails ?? emptyAccountDetailInformation), ...flattenedDetails },
                },
                verificationCode,
                email
            );
        } catch {
            // do nothing
        }
    }, [
        setHasAcknowledgedError,
        registrationActions,
        password,
        accountDetails,
        customAccountDetails,
        verificationCode,
        email,
    ]);

    // Define the pages in the workflow
    const customDetails = injectedUIContext.customAccountDetails || [];
    //@ts-ignore
    const FirstCustomPage: ComponentType<
        React.PropsWithChildren<React.PropsWithChildren<AccountDetailsFormProps>>
    > | null = customDetails.length > 0 && customDetails[0] ? customDetails[0].component : null;

    const RegistrationPages: RegistrationPage[] = [
        {
            name: 'Eula',
            pageTitle: t('blui:REGISTRATION.STEPS.LICENSE'),
            pageBody: (
                <ViewEulaSubscreen
                    eulaAccepted={eulaAccepted}
                    onEulaCheckboxChanged={setEulaAccepted}
                    htmlEula={injectedUIContext.htmlEula ?? false}
                    eulaError={loadEulaTransitErrorMessage}
                    loadEulaAction={registrationActions.actions.loadEULA}
                />
            ),
            canGoForward: eulaAccepted,
            canGoBack: true,
        },
        {
            name: 'CreateAccount',
            pageTitle: t('blui:REGISTRATION.STEPS.CREATE_ACCOUNT'),
            pageBody: (
                <CreateAccountScreen
                    initialEmail={email}
                    onEmailChanged={setEmail}
                    // eslint-disable-next-line @typescript-eslint/no-use-before-define
                    onSubmit={email.length > 0 ? (): void => advancePage(1) : undefined}
                />
            ),
            canGoForward: email.length > 0,
            canGoBack: true,
        },
        {
            name: 'VerifyEmail',
            pageTitle: t('blui:REGISTRATION.STEPS.VERIFY_EMAIL'),
            pageBody: (
                <VerifyEmailScreen
                    initialCode={verificationCode}
                    onVerifyCodeChanged={setVerificationCode}
                    onResendVerificationEmail={(): void => {
                        void requestCode();
                    }}
                    // eslint-disable-next-line @typescript-eslint/no-use-before-define
                    onSubmit={verificationCode.length > 0 ? (): void => advancePage(1) : undefined}
                />
            ),
            canGoForward: verificationCode.length > 0,
            canGoBack: true,
        },
        {
            name: 'CreatePassword',
            pageTitle: t('blui:REGISTRATION.STEPS.PASSWORD'),
            pageBody: (
                <CreatePasswordScreen
                    onPasswordChanged={setPassword}
                    initialPassword={password}
                    // eslint-disable-next-line @typescript-eslint/no-use-before-define
                    onSubmit={password.length > 0 ? (): void => advancePage(1) : undefined}
                />
            ),
            canGoForward: password.length > 0,
            canGoBack: true,
        },
        {
            name: 'AccountDetails',
            pageTitle: t('blui:REGISTRATION.STEPS.ACCOUNT_DETAILS'),
            pageBody: (
                <AccountDetailsWrapper>
                    <AccountDetailsScreen
                        onDetailsChanged={setAccountDetails}
                        initialDetails={accountDetails}
                        onSubmit={
                            FirstCustomPage
                                ? (): void => {
                                      /* TODO Focus first field in custom page */
                                  }
                                : accountDetails !== null && accountDetails.valid
                                ? // eslint-disable-next-line @typescript-eslint/no-use-before-define
                                  (): void => advancePage(1)
                                : undefined
                        }
                    />
                    {FirstCustomPage && (
                        <Box sx={TextFieldStyles(theme)}>
                            <FirstCustomPage
                                onDetailsChanged={(details: CustomAccountDetails, valid: boolean): void => {
                                    setCustomAccountDetails({ ...customAccountDetails, 0: { values: details, valid } });
                                }}
                                initialDetails={customAccountDetails[0]?.values}
                                // eslint-disable-next-line @typescript-eslint/no-use-before-define
                                onSubmit={customAccountDetails[0]?.valid ? (): void => advancePage(1) : undefined}
                            />
                        </Box>
                    )}
                </AccountDetailsWrapper>
            ),
            canGoForward:
                accountDetails !== null &&
                accountDetails.valid &&
                ((FirstCustomPage && customAccountDetails[0]?.valid) || !FirstCustomPage),
            canGoBack: true,
        },
    ]
        .concat(
            customDetails
                .slice(1)
                //@ts-ignore there won't be any nulls after we filter them
                .filter((item: ComponentType<CustomRegistrationForm> | null) => item !== null)
                .map((page: CustomRegistrationForm, i: number) => {
                    const PageComponent = page.component;
                    return {
                        name: `CustomPage${i + 1}`,
                        pageTitle: page.title || t('blui:REGISTRATION.STEPS.ACCOUNT_DETAILS'),
                        pageBody: (
                            <AccountDetailsWrapper description={page.instructions}>
                                <PageComponent
                                    key={`CustomDetailsPage_${i + 1}`}
                                    onDetailsChanged={(details: CustomAccountDetails, valid: boolean): void => {
                                        setCustomAccountDetails({
                                            ...customAccountDetails,
                                            [i + 1]: { values: details, valid },
                                        });
                                    }}
                                    initialDetails={customAccountDetails[i + 1]?.values}
                                    onSubmit={
                                        // eslint-disable-next-line @typescript-eslint/no-use-before-define
                                        customAccountDetails[i + 1]?.valid ? (): void => advancePage(1) : undefined
                                    }
                                />
                            </AccountDetailsWrapper>
                        ),
                        canGoForward: customAccountDetails[i + 1]?.valid,
                        canGoBack: true,
                    };
                })
        )
        .concat([
            {
                name: 'Complete',
                pageTitle: t('blui:REGISTRATION.STEPS.COMPLETE'),
                pageBody: (
                    <RegistrationComplete
                        firstName={accountDetails?.firstName ?? ''}
                        lastName={accountDetails?.lastName ?? ''}
                        email={registrationState.inviteRegistration.email ?? t('blui:REGISTRATION.UNKNOWN_EMAIL')}
                        organization={
                            registrationState.inviteRegistration.organizationName ??
                            t('blui:REGISTRATION.UNKNOWN_ORGANIZATION')
                        }
                    />
                ),
                canGoForward: true,
                canGoBack: false,
            },
        ])
        // Remove the CreatePassword screen if so configured
        .filter((page) => {
            if (page.name === 'CreatePassword' && !(injectedUIContext.enableCreatePassword ?? true)) return false;
            return true;
        });

    const isLastStep = currentPage === RegistrationPages.length - 1;
    const isFirstStep = currentPage === 0;
    const CreateAccountPage = RegistrationPages.findIndex((item) => item.name === 'CreateAccount');
    const VerifyEmailPage = RegistrationPages.findIndex((item) => item.name === 'VerifyEmail');
    const CreatePasswordPage = RegistrationPages.findIndex((item) => item.name === 'CreatePassword');
    const AccountDetailsPage = RegistrationPages.findIndex((item) => item.name === 'AccountDetails');
    const CompletePage = RegistrationPages.length - 1;

    // If there is a code and it is not confirmed, go to the verify screen
    useEffect((): void => {
        if (verificationCode && !codeRequestSuccess) {
            setCurrentPage(VerifyEmailPage);
        }
    }, [codeRequestSuccess, verificationCode, VerifyEmailPage]);

    // If the registration is successful, go to the success screen
    useEffect(() => {
        if (currentPage === RegistrationPages.length - 2 && registrationSuccess) {
            setCurrentPage(CompletePage);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [registrationSuccess]);

    // If the verification code is sent successfully, go to the confirmation page
    useEffect(() => {
        if (currentPage === CreateAccountPage && codeRequestSuccess) {
            setCurrentPage(VerifyEmailPage);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [codeRequestSuccess]);

    // If the email is validated successfully, go to the create password screen (or account details)
    useEffect(() => {
        if (currentPage === VerifyEmailPage && validationSuccess) {
            setCurrentPage(injectedUIContext.enableCreatePassword ?? true ? CreatePasswordPage : AccountDetailsPage);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [validationSuccess]);

    // Screen transition logic
    const canProgress = (): boolean => RegistrationPages[currentPage].canGoForward ?? false;
    const canGoBackProgress = (): boolean => RegistrationPages[currentPage].canGoBack ?? true;

    const advancePage = (delta = 0): void => {
        if (delta === 0) {
            return;
        } else if (isFirstStep && delta < 0) {
            navigate(routes.LOGIN);
        } else if (isLastStep && delta > 0) {
            navigate(routes.LOGIN);
        } else {
            // If this is the last user-entry step of the invite flow, it is time to make a network call
            // Check > 0 so advancing backwards does not risk going into the completion block
            if (currentPage === RegistrationPages.length - 2 && !registrationSuccess && canProgress() && delta > 0) {
                void attemptRegistration();
            } else if (currentPage === CreateAccountPage && !codeRequestIsInTransit && canProgress() && delta > 0) {
                void requestCode();
            } else if (currentPage === VerifyEmailPage && !isValidationInTransit && canProgress() && delta > 0) {
                void validateCode();
            } else {
                setCurrentPage(currentPage + delta);
            }
        }
    };

    // Page content logic
    const pageTitle = (): string => {
        if (accountAlreadyExists) return t('blui:REGISTRATION.STEPS.COMPLETE');
        return RegistrationPages[currentPage].pageTitle || '';
    };

    // Page actions logic
    let buttonArea: JSX.Element;
    if (accountAlreadyExists) {
        buttonArea = (
            <Button
                variant={'contained'}
                color={'primary'}
                sx={DialogButtonStyles(true)}
                disableElevation
                onClick={(): void => navigate(routes.LOGIN)}
            >
                {isFirstStep ? t('blui:ACTIONS.CANCEL') : t('blui:ACTIONS.BACK')}
            </Button>
        );
    } else if (isLastStep) {
        buttonArea = (
            <Button
                variant={'contained'}
                color={'primary'}
                disableElevation
                sx={DialogButtonStyles(true)}
                onClick={(): void => advancePage(1)}
            >
                {t('blui:ACTIONS.CONTINUE')}
            </Button>
        );
    } else {
        buttonArea = (
            <MobileStepper
                variant={'dots'}
                position={'static'}
                steps={RegistrationPages.length}
                activeStep={currentPage}
                backButton={
                    <Button
                        variant="outlined"
                        color="primary"
                        disabled={!canGoBackProgress()}
                        onClick={(): void => advancePage(-1)}
                        sx={DialogButtonStyles()}
                    >
                        {isFirstStep ? t('blui:ACTIONS.CANCEL') : t('blui:ACTIONS.BACK')}
                    </Button>
                }
                nextButton={
                    <Button
                        variant="contained"
                        color="primary"
                        disableElevation
                        disabled={!canProgress()}
                        onClick={(): void => advancePage(1)}
                        sx={DialogButtonStyles()}
                    >
                        {t('blui:ACTIONS.NEXT')}
                    </Button>
                }
                sx={{ ...StepperStyles, '& .MuiMobileStepper-dot': StepperDotStyles(theme) }}
            />
        );
    }

    const errorDialog = (
        <SimpleDialog
            title={'Error'}
            body={t(errorBodyText)}
            open={
                !hasAcknowledgedError &&
                (hasRegistrationTransitError || hasValidationTransitError || hasCodeRequestTransitError)
            }
            onClose={(): void => {
                setHasAcknowledgedError(true);
            }}
        />
    );

    // Custom "Account Already Exists"
    if (accountAlreadyExists && customAccountAlreadyExists) {
        return (
            <BrandedCardContainer loading={registrationIsInTransit || isValidationInTransit || codeRequestIsInTransit}>
                {typeof customAccountAlreadyExists === 'function' && customAccountAlreadyExists(undefined)}
                {typeof customAccountAlreadyExists !== 'function' && customAccountAlreadyExists}
            </BrandedCardContainer>
        );
    }
    // Custom Success Screen
    else if (isLastStep && !accountAlreadyExists && validationSuccess && !isValidationInTransit && customSuccess) {
        return (
            <BrandedCardContainer loading={registrationIsInTransit || isValidationInTransit || codeRequestIsInTransit}>
                {typeof customSuccess === 'function' && customSuccess({ accountDetails: accountDetails })}
                {typeof customSuccess !== 'function' && customSuccess}
            </BrandedCardContainer>
        );
    }

    return (
        <BrandedCardContainer loading={registrationIsInTransit || isValidationInTransit || codeRequestIsInTransit}>
            {errorDialog}
            <CardHeader
                title={
                    <Typography variant={'h6'} sx={{ fontWeight: 600 }}>
                        {pageTitle()}
                    </Typography>
                }
                sx={DialogTitleStyles(theme)}
            />
            <CardContent sx={DialogContentStyles(theme)}>
                {accountAlreadyExists ? <ExistingAccountComplete /> : RegistrationPages[currentPage].pageBody}
            </CardContent>
            <Divider />
            <CardActions sx={DialogActionsStyles(theme)}>{buttonArea}</CardActions>
        </BrandedCardContainer>
    );
};
