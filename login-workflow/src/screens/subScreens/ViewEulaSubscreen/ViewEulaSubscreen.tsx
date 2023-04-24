import React, { useEffect } from 'react';
import { useLanguageLocale } from '@brightlayer-ui/react-auth-shared';
import Typography from '@mui/material/Typography';
import FormControlLabel, { FormControlLabelProps } from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Theme, SxProps } from '@mui/material/styles';
import DOMPurify from 'dompurify';
import Box, { BoxProps } from '@mui/material/Box';
import {
    ViewEulaSubscreenClasses,
    ViewEulaSubscreenClassKey,
    getViewEulaSubscreenUtilityClass,
} from './ViewEulaSubscreenClasses';
import { unstable_composeClasses as composeClasses } from '@mui/base';
import { cx } from '@emotion/css';

export type ViewEulaSubscreenProps = {
    eulaAccepted: boolean;
    eulaContent?: string;
    onEulaCheckboxChanged: (accepted: boolean) => void;
    loadEula: () => Promise<void> | void;
    htmlEula?: boolean;
    eulaError?: string;
    agreeTerms?: string;
    termsAndConditionsStyles?: SxProps<Theme>;
    eulaContentStyles?: SxProps<Theme>;
    loaderStyles?: SxProps<Theme>;
    classes?: ViewEulaSubscreenClasses;
    slots?: { loader?: React.ElementType; eulaContent?: React.ElementType; checkboxLabel?: React.ElementType };
    slotProps?: {
        loader?: any;
        eulaContent?: BoxProps;
        checkboxLabel?: FormControlLabelProps;
    };
};

const useUtilityClasses = (ownerState: ViewEulaSubscreenProps): Record<ViewEulaSubscreenClassKey, string> => {
    const { classes } = ownerState;

    const slots = {
        loader: ['loader'],
        eulaContent: ['eulaContent'],
        checkboxLabel: ['checkboxLabel'],
    };

    return composeClasses(slots, getViewEulaSubscreenUtilityClass, classes);
};

/**
 * Component that renders a screen displaying the EULA and requests acceptance via a checkbox.
 *
 * @param eulaAccepted true if the checkbox should be checked
 *
 * @param eulaContent the content to render for the EULA. Can be a plain string or HTML
 *
 * @param onEulaCheckboxChanged function to call when the state of the checkbox is changed
 *
 * @param loadEula function to call to retrieve the eulaContent
 *
 * @param htmlEula true if the EULA should be rendered as HTML
 *
 * @param eulaError error message if the EULA fails to load
 *
 * @param agreeTerms to override terms and conditions text
 *
 * @param termsAndConditionsStyles to override terms and conditions styles
 *
 * @param eulaContentStyles to override eula content styles
 *
 * @param loaderStyles to override the loader styles
 *
 * @param slots used for each slot in `ContactSupport`
 *
 * @param slotProps applied to each slot
 *
 * @category Component
 */

export const ViewEulaSubscreen: React.FC<ViewEulaSubscreenProps> = (props) => {
    const { t } = useLanguageLocale();
    const {
        eulaAccepted,
        eulaContent,
        onEulaCheckboxChanged,
        loadEula,
        htmlEula,
        eulaError,
        agreeTerms = t('blui:REGISTRATION.EULA.AGREE_TERMS'),
        termsAndConditionsStyles,
        eulaContentStyles,
        loaderStyles,
        classes = {},
        slots = {},
        slotProps = {},
    } = props;

    const defaultClasses = useUtilityClasses(props);
    const CheckboxLabel = slots.checkboxLabel ?? FormControlLabel;
    const eulaContentInternals = eulaContent ?? eulaError ?? t('blui:REGISTRATION.EULA.LOADING');
    const Loader = slots.loader ?? Typography;

    useEffect(() => {
        void loadEula();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            {!htmlEula && (
                <Loader
                    sx={{ flex: '1 1 0px', overflow: 'auto', ...loaderStyles }}
                    className={cx(defaultClasses.loader, classes.loader)}
                    {...slotProps.loader}
                >
                    {eulaContentInternals}
                </Loader>
            )}
            {htmlEula && (
                <Box
                    sx={{ flex: '1 1 0px', overflow: 'auto', ...eulaContentStyles }}
                    className={cx(defaultClasses.eulaContent, classes.eulaContent)}
                    component={slots.eulaContent}
                    dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(eulaContentInternals) }}
                    {...slotProps.eulaContent}
                ></Box>
            )}
            <CheckboxLabel
                control={
                    <Checkbox
                        color={'primary'}
                        checked={eulaAccepted}
                        disabled={!eulaContent}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>): void =>
                            onEulaCheckboxChanged(event.target.checked)
                        }
                    />
                }
                label={agreeTerms}
                sx={{ flex: '0 0 auto', mr: 0, mt: 2, ...termsAndConditionsStyles }}
                className={cx(defaultClasses.checkboxLabel, classes.checkboxLabel)}
                {...slotProps.checkboxLabel}
            />
        </>
    );
};
