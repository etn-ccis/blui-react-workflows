import { ExperimentalAuthGuardProps } from './types';

export const ExperimentalAuthGuard: React.FC<ExperimentalAuthGuardProps> = ({
    children,
    isAuthenticated,
    fallbackComponent,
}) => {
    console.log('inside auth guard', isAuthenticated);
    if (isAuthenticated) {
        return children;
    }

    if (!isAuthenticated && fallbackComponent) {
        return fallbackComponent;
    }

    return null;
};
