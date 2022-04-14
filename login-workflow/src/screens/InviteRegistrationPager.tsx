import React, { useState, useEffect, useCallback, ComponentType } from 'react';
import {
    useLanguageLocale,
    useRegistrationUIState,
    useRegistrationUIActions,
    useInjectedUIContext,
    AccountDetailInformation,
    AccountDetailsFormProps,
    CustomRegistrationForm,
    CustomAccountDetails,
    RegistrationActions,
} from '@brightlayer-ui/react-auth-shared';
import i18n from '../translations/i18n';
import { useNavigate } from 'react-router-dom';
import { useRoutes } from '../contexts/RoutingContext';
import { useQueryString } from '../hooks/useQueryString';
import Button from '@mui/material/Button';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import MobileStepper from '@mui/material/MobileStepper';
import { useTheme } from '@mui/material/styles';
import makeStyles from '@mui/styles/makeStyles';
import { BrandedCardContainer, FinishState, SimpleDialog } from '../components';
import { emptyAccountDetailInformation } from './SelfRegistrationPager';
import { AcceptEula } from './subScreens/AcceptEula';
import { CreatePassword as CreatePasswordScreen } from './subScreens/CreatePassword';
import { AccountDetails as AccountDetailsScreen, AccountDetailsWrapper } from './subScreens/AccountDetails';
import { RegistrationComplete } from './subScreens/RegistrationComplete';
import { ExistingAccountComplete } from './subScreens/ExistingAccountComplete';
import Error from '@mui/icons-material/Error';

import clsx from 'clsx';
import { CustomRegistrationDetailsGroup, RegistrationPage } from '../types';
import { sharedDialogStyles } from '../styles';
const useDialogStyles = makeStyles(sharedDialogStyles);

/**
 * Container component that manages the transition between screens for the
 * invite-based registration (i.e., via email) workflow.
 *
 * @category Component
 */
