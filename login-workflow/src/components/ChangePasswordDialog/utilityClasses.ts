import generateUtilityClass from '@mui/material/generateUtilityClass';

export type ChangePasswordDialogClasses = {
    root?: string;
    spinner?: string;
    title?: string;
    content?: string;
    description?: string;
    divider?: string;
    previousLabelButton?: string;
    nextLabelButton?: string;
    buttonAction?: string;
};

export type ChangePasswordDialogClassKey = keyof ChangePasswordDialogClasses;

export function getChangePasswordDialogUtilityClass(slot: string): string {
    return generateUtilityClass('BluiChangePassword', slot);
}
