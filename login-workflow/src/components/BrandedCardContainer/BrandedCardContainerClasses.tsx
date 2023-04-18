import generateUtilityClass from '@mui/material/generateUtilityClass';
import generateUtilityClasses from '@mui/material/generateUtilityClasses';

export type BrandedCardContainerClasses = {
    root?: string;
    card?: string;
};

export type BrandedCardContainerClassKey = keyof BrandedCardContainerClasses;

export function getBrandedCardContainerUtilityClass(slot: string): string {
    return generateUtilityClass('BluiBrandedCardContainer', slot);
}

const brandedCardContainerClasses: BrandedCardContainerClasses = generateUtilityClasses('BluiBrandedCardContainer', [
    'root',
    'card',
]);

export default brandedCardContainerClasses;
