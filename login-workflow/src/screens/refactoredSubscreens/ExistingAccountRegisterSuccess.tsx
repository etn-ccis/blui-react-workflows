import React, { useCallback } from 'react';
import { useLanguageLocale } from '@brightlayer-ui/react-auth-shared';
import { FinishState } from '../../components';
import Person from '@mui/icons-material/Person';
import { BrandedCardContainer } from '../../components/BrandedCardContainer';
import Divider from '@mui/material/Divider';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import { DialogActionsStyles, DialogButtonStyles, DialogContentStyles, DialogTitleStyles } from '../../styles';
import { useTheme } from '@mui/material/styles';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import { useRoutes } from '../../contexts/RoutingContext';
import { useNavigate } from 'react-router-dom';

/**
 * Component that renders a screen displaying success for creating an account for
 * a user that already exists.
 *
 * @category Component
 */

type ExistingAccountRegisterSuccessProps = {
    cardTitle?: string;
    messageIcon?: JSX.Element;
    messageTitle?: string;
    messageBody?: string;
    cardActions?: JSX.Element | JSX.Element[];
};

export const ExistingAccountRegisterSuccess: React.FC<ExistingAccountRegisterSuccessProps> = (props) => {
    const { t } = useLanguageLocale();
    const theme = useTheme();
    const { routes } = useRoutes();
    const navigate = useNavigate();

    const {
        cardTitle = t('blui:REGISTRATION.STEPS.COMPLETE'),
        messageIcon = <Person color={'primary'} sx={{ fontSize: 100, mb: 2 }} />,
        messageTitle = t('blui:MESSAGES.WELCOME'),
        messageBody = t('blui:REGISTRATION.SUCCESS_EXISTING'),
        cardActions = (
            <Button
                variant={'contained'}
                color={'primary'}
                sx={DialogButtonStyles(true)}
                disableElevation
                onClick={(): void => navigate(routes.LOGIN)}
            >
                {t('blui:ACTIONS.CONTINUE')}
            </Button>
        ),
    } = props;

    const ExistingAccountSuccessRenderer = (): JSX.Element => (
        <>
            <CardHeader
                title={
                    <Typography variant={'h6'} sx={{ fontWeight: 600 }}>
                        {cardTitle}
                    </Typography>
                }
                sx={DialogTitleStyles(theme)}
            />
            <CardContent sx={DialogContentStyles(theme)}>
                <FinishState icon={messageIcon} title={messageTitle} description={messageBody} />
            </CardContent>
            <Divider />
            <CardActions sx={DialogActionsStyles(theme)}>{cardActions}</CardActions>
        </>
    );

    return (
        <BrandedCardContainer>
            <ExistingAccountSuccessRenderer />
        </BrandedCardContainer>
    );
};
