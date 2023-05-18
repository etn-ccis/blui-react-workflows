import { ExperimentalAuthGuardProps } from './types';

export const ExperimentalAuthGuard: React.FC<ExperimentalAuthGuardProps> = ({
    children,
    isAuthenticated,
    fallbackComponent,
}) => {
    if (isAuthenticated) {
        return children;
    }

    if (!isAuthenticated && fallbackComponent) {
        return fallbackComponent;
    }

    return null;
};
