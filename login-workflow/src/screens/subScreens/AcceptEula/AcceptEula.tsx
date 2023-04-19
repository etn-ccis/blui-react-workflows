import React, { ReactElement, useEffect } from 'react';
import { useLanguageLocale } from '@brightlayer-ui/react-auth-shared';
import Typography from '@mui/material/Typography';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Theme, SxProps } from '@mui/material/styles';
import DOMPurify from 'dompurify';
import Box, { BoxProps } from '@mui/material/Box';

export type AcceptEulaProps = {
    eulaAccepted: boolean;
    eulaContent?: string;
    onEulaChanged: (accepted: boolean) => void;
    loadEula: () => Promise<void> | void;
    htmlEula?: boolean;
    eulaError?: string;
    agreeTerms?: string;
    eulaControl?: ReactElement;
    termsAndConditionsStyles?: SxProps<Theme>;
    eulaContentStyles?: SxProps<Theme>;
    EulaContentProps?: BoxProps;
    loadingText?: string;
    loadingStyles?: SxProps<Theme>;
};

/**
 * Component that renders a screen displaying the EULA and requests acceptance via a checkbox.
 *
 * @param eulaAccepted true if the checkbox should be checked
 * @param eulaContent the content to render for the EULA. Can be a plain string or HTML
 * @param onEulaChanged function to call when the state of the checkbox is changed
 * @param loadEula function to call to retrieve the eulaContent
 * @param htmlEula true if the EULA should be rendered as HTML
 * @param eulaError error message if the EULA fails to load
 *
 * @category Component
 */
export const AcceptEula: React.FC<React.PropsWithChildren<React.PropsWithChildren<AcceptEulaProps>>> = (props) => {
    const { t } = useLanguageLocale();
    const {
        eulaAccepted,
        eulaContent,
        onEulaChanged,
        loadEula,
        htmlEula,
        eulaError,
        agreeTerms = t('blui:REGISTRATION.EULA.AGREE_TERMS'),
        eulaControl,
        termsAndConditionsStyles,
        eulaContentStyles,
        EulaContentProps,
        loadingText = t('blui:REGISTRATION.EULA.LOADING'),
        loadingStyles,
    } = props;

    const eulaContentInternals = eulaContent ?? eulaError ?? loadingText;

    useEffect(() => {
        void loadEula();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            {!htmlEula && (
                <Typography sx={{ flex: '1 1 0px', overflow: 'auto', ...loadingStyles }}>
                    {eulaContentInternals}
                </Typography>
            )}
            {htmlEula && (
                <Box
                    sx={{ flex: '1 1 0px', overflow: 'auto', ...eulaContentStyles }}
                    dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(eulaContentInternals) }}
                    {...EulaContentProps}
                ></Box>
            )}
            <FormControlLabel
                control={
                    eulaControl ?? (
                        <Checkbox
                            color={'primary'}
                            checked={eulaAccepted}
                            disabled={!eulaContent}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>): void =>
                                onEulaChanged(event.target.checked)
                            }
                        />
                    )
                }
                label={agreeTerms}
                sx={{ flex: '0 0 auto', mr: 0, mt: 2, ...termsAndConditionsStyles }}
            />
        </>
    );
};
