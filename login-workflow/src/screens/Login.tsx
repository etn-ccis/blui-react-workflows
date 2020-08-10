import React from 'react';
import { useTheme } from '@material-ui/core'
import { useSecurityState, useLanguageLocale, useAccountUIActions, useAccountUIState, useInjectedUIContext } from '@pxblue/react-auth-shared';
import { useHistory } from 'react-router-dom';
import { BrandedCardContainer } from '../components/BrandedCardContainer';

export const Login: React.FC = (props) => {
    // const securityState = useSecurityState();
    // const [rememberPassword, setRememberPassword] = React.useState(securityState.rememberMeDetails.rememberMe ?? false);
    // const [emailInput, setEmailInput] = React.useState(securityState.rememberMeDetails.email ?? '');
    // const [passwordInput, setPasswordInput] = React.useState('');
    // const [hasAcknowledgedError, setHasAcknowledgedError] = React.useState(false);
    // const [debugMode, setDebugMode] = React.useState(false);

    // const history = useHistory();
    // const { t } = useLanguageLocale();
    // const authUIActions = useAccountUIActions();
    // const authUIState = useAccountUIState();
    // const authProps = useInjectedUIContext();

    // const theme = useTheme();
    // // const containerStyles = makeContainerStyles();
    // // const styles = makeStyles();

    // const loginTapped = (): void => {
    //     setHasAcknowledgedError(false);
    //     authUIActions.actions.logIn(emailInput, passwordInput, rememberPassword);
    // };
    return (
        <BrandedCardContainer>
            <div style={{ backgroundColor: 'red', height: 50, width: 50 }} />
        </BrandedCardContainer>

    )
}