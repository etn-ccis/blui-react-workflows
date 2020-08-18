import React, { useEffect } from 'react';
import { Typography, FormControlLabel, Checkbox, useTheme } from '@material-ui/core';
import { useLanguageLocale } from '@pxblue/react-auth-shared';
import DOMPurify from 'dompurify';

export type AcceptEulaProps = {
    eulaAccepted: boolean;
    eulaContent?: string;
    onEulaChanged: (accepted: boolean) => void;
    loadEula: () => void;
    htmlEula?: boolean;
    eulaError?: string;
};
export const AcceptEula: React.FC<AcceptEulaProps> = (props) => {
    const { eulaAccepted, eulaContent, onEulaChanged, loadEula, htmlEula, eulaError } = props;
    const { t } = useLanguageLocale();
    const theme = useTheme();

    const eulaContentInternals = eulaContent ?? eulaError ?? t('REGISTRATION.EULA.LOADING');

    useEffect(() => {
        loadEula();
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
                label={t('REGISTRATION.EULA.AGREE_TERMS')}
                style={{ flex: '0 0 auto', marginRight: 0, marginTop: theme.spacing(2) }}
            />
        </>
    );
};
