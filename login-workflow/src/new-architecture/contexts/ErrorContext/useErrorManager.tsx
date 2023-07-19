import { useState } from 'react';
import { AuthError, ErrorManagerProps } from '../../components/Error';
import { useErrorContext } from '.';

export const useErrorManager = (): {
    triggerError: (error: Error) => void;
    errorManagerConfig: ErrorManagerProps;
} => {
    const errorConfig = useErrorContext();
    const [error, setError] = useState<AuthError>({ cause: { title: '', errorMessage: '' } });

    const errorDisplayConfig = {
        ...errorConfig,
        dialogConfig: { title: error.cause.title },
        error: error.cause.errorMessage,
        onClose: (): void => {
            setError({ cause: { title: '', errorMessage: '' } });
        },
    };

    const triggerError = (_error: Error): void => {
        setError({
            cause: {
                title: (_error as unknown as AuthError).cause.title,
                errorMessage: (_error as unknown as AuthError).cause.errorMessage,
            },
        });
    };

    return { triggerError: triggerError, errorManagerConfig: errorDisplayConfig };
};
