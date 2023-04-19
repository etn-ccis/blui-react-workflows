import React from 'react';
import { useLanguageLocale } from '@brightlayer-ui/react-auth-shared';
import { FinishState } from '../../../components';
import Person from '@mui/icons-material/Person';
import { BrandedCardContainer, BrandedCardContainerProps } from '../../../components/BrandedCardContainer';

/**
 * Component that renders a screen displaying success for creating an account for
 * a user that already exists.
 *
 * @category Component
 */

type ExistingAccountCompleteProps = BrandedCardContainerProps & {
    showInCard?: boolean;
    cardTitle?: string;
    messageIcon?: JSX.Element;
    messageTitle?: string;
    messageBody?: string;
    actions?: JSX.Element;

}

export const ExistingAccountComplete: React.FC<React.PropsWithChildren<ExistingAccountCompleteProps>> = (props) => {
    const { t } = useLanguageLocale();

    const {
        messageIcon = <Person color={'primary'} sx={{ fontSize: 100, mb: 2 }} />,
        messageTitle = t('blui:MESSAGES.WELCOME'),
        messageBody = t('blui:REGISTRATION.SUCCESS_EXISTING'),
        showInCard = true,
    } = props;

    const finishState = <FinishState
        icon={messageIcon}
        title={messageTitle}
        description={messageBody}
    /> 

    return (
        <>
            {showInCard ? 
                <BrandedCardContainer>
                    {finishState}
                </BrandedCardContainer>
            : <>
                {finishState}
              </>  
            }
        </>
    );
};
