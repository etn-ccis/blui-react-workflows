import { ReactElement, useEffect } from 'react';
import { useSecurityState } from '../auth-shared';
import { useLocation, useNavigate } from 'react-router-dom';

type GuestGuardProps = {
    children?: ReactElement | null;
};
/**
 * Component that renders a conditional Route. If the user is already authenticated, this route
 * will redirect back to the prior route. If the user is not authenticated, it will render the provided
 * content.
 *
 * @param children The element/route to render if the user is not authenticated
 *
 * @category Component
 */
export const GuestGuard = ({ children }: GuestGuardProps): JSX.Element | null => {
    const securityState = useSecurityState();
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (securityState.isAuthenticatedUser) {
            navigate((location.state as { from: any })?.from ? (location.state as { from: any }).from : '/', {
                replace: true,
            });
        }
    }, [securityState, navigate, location]);

    return children;
};
