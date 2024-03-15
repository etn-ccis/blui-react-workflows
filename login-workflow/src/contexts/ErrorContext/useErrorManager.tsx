import { useState } from 'react';
import { AuthError, ErrorManagerProps } from '../../components/Error';
import { useErrorContext } from '.';

export const useErrorManager = (): {
    triggerError: (error: Error | AuthError) => void;
    errorManagerConfig: ErrorManagerProps;
} => {
    const errorConfig = useErrorContext();
    const [error, setError] = useState<Error | AuthError>(new Error());

    const isAuthError = (err: Error | AuthError): err is AuthError => (err as AuthError).cause !== undefined;

    const getErrorDisplayConfig = (err: Error | AuthError): ErrorManagerProps => {
        if (isAuthError(err)) {
            return {
                ...errorConfig,
                dialogConfig: { ...errorConfig.dialogConfig, title: err.cause.title },
                error: err.cause.errorMessage,
                errorOptions: err.cause.errorOptions,
                titleOptions: err.cause.titleOptions,
                onClose: (): void => {
                    setError(new Error());
                },
            };
        }
        return {
            ...errorConfig,
            error: err.message,
            onClose: (): void => {
                setError(new Error());
            },
        };
    };

    const triggerError = (err: Error | AuthError): void => {
        if (isAuthError(err)) {
            setError({
                cause: {
                    title: err.cause.title,
                    errorMessage: err.cause.errorMessage,
                    errorOptions: err.cause.errorOptions,
                    titleOptions: err.cause.titleOptions,
                },
            });
        } else {
            setError(err);
        }
    };

    return { triggerError: triggerError, errorManagerConfig: getErrorDisplayConfig(error) };
};