export const InviteRegistrationPager: React.FC<React.PropsWithChildren<React.PropsWithChildren<unknown>>> = () => {
    const { t } = useLanguageLocale();
    const navigate = useNavigate();
    const { routes } = useRoutes();
    const sharedClasses = useDialogStyles();
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
    const [accountDetails, setAccountDetails] = useState<(AccountDetailInformation & { valid: boolean }) | null>(null);
    const [customAccountDetails, setCustomAccountDetails] = useState<CustomRegistrationDetailsGroup | null>({});
    const [eulaContent, setEulaContent] = useState<string>();
    const [currentPage, setCurrentPage] = useState(0);
    const [accountAlreadyExists, setAccountAlreadyExists] = React.useState<boolean>(false);

    // Network state (registration)
    const registrationTransit = registrationState.inviteRegistration.registrationTransit;
    const registrationIsInTransit = registrationTransit.transitInProgress;
    const hasRegistrationTransitError = registrationTransit.transitErrorMessage !== null;
    const registrationTransitErrorMessage = registrationTransit.transitErrorMessage ?? t('blui:MESSAGES.REQUEST_ERROR');
    const registrationSuccess = registrationState.inviteRegistration.registrationTransit.transitSuccess;

    // Network state (invite code validation)
    const isValidationInTransit = registrationState.inviteRegistration.validationTransit.transitInProgress;
    const validationTransitErrorMessage = registrationState.inviteRegistration.validationTransit.transitErrorMessage;
    const validationSuccess = registrationState.inviteRegistration.validationTransit.transitSuccess;
    const validationComplete = registrationState.inviteRegistration.validationTransit.transitComplete;

    // Network state (loading eula)
    const loadEulaTransitErrorMessage = registrationState.eulaTransit.transitErrorMessage;

    // Custom Registration Success Screens
    const customSuccess = injectedUIContext.registrationSuccessScreen;
    const customAccountAlreadyExists = injectedUIContext.accountAlreadyExistsScreen;

    // Reset registration and validation state on dismissal
    useEffect(
        () => (): void => {
            registrationActions.dispatch(RegistrationActions.registerUserReset());
            registrationActions.dispatch(RegistrationActions.validateUserRegistrationReset());
        },
        [] // eslint-disable-line react-hooks/exhaustive-deps
    );

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
                validationCode,
                validationEmail
            );
        } catch {
            // do nothing
        }
    }, [
        registrationActions,
        setHasAcknowledgedError,
        accountDetails,
        customAccountDetails,
        password,
        validationCode,
        validationEmail,
    ]);

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
                <AcceptEula
                    eulaAccepted={eulaAccepted}
                    onEulaChanged={setEulaAccepted}
                    loadEula={loadAndCacheEula}
                    htmlEula={injectedUIContext.htmlEula ?? false}
                    eulaError={loadEulaTransitErrorMessage}
                    eulaContent={eulaContent}
                />
            ),
            canGoForward: eulaAccepted,
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
                        <div className={sharedClasses.textField}>
                            <FirstCustomPage
                                onDetailsChanged={(details: CustomAccountDetails, valid: boolean): void => {
                                    setCustomAccountDetails({ ...customAccountDetails, 0: { values: details, valid } });
                                }}
                                initialDetails={customAccountDetails[0]?.values}
                                // eslint-disable-next-line @typescript-eslint/no-use-before-define
                                onSubmit={customAccountDetails[0]?.valid ? (): void => advancePage(1) : undefined}
                            />
                        </div>
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
        ]);

    const isLastStep = currentPage === RegistrationPages.length - 1;
    const isFirstStep = currentPage === 0;

    // If we successfully register, move to the success screen
    useEffect(() => {
        if (currentPage === RegistrationPages.length - 2 && registrationSuccess) {
            setCurrentPage(RegistrationPages.length - 1);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [registrationSuccess]);

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
            } else {
                setCurrentPage(currentPage + delta);
            }
        }
    };

    // Screen content logic
    const pageTitle = (): string => {
        if (isValidationInTransit) {
            return t('blui:MESSAGES.LOADING');
        } else if (validationTransitErrorMessage !== null) {
            return t('blui:MESSAGES.ERROR');
        } else if (accountAlreadyExists) {
            return t('blui:REGISTRATION.STEPS.COMPLETE');
        }
        return RegistrationPages[currentPage].pageTitle || '';
    };

    // Screen actions content
    let buttonArea: JSX.Element;
    if (isLastStep) {
        buttonArea = (
            <Button
                variant={'contained'}
                disableElevation
                color={'primary'}
                className={clsx(sharedClasses.dialogButton, { [sharedClasses.fullWidth]: true })}
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
                        className={sharedClasses.dialogButton}
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
                        className={sharedClasses.dialogButton}
                    >
                        {t('blui:ACTIONS.NEXT')}
                    </Button>
                }
                classes={{ root: sharedClasses.stepper, dot: sharedClasses.stepperDot }}
            />
        );
    }

    const errorDialog = (
        <SimpleDialog
            title={t('blui:MESSAGES.ERROR')}
            body={t(registrationTransitErrorMessage)}
            open={hasRegistrationTransitError && !hasAcknowledgedError}
            onClose={(): void => {
                setHasAcknowledgedError(true);
            }}
        />
    );

    // Custom "Account Already Exists"
    if (accountAlreadyExists && customAccountAlreadyExists) {
        return (
            <BrandedCardContainer loading={registrationIsInTransit || isValidationInTransit}>
                {typeof customAccountAlreadyExists === 'function' && customAccountAlreadyExists(undefined)}
                {typeof customAccountAlreadyExists !== 'function' && customAccountAlreadyExists}
            </BrandedCardContainer>
        );
    }
    // Custom Success Screen
    else if (isLastStep && !accountAlreadyExists && validationSuccess && !isValidationInTransit && customSuccess) {
        return (
            <BrandedCardContainer loading={registrationIsInTransit || isValidationInTransit}>
                {typeof customSuccess === 'function' &&
                    customSuccess({ accountDetails: accountDetails, email: validationEmail })}
                {typeof customSuccess !== 'function' && customSuccess}
            </BrandedCardContainer>
        );
    }
    // Default Screens
    return (
        <BrandedCardContainer loading={registrationIsInTransit || isValidationInTransit}>
            {errorDialog}
            <CardHeader
                title={
                    <Typography variant={'h6'} style={{ fontWeight: 600 }}>
                        {pageTitle()}
                    </Typography>
                }
                className={sharedClasses.dialogTitle}
            />
            {!accountAlreadyExists && validationSuccess && !isValidationInTransit ? (
                <>
                    <CardContent className={sharedClasses.dialogContent}>
                        {RegistrationPages[currentPage].pageBody}
                    </CardContent>
                    <Divider />
                    <CardActions className={sharedClasses.dialogActions}>{buttonArea}</CardActions>
                </>
            ) : accountAlreadyExists ? (
                <>
                    <CardContent className={sharedClasses.dialogContent}>
                        <ExistingAccountComplete />
                    </CardContent>
                    <Divider />
                    <CardActions className={sharedClasses.dialogActions}>
                        <Button
                            variant="contained"
                            color="primary"
                            disableElevation
                            onClick={(): void => navigate(routes.LOGIN)}
                            className={sharedClasses.dialogButton}
                        >
                            {t('blui:ACTIONS.CONTINUE')}
                        </Button>
                    </CardActions>
                </>
            ) : !validationComplete ? (
                <></>
            ) : (
                <FinishState
                    icon={<Error color={'error'} style={{ fontSize: 100, marginBottom: theme.spacing(2) }} />}
                    title={t('blui:MESSAGES.FAILURE')}
                    description={validationTransitErrorMessage}
                />
            )}
        </BrandedCardContainer>
    );
};
