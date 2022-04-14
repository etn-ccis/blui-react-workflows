import React, { useEffect } from 'react';
import { useLanguageLocale } from '@brightlayer-ui/react-auth-shared';
import Typography from '@mui/material/Typography';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { useTheme } from '@mui/material/styles';
import DOMPurify from 'dompurify';

export type AcceptEulaProps = {
    eulaAccepted: boolean;
    eulaContent?: string;
    onEulaChanged: (accepted: boolean) => void;
    loadEula: () => Promise<void> | void;
    htmlEula?: boolean;
    eulaError?: string;
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
    const { eulaAccepted, eulaContent, onEulaChanged, loadEula, htmlEula, eulaError } = props;
    const { t } = useLanguageLocale();
    const theme = useTheme();

    const eulaContentInternals = eulaContent ?? eulaError ?? t('blui:REGISTRATION.EULA.LOADING');

    useEffect(() => {
        void loadEula();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            {!htmlEula && <Typography style={{ flex: '1 1 0px', overflow: 'auto' }}>{eulaContentInternals}</Typography>}
            {htmlEula && (
                <div
                    style={{ flex: '1 1 0px', overflow: 'auto' }}
                    dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(eulaContentInternals) }}
                ></div>
            )}
            <FormControlLabel
                control={
                    <Checkbox
                        color={'primary'}
                        checked={eulaAccepted}
                        disabled={!eulaContent}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>): void =>
                            onEulaChanged(event.target.checked)
                        }
                    />
                }
                label={t('blui:REGISTRATION.EULA.AGREE_TERMS')}
                style={{ flex: '0 0 auto', marginRight: 0, marginTop: theme.spacing(2) }}
            />
        </>
    );
};
